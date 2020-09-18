<template>
  <div
    class="absolute inset-0 m-auto flex justify-center items-center overflow-y-hidden"
  >
    <div
      class="fixed bg-black opacity-25 z-40 w-full min-h-full"
      @click="$emit('callback', false)"
    ></div>
    <div
      class="flex flex-col rounded bg-gray-800 text-gray-200 shadow px-4 py-2 z-50"
    >
      <span class="text-xl pb-2">Are you sure?</span>
      <span>You are about to delete this item.</span>
      <div class="flex flex-row-reverse pt-4">
        <button
          class="bg-green-700 hover:bg-green-800 focus:outline-none rounded px-3 py-1 mx-2"
          @click="$emit('callback', true)"
        >
          Yes
        </button>
        <button
          class="bg-gray-750 hover:bg-gray-700 focus:outline-none rounded px-3 py-1"
          @click="$emit('callback', false)"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseConfirmDialog'
}
</script>

<style lang="scss" scoped></style>
