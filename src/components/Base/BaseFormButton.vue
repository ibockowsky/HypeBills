<template>
  <div class="rounded">
    <button
      type="button"
      class="w-full md:w-auto text-white py-2 px-5 rounded focus:outline-none"
      :class="{ 'cursor-not-allowed': isAnyError }"
      :disabled="isAnyError"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseFormButton',
  inheritAttrs: false,
  props: {
    isAnyError: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped></style>
