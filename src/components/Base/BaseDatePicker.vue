<template>
  <div>
    <vc-date-picker
      :value="value"
      :popover="{
        placement: 'top',
        visibility: 'click'
      }"
      color="purple"
      is-dark
      @input="updateValue"
    >
      <BaseInput
        :label="label"
        type="text"
        slot-scope="{ inputProps, inputEvents }"
        v-bind="inputProps"
        v-on="inputEvents"
      />
    </vc-date-picker>
  </div>
</template>

<script>
export default {
  name: 'BaseDatePicker',
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    errorClass: { type: Boolean },
    errorContent: { type: String },
    value: [Date]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
