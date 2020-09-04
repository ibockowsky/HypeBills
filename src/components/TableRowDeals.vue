<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <input type="checkbox" @change="$emit('selected-deal')" />
    </td>
    <td
      class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm"
      v-for="(col, $key, $index) in tableCol"
      :class="{ hidden: $key === 'id' || $key === 'uid' }"
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
      <template v-else-if="$key === 'id' || $key === 'uid'"></template>
      <template v-else-if="$key === 'retail' || $key === 'payout'">
        <span class="text-gray-200 whitespace-no-wrap"
          >{{ col ? col : '0' }} {{ currencySign(tableCol.currency) }}</span
        >
      </template>
      <template v-else-if="$key === 'date'">
        <span
          class="text-gray-200 whitespace-no-wrap"
          :class="{ 'text-gray-800': !col }"
        >
          {{ col ? col.toLocaleDateString() : 'undefined' }}
        </span>
      </template>
      <span
        v-else
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !col }"
      >
        {{ col ? col : 'undefined' }}
      </span>
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
import { currencySign } from '@/mixins/currencySign.js'

export default {
  name: 'TableRowDeals',
  mixins: [currencySign],
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  watch: {
    rowData() {
      this.tableCol = this.rowData
    }
  },
  data() {
    return {
      tableCol: this.rowData
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
