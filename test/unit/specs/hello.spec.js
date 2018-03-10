import Vue from 'vue'
import Hello from 'packages/hello'

describe('hello.vue', () => {
  it('should render default contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()

    console.log(vm.$el.querySelector('.v-hello p').textContent)
    expect(vm.$el.querySelector('.v-hello p').textContent).to.have.be.equal('hello ')
    expect(vm.$el.classList.contains('v-hello')).to.be.true
    const message = vm.$el.querySelector('.v-hello__message')
    expect(message.classList.contains('v-hello__message')).to.be.true
  })
  it('should render prop contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor({
      propsData: {
        message: 'component'
      }
    }).$mount()
    expect(vm.$el.classList.contains('v-hello')).to.be.true
    expect(vm.$el.querySelector('.v-hello p').textContent).to.have.be.equal('hello component')
    const message = vm.$el.querySelector('.v-hello__message')
    expect(message.classList.contains('v-hello__message')).to.be.true
  })
})
