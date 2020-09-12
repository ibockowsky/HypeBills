<template>
  <div class="relative">
    <!-- <div
      class="appearance-none text-center w-full border-b border-gray-800 focus:border-green-700 text-gray-600 bg-transparent leading-tight focus:outline-none"
      @click="open = !open"
      @blur="open = false"
    >
      <div>
        {{ value.length }}
      </div>
    </div> -->
    <BaseSmallInput
      :placeholder="value.length"
      @click="open = !open"
      text_align="right"
    />
    <div
      class="absolute text-center text-gray-400 bg-gray-800 my-2 border border-gray-800 rounded overflow-hidden z-10 right-0 left-0"
      :class="{ hidden: !open }"
    >
      <div class="py-1 px-4 my-1" v-for="(item, $index) of items" :key="$index">
        <input
          type="checkbox"
          :id="item"
          :value="item"
          v-model="selected"
          @change="$emit('input', selected)"
        />
        <label :for="item">{{ item }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSmallMultiselect',
  props: {
    value: { type: Array },
    items: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    open: false,
    selected: []
  }),
  mounted() {
    this.value.forEach(i => {
      this.selected.push(i)
    })
  }
}
</script>

<style lang="scss" scoped></style>
