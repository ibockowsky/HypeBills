<template>
  <div class="px-2 sm:px-4 py-1 overflow-x-scroll">
    <BaseConfirmDialog
      v-if="confirmDialog.open"
      @callback="handleCallback"
    ></BaseConfirmDialog>
    <div class="inline-block min-w-full shadow rounded-lg">
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
            @remove-deal="removeDeal(data.id)"
            @edit-deal="editDeal(data.id)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableRowDeals from '@/components/TableRowDeals.vue'
import { D_REMOVE_DEAL } from '@/store/mutation-types.js'
import { mapActions } from 'vuex'

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
  data: () => ({
    tableFields: [
      '',
      'title',
      'size',
      'retail',
      'payout',
      'currency',
      'date',
      'where',
      'status',
      'options'
    ],
    confirmDialog: { open: false, toDeleteID: null }
  }),
  methods: {
    ...mapActions({
      remove: D_REMOVE_DEAL
    }),
    removeDeal(id) {
      this.confirmDialog.open = true
      this.confirmDialog.toDeleteID = id
    },
    editDeal(id) {
      this.$router.push(`deals/${id}`)
    },
    handleCallback(callback) {
      if (callback) {
        this.remove(this.confirmDialog.toDeleteID)
      }
      this.confirmDialog.open = false
      this.confirmDialog.toDeleteID = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
