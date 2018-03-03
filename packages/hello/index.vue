<template>
  <div class="v-hello">
    hello {{ message }}
  </div>
</template>

<script>
export default {
  name: 'v-hello',
  props: {
    message: String
  }
}
</script>
