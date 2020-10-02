<template>
  <div>
    <label v-if="label" class="block text-white text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-500 bg-gray-700 leading-tight focus:outline-none"
      :value="value"
      :class="{
        'border-red-500': errorClass
      }"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
    <div class="h-1 text-red-500 text-xs">
      <span v-if="errorClass">{{ errorContent }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    errorClass: { type: Boolean },
    errorContent: { type: String },
    value: [String, Number, Date]
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
