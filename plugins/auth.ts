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
        const { user, session, error } = await nuxtApp.$supabase.auth.signIn(
          {
            provider,
          },
          {
            redirectTo: window.location.origin + '/redirect',
          }
        )

        if (error) {
          this.auth.$reset()

          nuxtApp.$notify('An issue occured while logging in', {
            color: 'error',
          })

          throw error
        }

        // console.log('LOG IN:', { user, session })

        // UPDATE AUTH STORE
        // this.auth.setUser(user)
      }

      async logout() {
        const route = nuxtApp.$route.name

        nuxtApp.$router.push({ name: 'redirect' })

        setTimeout(async () => {
          const { error } = await nuxtApp.$supabase.auth.signOut()

          if (error) {
            nuxtApp.$router.push({ name: route })

            nuxtApp.$notify('An issue occured while logging out', {
              color: 'error',
            })

            return
          }
        }, 2000)
      }

      async fetchUser() {
        const user = await nuxtApp.$supabase.auth.user()

        console.log('FETCH USER:', user)

        if (!user) {
          this.auth.$reset()

          // nuxtApp.$supabase.auth.setAuth('invalid.auth.token')

          return
        } else this.auth.setUser(user)

        const session = nuxtApp.$supabase.auth.session()

        nuxtApp.$supabase.auth.setAuth(session.access_token)

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

    nuxtApp.$supabase.auth.setAuth(session.access_token)

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

    // nuxtApp.$supabase.auth.setAuth('invalid.auth.token')

    auth.$reset()
    nuxtApp.$router.push({ name: 'index' })
  }
})
