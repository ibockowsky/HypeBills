<template>
  <div
    class="absolute inset-0 m-auto flex justify-center align-middle items-center overflow-y-hidden"
  >
    <div class="fixed bg-black opacity-25 z-40 w-full min-h-full"></div>
    <div class="fixed w-full min-h-screen bg-red-600 z-50">xd</div>
  </div>
</template>

<script>
export default {
  name: 'AddDealModal',
  mounted() {
    document.body.classList.add('disable-scroll')
  },
  destroyed() {
    document.body.classList.remove('disable-scroll')
  }
}
</script>

<style lang="scss" scoped></style>
