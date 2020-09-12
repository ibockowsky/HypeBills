<template>
  <div class="min-w-full m-2 bg-gray-750 md:min-w-1/4  rounded">
    <div class="flex flex-col bg-gray-800 text-center py-1 rounded shadow-md">
      <span class="text-white text-xl">{{ bill.title }}</span>
      <span class="text-gray-600 text-sm">{{
        bill.date instanceof Date
          ? bill.date.toLocaleDateString()
          : bill.date.toDate().toLocaleDateString()
      }}</span>
    </div>
    <div class="flex flex-col">
      <div class="flex px-2 pt-1 text-gray-600  text-xs">
        <div class="w-3/6">
          <span>Name</span>
        </div>
        <div class="w-2/6 text-left"><span>Price</span></div>
        <div class="w-1/6 text-right"><span>Buyer(s)</span></div>
      </div>
      <div class="flex px-2 py-1 ">
        <form @keyup.enter="addItem">
          <div class="flex flex-row space-x-1">
            <div class="w-1/2">
              <BaseSmallInput v-model="item_form.name" placeholder="Name" />
            </div>
            <div class="w-1/3">
              <BaseSmallInput v-model="item_form.price" placeholder="Price" />
            </div>
            <div class="w-1/6">
              <BaseSmallMultiselect
                v-model="item_form.buyers"
                :items="bill.other_buyers"
                placeholder="Name"
                class="text-right"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="h-128 overflow-y-auto">
        <template v-if="bill.items.length > 0"
          ><div
            v-for="item in bill.items"
            :key="item.id"
            class="flex px-2 py-1 text-gray-200"
          >
            <div class="w-1/2">{{ item.name }}</div>
            <div class="w-1/3">
              {{ item.price }} {{ currencySign(item.currency) }}
            </div>
            <div class="w-1/6 text-right">
              {{ item.buyers.length }}
            </div>
          </div></template
        >
      </div>
    </div>
  </div>
</template>

<script>
import { currencySign } from '@/mixins/currencySign.js'
import { mapActions } from 'vuex'

export default {
  name: 'Bills',
  mixins: [currencySign],
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    item_form: {
      name: '',
      price: '',
      buyers: ['Me']
    }
  }),
  methods: {
    ...mapActions({
      addItemToBill: 'bills/addItemToBill'
    }),
    addItem() {
      if (this.item_form)
        this.addItemToBill({ bill: this.bill, item: this.item_form })
    }
  }
}
</script>

<style lang="scss" scoped></style>
