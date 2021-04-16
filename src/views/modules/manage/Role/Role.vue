<template>
  <div class="app-container">
    Role
  </div>
</template>

<script>

import { store } from '/@/store'
export default {
  name: 'Role',
  created() {
    console.log(store.getters)
  }
}
</script>

<style scoped>

</style>
