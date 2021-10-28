import pathify from 'vuex-pathify'

pathify.options.mapping = (type, name, formatters) => {
  switch (type) {
    case 'mutations':
      return formatters.const('set', name) // SET_FOO
    case 'actions':
      return formatters.camel('set', name) // setFoo
    case 'getters':
      return formatters.camel('get', name) // getFoo
  }

  return name // foo
}

export default pathify.plugin
