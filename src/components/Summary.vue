<template>
  <div class="mx-auto m-2 bg-gray-900 w-11/12 shadow-md rounded h-56">
    <div class="flex flex-row justify-between text-gray-200">
      <div class="px-3 py-1">
        <span class="font-semibold">Total outgoing:</span>
        {{ totalOutgoings }}
        {{ currencySign(getBaseCurrency) }}
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
import currencySign from '@/helpers/currencySign.js'
export default {
  name: 'Summary',
  computed: {
    ...mapGetters({
      totalOutgoings: 'deals/getTotalOutgoings',
      totalIncomings: 'deals/getTotalIncomings',
      currentHold: 'deals/getCurrentHold',
      probableIncome: 'deals/getProbableIncome',
      totalEarnings: 'deals/getTotalEarnings',
      getBaseCurrency: 'user/getBaseCurrency'
    })
  },
  data: () => ({
    isChangingCurrency: false,
    currency: null
  }),
  methods: {
    ...mapActions({
      changeDefaultCurrency: 'user/changeDefaultCurrency'
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
