<template>
  <div class="relative">
    <input
      class="appearance-none w-full border-b border-gray-900 focus:border-green-700 text-gray-400 bg-transparent leading-tight focus:outline-none"
      :value="value"
      :class="{
        'border-red-500': errorClass,
        'text-right': text_align === 'right',
        'text-center': text_align === 'center'
      }"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseSmallInput',
  inheritAttrs: false,
  props: {
    text_align: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    errorClass: {
      type: Boolean
    },
    value: [String, Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
