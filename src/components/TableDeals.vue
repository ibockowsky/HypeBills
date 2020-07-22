<template>
  <div class="px-2 sm:px-4 py-1 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              v-for="(field, $index) in tableFields"
              class="px-5 py-3 border-b-2 border-gray-900 bg-gray-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              :key="$index"
            >
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none">
          <TableRowDeals
            v-for="data in tableData"
            :key="data.id"
            :rowData="data"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableRowDeals from '@/components/TableRowDeals.vue'
export default {
  name: 'TableDeals',
  components: {
    TableRowDeals
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableFields: [
        'title',
        'size',
        'retail',
        'payout',
        'currency',
        'date',
        'shop',
        'sold'
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
