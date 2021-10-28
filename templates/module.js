import { make } from 'vuex-pathify'
import { baseActions, baseGetters, baseMutations, baseState } from '~/util/base'

const getDefaultState = () => ({
  ...baseState(),

  // Module specific state
  entry: {},
  relatedFilters: {},
  filters: {},
})

export const state = () => ({ ...getDefaultState() })

export const mutations = {
  ...baseMutations(getDefaultState),
  ...make.mutations(state),

  // Module specific mutations
}

export const actions = {
  ...baseActions('[DEFINE MODULE ENDPOINT HERE]'),

  // Module specific actions
}

export const getters = {
  ...baseGetters(),
  ...make.getters(state),

  // Module specific getters
}
