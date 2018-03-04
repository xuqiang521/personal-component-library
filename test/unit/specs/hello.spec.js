import Vue from 'vue'
import Hello from 'packages/hello'

describe('hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    console.log(vm.$el)
    // expect(vm.$el.querySelector('.v-hello').to.be.ok)
    // expect(vm.hasClass('.v-hello').to.be.true)
  })
})
