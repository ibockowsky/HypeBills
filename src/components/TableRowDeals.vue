<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <input type="checkbox" @change="$emit('selected-deal')" />
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.title }"
      >
        {{ rowData.title ? rowData.title : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.size }"
      >
        {{ rowData.size ? rowData.size : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.retail }"
      >
        {{
          rowData.retail
            ? `${rowData.retail} ${currencySign(rowData.currency)}`
            : ''
        }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.payout }"
      >
        {{
          rowData.payout
            ? `${rowData.payout} ${currencySign(rowData.currency)}`
            : ''
        }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.currency }"
      >
        {{ rowData.currency ? `${rowData.currency}` : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.date }"
      >
        {{
          rowData.date instanceof Date
            ? rowData.date.toLocaleDateString()
            : rowData.date.toDate().toLocaleDateString()
        }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.where }"
      >
        {{ rowData.where ? rowData.where : '' }}
      </span>
    </td>
    <td
      class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm text-center"
    >
      <span
        class="relative inline-block px-3 py-1 text-gray-900 font-semibold capitalize leading-tight select-none"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-gray-600 rounded-full opacity-75"
          :class="{
            'bg-green-400': rowData.status === 'sold',
            'bg-red-500':
              rowData.status === 'on hold' || rowData.status === 'in hold',
            'bg-gray-600': rowData.status === 'unknown',
            'bg-yellow-500': rowData.status === 'in transit'
          }"
        ></span>
        <span class="relative">{{ rowData.status }}</span>
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
          {{ retail }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import Dinero from 'dinero.js'
import currencySign from '@/mixins/currencySign.js'

export default {
  name: 'TableRowDeals',
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeDeal() {
      this.$emit('remove-deal')
    },
    editDeal() {
      this.$emit('edit-deal')
    },
    ...currencySign
  },
  computed: {
    retail() {
      const { retail, currency } = this.rowData
      const intRetail = parseInt(
        retail
          .toString()
          .replace(',', '')
          .replace('.', '')
      )

      return intRetail
    }
  }
}
</script>

<style lang="scss"></style>
