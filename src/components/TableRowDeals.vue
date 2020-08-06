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
              'bg-red-500': col === 'on hold' || col === 'in hold',
              'bg-gray-600': col === 'unknown',
              'bg-yellow-500': col === 'in transit'
            }"
          ></span>
          <span class="relative">{{ col }}</span>
        </span>
      </template>
      <span v-else class="text-gray-200 whitespace-no-wrap">{{ col }}</span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <div class="flex space-x-1">
        <button
          class="bg-yellow-600 hover:bg-yellow-800 text-white py-1 px-2 rounded-full focus:outline-none"
          @click="editDeal"
        >
          <icon name="clipboard" class="w-5 h-5" />
        </button>
        <button
          class="bg-red-600 hover:bg-red-800 text-white py-1 px-2 rounded-full focus:outline-none"
          @click="removeDeal"
        >
          <icon name="trash" class="w-5 h-5" />
        </button>
      </div>
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
  watch: {
    rowData() {
      this.tableCol.title = this.rowData.title
      this.tableCol.size = this.rowData.size
      this.tableCol.retail = this.rowData.retail
      this.tableCol.payout = this.rowData.payout
      this.tableCol.currency = this.rowData.currency
      this.tableCol.date = this.rowData.date.toLocaleDateString()
      this.tableCol.where = this.rowData.where
      this.tableCol.status = this.rowData.status
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
  },
  methods: {
    removeDeal() {
      this.$emit('remove-deal')
    },
    editDeal() {
      this.$emit('edit-deal')
    }
  }
}
</script>

<style lang="scss"></style>
