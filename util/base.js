import api from '~/util/api'

export const baseState = () => ({
  list: {
    data: [],
  },
  listLoading: true,

  item: {},
  itemLoading: true,

  valueList: [],

  entryCache: {},
  entryState: {
    show: false,
    valid: true,
    mode: '',
    tab: 0,
  },

  relatedFilters: {
    filtered: false,
  },
  filtersCache: {},
  filters: {
    page: 1,
    filtered: false,
    menu: false,
  },
})

const cleanValue = (value) => {
  if (value === null) return ''

  return value
}

const getEntry = (data, keys) => {
  const entry = {}

  keys.forEach((key) => {
    entry[key] = cleanValue(data[key])
  })

  return entry
}

export const baseMutations = (getDefaultState) => ({
  RESET_STORE(state) {
    Object.assign(state, getDefaultState())
  },

  // state.list
  RESET_LIST(state) {
    state.list = []
  },
  CREATE(state, item) {
    state.list.data.push(item)
    state.list.total += 1
  },
  READ(state, item) {
    state.item = item
  },
  UPDATE(state, { id, item }) {
    const index = state.list.data.findIndex((item) => item.id === id)
    state.list.data.splice(index, 1, item)
  },
  DELETE(state, id) {
    const index = state.list.data.findIndex((item) => item.id === id)
    state.list.data.splice(index, 1)
  },

  // state.item
  RESET_ITEM(state) {
    state.item = {}
  },

  // state.valueList
  RESET_VALUE_LIST(state) {
    state.valueList = []
  },

  // entryCache and entry
  CACHE_ENTRY(state, { data }) {
    const keys = Object.keys(getDefaultState().entry)
    state.entryCache = getEntry(data, keys)
  },
  RESET_ENTRY_CACHE(state) {
    state.entryCache = getDefaultState().entryCache
  },
  PUT_ENTRY(state, { data }) {
    const keys = Object.keys(getDefaultState().entry)
    state.entry = getEntry(data, keys)
  },
  NEW_ENTRY(state) {
    state.entry = getDefaultState().entry
    state.entryCache = getDefaultState().entry
  },
  RESET_ENTRY(state) {
    state.entry = getDefaultState().entry
  },

  // relatedFilters
  PUT_RELATED_FILTER(state, data) {
    state.relatedFilters = data
    state.relatedFilters.filtered = true
  },
  RESET_RELATED_FILTERS(state) {
    state.relatedFilters = getDefaultState().relatedFilters
  },

  // filtersCache and filters
  CACHE_FILTERS(state) {
    state.filtersCache = { ...state.filters }
  },
  RESET_FILTERS_CACHE(state) {
    state.filtersCache = {}
  },
  RESET_FILTERS(state) {
    state.filters = getDefaultState().filters
  },
  SET_FILTERED(state, filtered) {
    state.filters.filtered = filtered
  },
  SET_PAGE(state, page) {
    state.filters.page = page
  },
  PAGINATE(state, num) {
    state.filters.page += num
  },
})

export const baseActions = (endpoint) => ({
  async fetch({ commit, getters }, data) {
    try {
      commit('SET_LIST_LOADING', true)

      commit('CACHE_FILTERS')

      const relatedFilters = getters.getRelatedFilters

      const filters = { ...relatedFilters, ...data }

      const response = await api.fetch(endpoint, filters)

      commit('SET_LIST', response.data)
      commit('SET_LIST_LOADING', false)
    } catch (error) {}
  },

  async create({ commit }, data) {
    try {
      const response = await api.createUpdate(endpoint, data)

      commit('CREATE', response.data)
    } catch (error) {}
  },

  async read({ commit }, id) {
    try {
      commit('SET_ITEM_LOADING', true)

      const response = await api.read(endpoint, id)

      commit('READ', response.data)
      commit('SET_ITEM_LOADING', false)
    } catch (error) {}
  },

  async readUUID({ commit }, data) {
    try {
      commit('SET_ITEM_LOADING', true)

      const response = await api.readUuid(endpoint, data)

      commit('READ', response.data)
      commit('SET_ITEM_LOADING', false)
    } catch (error) {}
  },

  async update({ commit }, data) {
    try {
      const response = await api.createUpdate(endpoint, data)

      commit('UPDATE', { id: data.id, item: response.data })
    } catch (error) {}
  },

  async delete({ commit }, data) {
    try {
      await api.delete(endpoint, data)

      commit('DELETE', data.id)
    } catch (error) {}
  },

  async entry({ commit }, { id, load }) {
    try {
      if (load) await load()

      const response = await api.read(endpoint, id)

      commit('CACHE_ENTRY', response.data)
      commit('PUT_ENTRY', response.data)
    } catch (error) {}
  },

  async valueList({ commit }, data) {
    try {
      const response = await api.valueList(endpoint, data)
      commit('SET_VALUE_LIST', response.data)
    } catch (error) {}
  },
})

export const baseGetters = () => ({
  // getList: (state) => state.list,
  // getLoadingList: (state) => state.loadingList,
  // getItem: (state) => state.item,
  // getLoadingItem: (state) => state.loadingItem,
  // getValueList: (state) => state.valueList,
  // getFilters: (state) => state.filters,
  // getFiltersCache: (state) => state.filtersCache,
  // getRelatedFilters: (state) => state.relatedFilters,
  getEntryNoChange: (state) => {
    // eslint-disable-next-line eqeqeq
    if (JSON.stringify(state.entry) != JSON.stringify(state.entryCache))
      return false

    return true
  },
  // getEntryState: (state) => state.entryState,
  // getEntry: (state) => state.entry,
  // getEntryCache: (state) => state.entryCache,
})
