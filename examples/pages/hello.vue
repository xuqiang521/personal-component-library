<template>
  <div class="hello-page">
    <v-hello message="my component library" @click="handleClick"></v-hello>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    handleClick (msg) {
      this.msg = msg
    }
  }
}
</script>




