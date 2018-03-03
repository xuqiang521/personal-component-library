import { version } from '../package.json'
import Hello from '../packages/hello'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(Hello.name, Hello)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  Hello
}
