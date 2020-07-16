<template>
  <p class="text-red-500 text-sm font-semibold">{{ message }}</p>
</template>

<script>
export default {
  name: 'BaseInputError',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
