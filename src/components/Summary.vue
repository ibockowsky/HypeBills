<template>
  <div class="mx-auto m-2 bg-gray-900 w-11/12 shadow-md rounded h-56">
    <div class="flex flex-row justify-between text-gray-200">
      <div class="px-3 py-1">
        <span class="font-semibold">Total outgoing:</span>
        {{ totalOutgoings }} {{ currencySign(getBaseCurrency) }}
      </div>
      <div class="px-3 py-1">
        <span class="font-semibold">Hold:</span>
        {{ currentHold }} {{ currencySign(getBaseCurrency) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  D_GET_TOTAL_OUTGOINGS,
  D_GET_TOTAL_INCOMINGS,
  D_GET_CURRENT_HOLD,
  D_GET_PROBABLE_INCOME,
  D_GET_TOTAL_EARNINGS,
  U_GET_BASE_CURRENCY,
  U_CHANGE_DEFAULT_CURRENCY
} from '@/store/mutation-types.js'
import currencySign from '@/mixins/currencySign.js'
export default {
  name: 'Summary',
  computed: {
    ...mapGetters({
      totalOutgoings: D_GET_TOTAL_OUTGOINGS,
      totalIncomings: D_GET_TOTAL_INCOMINGS,
      currentHold: D_GET_CURRENT_HOLD,
      probableIncome: D_GET_PROBABLE_INCOME,
      totalEarnings: D_GET_TOTAL_EARNINGS,
      getBaseCurrency: U_GET_BASE_CURRENCY
    })
  },
  data: () => ({
    isChangingCurrency: false,
    currency: null
  }),
  methods: {
    ...mapActions({
      changeDefaultCurrency: U_CHANGE_DEFAULT_CURRENCY
    }),
    changeCurrency() {
      this.changeDefaultCurrency(this.currency)
      this.isChangingCurrency = false
    },
    ...currencySign
  }
}
</script>

<style lang="scss" scoped></style>
