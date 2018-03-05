<template>
  <div class="v-hello">
    <p class="v-hello__message">
      hello {{ message }}
    </p>
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

<style>
.v-hello {
  font-size: 20px;
}
</style>

