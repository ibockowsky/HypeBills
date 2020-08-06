<template>
  <tr>
    <td
      class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm"
      v-for="(col, $key, $index) in tableCol"
      :key="$index"
    >
      <template v-if="$key === 'status'">
        <!-- <span
          class="relative inline-block px-3 py-1 font-semibold capitalize leading-tight select-none"
          :class="{
            'text-green-900': col === 'sold',
            'text-red-900': col === 'in hold',
            'text-gray-900': col === 'unknown' || col === 'in transit'
          }"
        > -->
        <span
          class="relative inline-block px-3 py-1 text-gray-900 font-semibold capitalize leading-tight select-none"
        >
          <span
            aria-hidden
            class="absolute inset-0 rounded-full opacity-75"
            :class="{
              'bg-green-400': col === 'sold',
              'bg-red-500': col === 'in hold',
              'bg-gray-600': col === 'unknown',
              'bg-yellow-500': col === 'in transit'
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
  name: 'TableRowDeals',
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
        status: this.rowData.status
      }
    }
  }
}
</script>

<style lang="scss"></style>
