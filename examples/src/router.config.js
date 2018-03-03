import Vue from 'vue'
import Router from 'vue-router'
import hello from '../pages/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: hello
    }
  ]
})
