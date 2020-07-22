<template>
  <tr>
    <td
      class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm"
      v-for="col in tableCol"
      :key="col.title"
    >
      <p class="text-gray-200 whitespace-no-wrap">{{ col }}</p>
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
        shop: this.rowData.shop,
        sold: this.rowData.sold
      }
    }
  }
}
</script>

<style lang="scss"></style>
