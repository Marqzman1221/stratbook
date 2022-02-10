import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp: any) => {
  function initlaizeClient(): SupabaseClient {
    const options = {
      schema: 'public',
      headers: {
        authorization: '',
      },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }

    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string
      // options
    )

    // supabase.auth.setAuth('invalid.auth.token')

    return supabase
  }

  nuxtApp.provide('supabase', initlaizeClient())
})
