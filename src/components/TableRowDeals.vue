<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-1/20">
      <input type="checkbox" @change="$emit('selected-deal')" />
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-3/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.title }"
      >
        {{ rowData.title ? rowData.title : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.size }"
      >
        {{ rowData.size ? rowData.size : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.retail }"
      >
        {{ retail }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.payout }"
      >
        {{ payout }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.currency }"
      >
        {{ rowData.currency ? `${rowData.currency}` : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.date }"
      >
        {{ formattedDate }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
      <span
        class="text-gray-200 whitespace-no-wrap"
        :class="{ 'text-gray-800': !rowData.where }"
      >
        {{ rowData.where ? rowData.where : '' }}
      </span>
    </td>
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
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
    <td class="px-5 py-5 border-b border-gray-900 bg-gray-700 text-sm w-2/20">
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
import Dinero from 'dinero.js'
import currencySign from '@/helpers/currencySign.js'
import { parseToAmount } from '@/helpers/calcHelpers.js'

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

      const moneyTypeRetail = Dinero({
        amount: parseToAmount(retail),
        currency
      }).toFormat('0.00')

      return `${moneyTypeRetail} ${this.currencySign(currency)}`
    },
    payout() {
      const { payout, currency } = this.rowData

      const moneyTypePayout = Dinero({
        amount: parseToAmount(payout),
        currency
      }).toFormat('0.00')

      return `${moneyTypePayout} ${this.currencySign(currency)}`
    },
    formattedDate() {
      const { date } = this.rowData

      return date instanceof Date
        ? date.toLocaleDateString()
        : date.toDate().toLocaleDateString()
    }
  }
}
</script>

<style lang="scss"></style>
