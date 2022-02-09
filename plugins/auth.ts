import { defineNuxtPlugin } from '#app'
import { useAuth, AuthStore } from '~/stores/auth'
import { Provider } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.provide(
    'auth',
    new (class {
      auth: AuthStore

      constructor() {
        this.auth = useAuth(nuxtApp.$pinia)

        nuxtApp.$supabase.auth.onAuthStateChange(handleEvent)
      }

      get loggedIn() {
        return this.auth.getLoggedIn
      }

      get user() {
        return this.auth.getUser
      }

      get profile() {
        return this.auth.getProfile
      }

      async login(provider: Provider) {
        const { user, session, error } = await nuxtApp.$supabase.auth.signIn({
          provider,
        })

        if (error) {
          this.auth.$reset()
          throw error
        }

        console.log('LOG IN:', { user, session })

        // UPDATE AUTH STORE
        this.auth.setUser(user)
      }

      async logout() {
        nuxtApp.$supabase.auth.signOut()

        // UPDATE AUTH STORE
      }

      async fetchUser() {
        const user = await nuxtApp.$supabase.auth.user()

        console.log('FETCH USER:', user)

        if (!user) {
          this.auth.$reset()
          return
        } else this.auth.setUser(user)

        const { data: profiles, error } = await nuxtApp.$supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)

        if (!error) this.auth.setProfile(profiles[0])
      }

      async deleteAccount() {
        // Call stored delete function
      }
    })()
  )

  function handleEvent(event: any, session: any) {
    console.log(event)
    console.log(session)

    switch (event) {
      case 'SIGNED_IN':
        handleSignedIn(session)
      case 'SIGNED_OUT':
        handleSignedOut()
    }
  }

  async function handleSignedIn(session: any) {
    const auth = useAuth(nuxtApp.$pinia)

    auth.setUser(session.user)

    const { data: profiles, error } = await nuxtApp.$supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)

    if (!error) auth.setProfile(profiles[0])

    if (auth.profile.initialized) {
      nuxtApp.$router.push({ name: 'library' })
      return
    }

    nuxtApp.$router.push({ name: 'profile-setup' })
  }

  function handleSignedOut() {
    const auth = useAuth(nuxtApp.$pinia)

    auth.$reset()
    nuxtApp.$router.push({ name: 'index' })
  }
})
