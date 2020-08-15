<template>
  <div
    class="relative w-auto rounded h-auto text-red-700 bg-red-100 mx-2 my-2 p-1 shadow border-l-4 border-red-700"
  >
    <div class="absolute top-0 right-0 p-1">
      <button @click="$emit('expired')">
        <icon name="x" class="w-4 h-4" />
      </button>
    </div>
    <div class="font-bold">{{ title }}</div>
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
    setTimeout(() => this.$emit('expired'), 2000)
  },
  data() {
    return {
      title: this.alert.title,
      content: this.alert.content,
      type: this.alert.type
    }
  }
}
</script>

<style lang="scss" scoped></style>
