import { routeOption, getMatchedComponents, insidePage } from '~/util/auth'
import type { Middleware } from '@nuxt/types'

export default <Middleware>async function (ctx: any) {
  const { $auth, $config, route, redirect } = ctx

  const { login, home } = $config.auth.redirect

  if (!$auth.loggedIn) await $auth.fetchUser()

  // Disable middleware if no route was matched to allow error page
  const matches: any[] = []
  const components = getMatchedComponents(route, matches)

  // If page is not found, route to either home or login
  if (!components.length) {
    redirect($auth.loggedIn ? home : login)
    return
  }

  if (
    $auth.loggedIn &&
    $auth.profile &&
    !$auth.profile.initialized &&
    !insidePage(ctx, route, '/profile-setup')
  ) {
    redirect('/profile-setup')
    return
  }

  // If no auth on page, pass
  if (routeOption(route, 'auth', false)) return

  // If not authenticated, and navigating to auth route
  if (!$auth.loggedIn && routeOption(route, 'auth', undefined)) {
    redirect(login)
    return
  }

  const isGuestPage = routeOption(route, 'auth', 'guest')

  // Handle guest page route
  if (isGuestPage) {
    if ($auth.loggedIn) {
      redirect(home)
      return
    } else return
  }

  return
}
