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

      get getUser() {
        return this.auth.getUser
      }

      get getAvatar() {
        return this.auth.getAvatar
      }

      get getFirstName() {
        return this.auth.getFirstName
      }

      get getLastName() {
        return this.auth.getLastName
      }

      get getFullName() {
        return this.auth.getFullName
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

        if (!user) this.auth.$reset()
        else this.auth.setUser(user)
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

  function handleSignedIn(session: any) {
    const auth = useAuth(nuxtApp.$pinia)

    auth.setUser(session.user)
    nuxtApp.$router.push({ name: 'dashboard' })
  }

  function handleSignedOut() {
    const auth = useAuth(nuxtApp.$pinia)

    auth.$reset()
    nuxtApp.$router.push({ name: 'index' })
  }
})
