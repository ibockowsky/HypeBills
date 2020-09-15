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
import { formFieldMixin } from '@/mixins/formFieldMixin'
export default {
  name: 'BaseSmallInput',
  props: {
    text_align: {
      type: String
    }
  },
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
