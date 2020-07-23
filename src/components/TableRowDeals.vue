<template>
  <tr>
    <td
      class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm"
      v-for="(col, $key, $index) in tableCol"
      :key="$index"
    >
      <template v-if="$key === 'sold'">
        <span
          class="relative inline-block px-3 py-1 font-semibold capitalize leading-tight"
          :class="{
            'text-green-900': col === true,
            'text-red-900': col === false
          }"
        >
          <span
            aria-hidden
            class="absolute inset-0 rounded-full opacity-75"
            :class="{
              'bg-green-400': col === true,
              'bg-red-500': col === false
            }"
          ></span>
          <span class="relative">{{ col }}</span>
        </span>
      </template>
      <span v-else class="text-gray-200 whitespace-no-wrap">{{ col }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableCol: {
        title: this.rowData.title,
        size: this.rowData.size,
        retail: this.rowData.retail,
        payout: this.rowData.payout,
        currency: this.rowData.currency,
        date: this.rowData.date.toLocaleDateString(),
        where: this.rowData.where,
        sold: this.rowData.sold
      }
    }
  }
}
</script>

<style lang="scss"></style>
