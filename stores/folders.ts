import { defineStore } from 'pinia'

export const useFolders = defineStore('folders', {
  state: () => ({
    item: {
      id: '12345',
      name: 'Spring 2022',
    },
    list: [],
    loading: false,
  }),

  actions: {
    async open(folder: { id: string; name: string }) {
      this.$router.push({
        name: 'library-folders-uuid',
        params: { uuid: folder.id },
      })

      this.list.push(folder as never)
    },

    select(index: number, uuid?: string | undefined) {
      if (index < 0) {
        this.$router.push({
          name: 'library',
        })

        return
      }

      this.list = this.list.slice(0, index + 1)

      this.$router.push({
        name: 'library-folders-uuid',
        params: { uuid },
      })
    },

    async buildBreadcrumbs(id?: string | undefined) {
      this.loading = true

      if (!id) {
        this.list = []
        this.loading = false

        return
      }

      const list = []

      let currentID = id

      let runs = 1

      while (true) {
        const { data: folder, error } = await this.$nuxt.$supabase
          .from('folders')
          .select('id, name, parent:parent_id ( id, name )')
          .eq('id', currentID)
          .limit(1)
          .single()

        if (error) {
          this.$nuxt.$notify('An issue occurred while building the breadcrumbs')

          return
        }

        list.unshift(folder)

        if (runs === 6) break

        runs++

        if (folder.parent) currentID = folder.parent.id
        else break
      }

      this.list = list as never
      this.loading = false
    },
  },

  getters: {
    getItem: (state) => state.item,
    getList: (state) => state.list,
    isLoading: (state) => state.loading,
  },
})
