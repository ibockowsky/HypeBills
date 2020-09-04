<template>
  <div>
    <AddDealModal
      v-if="showAddingModal"
      @toggle-modal="showAddingModal = !showAddingModal"
      @add-deal="add"
    />
    <router-view />
    <div
      class="mx-auto bg-gray-900 w-11/12 lg:w-3/4 shadow-md rounded p-1 min-h-full"
    >
      <div class="flex justify-between px-4 vertical-allign">
        <span class="text-3xl text-white ">Deals</span>
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          @click="showAddingModal = !showAddingModal"
        >
          <icon name="plus-circle" class="w-6 h-6"></icon>
        </button>
      </div>

      <TableDeals v-if="pageOfDeals.length > 0" :tableData="pageOfDeals" />
      <BasePagination :items="deals" @changePage="onChangePage" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableDeals from '@/components/TableDeals.vue'
import AddDealModal from '@/components/AddDealModal.vue'

export default {
  name: 'Deals',
  components: { TableDeals, AddDealModal },
  computed: {
    ...mapState('deals', ['deals'])
  },
  data() {
    return {
      showAddingModal: false,
      pageOfDeals: []
    }
  },
  created() {
    this.getDeals()
  },
  methods: {
    ...mapActions({
      addDeal: 'deals/addDeal',
      getDeals: 'deals/getDeals'
    }),
    add(items) {
      const {
        title,
        size,
        retail,
        payout,
        currency,
        date,
        where,
        status
      } = items
      const payload = {
        title,
        size,
        retail,
        payout,
        currency,
        date,
        where,
        status
      }
      this.addDeal(payload)
      this.showAddingModal = false
    },
    onChangePage(pageOfDeals) {
      this.pageOfDeals = pageOfDeals
    }
  }
}
</script>

<style lang="scss"></style>
