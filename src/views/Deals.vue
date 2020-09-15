<template>
  <div>
    <AddDealModal
      v-if="showAddingModal"
      @toggle-modal="showAddingModal = !showAddingModal"
      @add-deal="add"
    />
    <router-view />
    <div
      class="mx-auto m-2 bg-gray-900 w-11/12 lg:w-3/4 shadow-md rounded p-1 min-h-full"
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
import { D_ADD_DEAL } from '@/store/mutation-types.js'
import TableDeals from '@/components/TableDeals.vue'
import AddDealModal from '@/components/AddDealModal.vue'

export default {
  name: 'Deals',
  components: { TableDeals, AddDealModal },
  computed: {
    ...mapState({
      deals: state => state.deals.deals
    })
  },
  data() {
    return {
      showAddingModal: false,
      pageOfDeals: []
    }
  },

  methods: {
    ...mapActions({
      addDeal: D_ADD_DEAL
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
        status,
        uid
      } = items
      const payload = {
        title,
        size,
        retail,
        payout,
        currency,
        date,
        where,
        status,
        uid
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
