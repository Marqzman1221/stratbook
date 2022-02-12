import { defineStore } from 'pinia'
import { useNotification } from './notification'

export const useDirectory = defineStore('directory', {
  state: () => ({
    list: {
      folders: [],
      strategies: [],
    },
    loading: false,
    loadingAppend: false,

    from: 0,
    to: 49,
  }),

  actions: {
    async fetch(folderID?: string | undefined): Promise<void> {
      this.loading = true

      let foldersQuery = this.$nuxt.$supabase
        .from('folders')
        .select('id, name, parent:parent_id ( id, name )')
        .order('name', { ascending: false })

      let strategiesQuery = this.$nuxt.$supabase
        .from('strategies')
        .select(
          'id, name, map:map_id ( name, thumbnail ), operators, updated_at'
        )
        .order('name', { ascending: false })
        .range(0, 49)

      if (folderID) {
        foldersQuery = foldersQuery.match({
          user_id: this.$nuxt.$auth.user.id,
          parent_id: folderID,
        })
        strategiesQuery = strategiesQuery.match({
          user_id: this.$nuxt.$auth.user.id,
          parent_id: folderID,
        })
      } else {
        foldersQuery = foldersQuery
          .eq('user_id', this.$nuxt.$auth.user.id)
          .is('parent_id', null)

        strategiesQuery = strategiesQuery
          .eq('user_id', this.$nuxt.$auth.user.id)
          .is('parent_id', null)
      }

      const { data: folders, error: foldersError } = await foldersQuery

      const { data: strategies, error: strategiesError } = await strategiesQuery

      if (foldersError || strategiesError) {
        this.loading = false
        this.$nuxt.$notify('There was an issue retrieving your strategies', {
          color: 'error',
        })

        return
      }

      this.from = 0
      this.to = 49

      this.list = { folders, strategies }
      this.loading = false
    },

    async fetchAppend(folderID?: string | undefined): Promise<void> {
      this.loadingAppend = true

      let strategiesQuery = this.$nuxt.$supabase
        .from('strategies')
        .select(
          'id, name, map:map_id { name, thumbnail }, operators, updated_at'
        )
        .range(this.from + 50, this.to + 50)

      if (folderID) {
        strategiesQuery = strategiesQuery.eq('parent_id', folderID)
      }

      const { data: strategies, error } = await strategiesQuery()

      if (error) {
        this.loading = false
        this.$nuxt.$notify('There was an issue retrieving your strategies', {
          color: 'error',
        })

        return
      }

      this.from += 50
      this.to += 50

      this.list.strategies = this.list.strategies.concat(strategies)
      this.loadingAppend = false
    },

    async createFolder(name: string): Promise<string> {
      const notification = useNotification()

      const { data: folder, error } = await this.$nuxt.$supabase
        .from('folders')
        .insert([
          {
            user_id: this.$nuxt.$auth.user.id,
            parent_id:
              this.$nuxt.route.name === 'library-folders-uuid'
                ? this.$nuxt.route.params.uuid
                : null,
            name,
          },
        ])
        .limit(1)
        .single()

      if (error) {
        notification.attributes.color = 'error'

        return 'An issue occured while creating the folder'
      }

      this.list.folders.unshift(folder as never)

      return `Successfully created folder: ${folder.name}`
    },

    async createStrategy(payload: any): Promise<string> {
      const notification = useNotification()

      const { data: strategy, error } = await this.$nuxt.$supabase
        .from('strategies')
        .insert([
          {
            user_id: this.$nuxt.$auth.user.id,
            parent_id:
              this.$nuxt.route.name === 'library-folders-uuid'
                ? this.$nuxt.route.params.uuid
                : null,
            ...payload,
          },
        ])
        .limit(1)
        .single()

      if (error) {
        notification.attributes.color = 'error'

        return 'An issue occured while creating the strategy'
      }

      this.list.strategies.unshift(strategy as never)

      return `Successfully created strategy: ${strategy.name}`
    },
  },

  getters: {
    getList: (state) => state.list,
    isLoading: (state) => state.loading,
    isLoadingAppend: (state) => state.loadingAppend,
  },
})
