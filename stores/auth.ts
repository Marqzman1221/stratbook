import { Session, User } from 'nuxt-supabase'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: (): AuthStoreState => ({
    loggedIn: false,
    user: null,
    profile: null,
    session: null,
  }),

  actions: {
    setUser(payload: any): void {
      this.user = payload
      this.loggedIn = true
    },
    setProfile(payload: any): void {
      this.profile = payload
    },
    setSession(payload: any): void {
      this.session = payload
    },
  },

  getters: {
    getLoggedIn: (state): boolean => state.loggedIn,
    getUser: (state): User | null => state.user,
    getProfile: (state): any | null => state.profile,
    getSession: (state): Session | null => state.session,

    // getFirstName: (state): string | null => {
    //   if (!state.user || !state.user.user_metadata) return null

    //   const firstName = state.user.user_metadata.full_name.split(' ')[0]

    //   return firstName
    // },
    // getLastName: (state): string | null => {
    //   if (!state.user || !state.user.user_metadata) return null

    //   const lastName = state.user.user_metadata.full_name.split(' ')[1]

    //   return lastName
    // },
    // getFullName: (state): string | null => {
    //   if (!state.user || !state.user.user_metadata) return null

    //   return state.user.user_metadata.full_name
    // },
    // getAvatar: (state): string | null | undefined => {
    //   if (!state.user || !state.user.user_metadata) return null

    //   return state.user.user_metadata.picture
    // },
  },
})

export type AuthStore = ReturnType<typeof useAuth>

export type AuthStoreState = {
  loggedIn: boolean | undefined
  user: User | null
  profile: any | null
  session: Session | null
}
