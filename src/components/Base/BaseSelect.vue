<template>
  <div class="relative">
    <label v-if="label" class="block text-white text-sm font-bold mb-2">
      {{ label }}
    </label>
    <!-- <select
      class="shadow appearance-none border border-gray-800 rounded w-full py-2 px-3 text-gray-500 bg-gray-700 leading-tight focus:outline-none"
      :class="{
        'border-red-500': errorClass
      }"
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="(option, $index) in options"
        :value="option"
        :key="$index"
        :selected="option === value"
        >{{ option }}</option
      >
    </select> -->
    <div
      class="shadow appearance-none border border-gray-800 rounded capitalize w-full py-2 px-3 text-gray-500 bg-gray-700 leading-tight focus:outline-none select-none"
      :tabindex="tabindex"
      @click="open = !open"
      @blur="open = false"
    >
      <div>
        {{ selected }}
      </div>
      <div
        class="absolute bg-gray-800 my-2 border border-gray-800 rounded overflow-hidden z-10 right-0 left-0"
        :class="{ hidden: !open }"
      >
        <div
          class="py-1 px-4 my-1 rounded hover:bg-gray-700"
          v-for="(option, $index) of options"
          :key="$index"
          @click.prevent="
            selected = option
            open = 'false'
            $emit('input', option)
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: { type: String },
    errorClass: {
      type: Boolean
    },
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  watch: {
    value() {
      this.selected = this.options[this.options.indexOf(this.value)]
    }
  },
  data() {
    return {
      selected: this.value
        ? this.options[this.options.indexOf(this.value)]
        : this.options[0],
      open: false
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  }
}
</script>

<style scoped></style>
