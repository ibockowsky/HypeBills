<template>
  <div>
    <button
      v-on="$listeners"
      v-bind="$attrs"
      class="transition-all duration-500 ease-in-out text-white font-semibold  py-2 px-8 rounded shadow focus:outline-none transform hover:-translate-y-1 hover:scale-110 bg-gradient-default-blue-pink"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    }
  }
}
</script>
