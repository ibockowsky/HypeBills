<template>
  <div
    class="mx-auto m-2 bg-gray-900 w-11/12 lg:w-3/4 shadow-md rounded p-1 min-h-full"
  >
    <div class="flex justify-between px-4 vertical-allign">
      <span class="text-3xl text-white ">Bills</span>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
        @click="addBill"
      >
        <icon name="plus-circle" class="w-6 h-6"></icon>
      </button>
    </div>
    <div class="flex w-full overflow-x-scroll">
      <Bill v-for="bill in bills" :key="bill.id" :bill="bill" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { B_ADD_BILL, U_GET_USER_ID } from '@/store/mutation-types.js'
import Bill from '@/components/Bill.vue'

export default {
  name: 'Bills',
  components: { Bill },
  computed: {
    ...mapState({
      bills: state => state.bills.bills
    }),
    ...mapGetters({
      uid: U_GET_USER_ID
    })
  },
  methods: {
    ...mapActions({
      add: B_ADD_BILL
    }),
    addBill() {
      const new_bill = {
        title: 'Set title',
        other_buyers: ['Me'],
        items: [],
        date: new Date(),
        uid: this.uid
      }
      this.add(new_bill)
    }
  }
}
</script>

<style lang="scss" scoped></style>
