<template>
  <div class="min-w-full m-2 bg-gray-750 md:min-w-1/4  rounded">
    <div class="bg-gray-800 text-center py-1 rounded shadow-md w-full">
      <div class="relative flex flex-col">
        <span v-if="!isEditable" class="text-white text-xl">{{
          bill.title
        }}</span>
        <div class="mx-auto">
          <BaseSmallInput
            v-if="isEditable"
            v-model="bill.title"
            placeholder="Title"
            text_align="center"
          />
        </div>

        <span class="text-gray-600 text-sm">{{
          bill.date instanceof Date
            ? bill.date.toLocaleDateString()
            : bill.date.toDate().toLocaleDateString()
        }}</span>
        <div class="absolute right-0">
          <div class="flex flex-col">
            <button
              class="pr-1 pt-1 text-gray-600 focus:outline-none"
              @click="removeBill(bill.id)"
            >
              <icon name="x" class="w-4 h-4"></icon>
            </button>
            <button
              class="pr-1 pt-1 text-gray-600 focus:outline-none"
              @click="isEditable = !isEditable"
              :class="{ 'text-green-700': isEditable }"
            >
              <icon name="clipboard" class="w-4 h-4"></icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div v-if="!isEditable" class="flex px-2 pt-1 text-gray-600  text-xs">
        <div class="w-1/2">
          <span>Name</span>
        </div>
        <div class="w-1/4 text-left"><span>Price</span></div>
        <div class="w-1/4 text-right"><span>Buyer(s)</span></div>
      </div>
      <div v-if="isEditable" class="relative w-full flex px-2 py-1 ">
        <form @keyup.enter="addItem">
          <div class="flex flex-row w-full">
            <div class="w-1/2 px-1">
              <BaseSmallInput v-model="item_form.name" placeholder="Name" />
            </div>
            <div class="w-1/4 px-1">
              <BaseSmallInput v-model="item_form.price" placeholder="Price" />
            </div>
            <div class="w-1/4 px-1">
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
            <div class="w-1/4">
              {{ item.price }} {{ currencySign(item.currency) }}
            </div>
            <div class="w-1/4 text-right">
              {{ item.buyers.length }}
            </div>
          </div></template
        >
      </div>
    </div>
  </div>
</template>

<script>
import { currencySign } from '@/helpers/calcHelpers.js'
import { mapActions } from 'vuex'

export default {
  name: 'Bills',
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
    },
    isEditable: false
  }),
  methods: {
    ...mapActions({
      addItemToBill: 'bills/addItemToBill',
      removeBill: 'bills/removeBill'
    }),
    addItem() {
      if (this.item_form)
        this.addItemToBill({ bill: this.bill, item: this.item_form })
    }
  }
}
</script>

<style lang="scss" scoped></style>
