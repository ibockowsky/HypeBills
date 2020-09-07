<template>
  <div class="mx-auto m-2 bg-gray-900 w-11/12 lg:w-3/4 shadow-md rounded h-56">
    <div
      class="flex flex-1 justify-between w-full text-lg font-semibold text-gray-200 px-2 py-3"
    >
      <div class="flex flex-col ">
        <div>Outgoings (total): {{ totalOutgoings }} {{ getBaseCurrency }}</div>
        <div>Incomings (total): {{ totalIncomings }} {{ getBaseCurrency }}</div>
        <div>
          Icome (total): {{ (totalIncomings - totalOutgoings).toFixed(2) }}
          {{ getBaseCurrency }}
        </div>
      </div>
      <div class="flex flex-col">
        <div>Hold (currently): {{ currentHold }} {{ getBaseCurrency }}</div>
        <div>
          Probable profit (currently):
          {{ (probableIncome - currentHold).toFixed(2) }}
          {{ getBaseCurrency }}
        </div>
        <div>
          Current currency:
          <span
            v-if="!isChangingCurrency"
            @click="isChangingCurrency = !isChangingCurrency"
          >
            {{ getBaseCurrency }}</span
          >
          <div v-if="isChangingCurrency">
            <div class="flex items-baseline w-full">
              <div class="w-3/4 px-1">
                <BaseSelect
                  v-model="currency"
                  :options="['PLN', 'EUR', 'USD', 'GBP']"
                />
              </div>
              <div class="w-1/4 px-1">
                <button
                  class="bg-gray-800 hover:bg-gray-700 px-2 py-2 text-gray-200 rounded focus:outline-none"
                  @click="changeCurrency"
                >
                  <icon name="plus" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Summary',
  computed: {
    ...mapGetters({
      totalOutgoings: 'deals/getTotalOutgoings',
      totalIncomings: 'deals/getTotalIncomings',
      currentHold: 'deals/getCurrentHold',
      probableIncome: 'deals/getProbableIncome',
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
