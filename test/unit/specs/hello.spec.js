import { createTest, createVue, destroyVM } from '../util'
import Hello from 'packages/hello'

describe('hello.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('render default classList in hello', () => {
    vm = createTest(Hello)
    expect(vm.$el.classList.contains('v-hello')).to.be.true
    const message = vm.$el.querySelector('.v-hello__message')
    expect(message.classList.contains('v-hello__message')).to.be.true
  })
  it('render default message in hello', () => {
    vm = createTest(Hello)
    expect(vm.$el.querySelector('.v-hello p').textContent).to.have.be.equal('hello ')
  })
  it('render custom message in hello', () => {
    vm = createTest(Hello, { message: 'component' }, true)
    expect(vm.$el.querySelector('.v-hello p').textContent).to.have.be.equal('hello component')
    expect(vm.message).to.equal('component')
  })
  it('create a hello for click with promise', (done) => {
    let result
    vm = createVue({
      template: `
        <v-hello @click="handleClick"></v-hello>
      `,
      methods: {
        handleClick (msg) {
          result = msg
        }
      }
    }, true)
    vm.$el.click()

    expect(result).to.not.exist
    setTimeout(_ => {
      expect(result).to.exist
      expect(result).to.equal('this is click emit')
      done()
    }, 20)
  })
})
