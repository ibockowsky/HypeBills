<template>
  <div
    class="relative w-full md:w-auto bg-gray-700 text-gray-400 rounded h-auto mx-2 my-2 py-1 pl-1 pr-6 shadow border-l-4"
    :class="{
      'border-red-600': type === 'error',
      'border-green-600': type === 'success'
    }"
  >
    <div class="absolute top-0 right-0 p-1">
      <button class="rounded-full hover:bg-gray-600" @click="$emit('expired')">
        <icon name="x" class="w-4 h-4" />
      </button>
    </div>
    <div class="font-bold capitalize">{{ type }}</div>
    <div>{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
  created() {
    setTimeout(() => this.$emit('expired'), 3000)
  },
  data() {
    return {
      content: this.alert.content,
      type: this.alert.type
    }
  }
}
</script>

<style lang="scss" scoped></style>
