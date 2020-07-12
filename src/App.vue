<template>
  <div id="app">
    <Navbar />
    <div class="mx-auto w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style></style>
