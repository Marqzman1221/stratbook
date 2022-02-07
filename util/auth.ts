export function routeOption(
  route: any,
  key: string,
  value: string | boolean | undefined
) {
  return route.matched.some((match: any) => {
    return Object.values(match.components).some(
      (component: any) => component.options && component.options[key] === value
    )
  })
}

export function getMatchedComponents(route: any, matches: any[]) {
  return [].concat(
    ...[],
    ...route.matched.map((match: any, index: number) => {
      return Object.keys(match.components).map((key) => {
        matches.push(index)

        return match.components[key]
      })
    })
  )
}

export function normalizePath(path: string = '', ctx: any) {
  // Remove query string
  let result = path.split('?')[0]

  // Remove base path
  if (ctx && ctx.base) result = result.replace(ctx.base, '/')

  // Remove redundant / from the end of path
  if (result.charAt(result.length - 1) === '/') result = result.slice(0, -1)

  // Remove duplicate slashes
  result = result.replace(/\/+/g, '/')

  return result
}

export function insidePage(ctx: any, route: any, page: string) {
  if (!route) return false
  return normalizePath(route.path, ctx) === normalizePath(page, ctx)
}
