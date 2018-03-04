// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vui from 'src/index.js'
import router from './router.config'

Vue.config.productionTip = false
Vue.use(Vui)

/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  router,
  components: { App },
  template: '<App/>'
})
