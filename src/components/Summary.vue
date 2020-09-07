<template>
  <div class="mx-auto m-2 bg-gray-900 w-11/12 lg:w-3/4 shadow-md rounded h-56">
    <div
      class="flex flex-1 justify-between w-full text-lg font-semibold text-gray-200 px-2 py-3"
    >
      <div class="flex flex-col ">
        <div>Outgoings (total): {{ totalOutgoings }} {{ currency }}</div>
        <div>Incomings (total): {{ totalIncomings }} {{ currency }}</div>
        <div>
          Icome (total): {{ totalIncomings - totalOutgoings }} {{ currency }}
        </div>
      </div>
      <div class="flex flex-col">
        <div>Hold (currently): {{ currentHold }} {{ currency }}</div>
        <div>
          Probable profit (currently): {{ probableIncome - currentHold }}
          {{ currency }}
        </div>
        <div>Current currency:</div>
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
      currency: 'user/getBaseCurrency'
    })
  }
}
</script>

<style lang="scss" scoped></style>
