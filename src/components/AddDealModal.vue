<template>
  <div
    class="absolute inset-0 m-auto flex justify-center items-center overflow-y-hidden"
  >
    <div
      class="fixed w-full min-h-screen z-40 inset-0 bg-black opacity-50"
      @click.prevent="toggleAddModal"
    ></div>
    <div
      class="fixed md:static flex items-center justify-center md:border border-gray-800 shadow-lg bg-gray-900 w-full md:w-3/4 xl:w-2/5 sm:mx-auto rounded z-50"
    >
      <div class="py-4 text-left px-2 overflow-hidden min-h-screen md:min-h-0">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl text-white font-bold">Add deal</p>
          <span
            class="text-gray-700 hover:text-gray-600"
            @click.prevent="toggleAddModal"
            ><icon name="x" class="w-6 h-6"
          /></span>
        </div>
        <div class="mt-2 h-96 md:h-112 overflow-y-auto">
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full px-3 mb-3">
                <BaseAutocompleteInput
                  label="Title"
                  v-model="$v.dealForm.title.$model"
                  type="text"
                  :errorClass="$v.dealForm.title.$error"
                  @blur="$v.dealForm.title.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-3/4 px-3 mb-3">
                <BaseInput
                  label="Size"
                  v-model="$v.dealForm.size.$model"
                  type="text"
                  :errorClass="$v.dealForm.size.$error"
                  @blur="$v.dealForm.size.$touch()"
                />
              </div>
              <div class="w-full md:w-1/4 px-3 mb-3">
                <BaseSelect
                  label="Status"
                  v-model="$v.dealForm.status.$model"
                  :options="['unknown', 'on hold', 'sold', 'in transit']"
                  :errorClass="$v.dealForm.status.$error"
                  @blur="$v.dealForm.status.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-5/12 px-3 mb-3">
                <BaseInput
                  label="Retail"
                  v-model="$v.dealForm.retail.$model"
                  type="text"
                  :errorClass="$v.dealForm.retail.$error"
                  @blur="$v.dealForm.retail.$touch()"
                />
              </div>
              <div class="w-full md:w-5/12 px-3 mb-3">
                <BaseInput
                  label="Payout"
                  v-model="$v.dealForm.payout.$model"
                  type="text"
                  :errorClass="$v.dealForm.payout.$error"
                  @blur="$v.dealForm.payout.$touch()"
                />
              </div>
              <div class="w-full md:w-1/6 px-3 mb-3">
                <BaseSelect
                  label="Currency"
                  v-model="$v.dealForm.currency.$model"
                  :options="['PLN', 'EUR', 'USD', 'GBP']"
                  :errorClass="$v.dealForm.currency.$error"
                  @blur="$v.dealForm.currency.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-4/12 px-3 mb-3">
                <label class="block text-white text-sm font-bold mb-2">
                  Date
                </label>
                <vc-date-picker
                  v-model="dealForm.date"
                  :popover="{
                    placement: 'top',
                    visibility: 'click'
                  }"
                  :input-props="{
                    class:
                      'shadow appearance-none border border-gray-800 rounded w-full py-2 px-3 text-gray-500 bg-gray-700 leading-tight focus:outline-none'
                  }"
                  color="purple"
                  is-dark
                />
              </div>
              <div class="w-full md:w-2/12 px-3 mb-3">
                <BaseInput
                  label="Qty."
                  v-model.number="$v.qty.$model"
                  :errorClass="$v.qty.$error"
                  @blur="$v.qty.$touch()"
                />
              </div>
              <div class="w-full md:w-6/12 px-3 mb-3">
                <BaseInput
                  label="Where"
                  v-model="$v.dealForm.where.$model"
                  type="text"
                  :errorClass="$v.dealForm.where.$error"
                  @blur="$v.dealForm.where.$touch()"
                />
              </div>
            </div>
          </form>
        </div>
        <div
          class="flex flex-col-reverse md:flex-row-reverse text-right mt-6 md:-mt-10"
        >
          <span class="shadow-sm my-1 md:my-0 md:mx-1">
            <button
              type="button"
              class="w-full md:w-auto text-white bg-green-600 hover:bg-green-800 py-2 px-5 rounded"
              :class="{ 'cursor-not-allowed': $v.dealForm.$anyError }"
              :disabled="$v.dealForm.$anyError"
              @click="addDeal(dealForm)"
            >
              Add
            </button>
          </span>
          <span class="shadow-sm my-1 md:my-0 md:mx-1">
            <button
              type="button"
              class="w-full md:w-auto text-white bg-gray-700 hover:bg-gray-800 py-2 px-5 rounded"
              @click="toggleAddModal"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddDealModal',
  computed: {
    ...mapGetters({
      uid: 'user/getUserId'
    })
  },
  data: () => ({
    dealForm: {
      title: '',
      size: '',
      retail: '',
      payout: '',
      currency: '',
      date: new Date(),
      where: '',
      status: ''
    },
    qty: 1
  }),
  validations: {
    dealForm: {
      title: { required },
      size: {},
      retail: { required },
      payout: {},
      currency: { required },
      where: {},
      status: { required }
    },
    qty: { required }
  },
  methods: {
    toggleAddModal() {
      this.$emit('toggle-modal')
    },
    addDeal(deal) {
      let retail_amount, payout_amount
      const { retail, payout } = deal
      if (!retail.includes(',') && !retail.includes('.')) {
        retail_amount = parseInt(retail) * 100
      } else {
        retail_amount = retail
          .toString()
          .replace(',', '')
          .replace('.', '')
      }
      if (!payout.includes(',') && !payout.includes('.')) {
        payout_amount = parseInt(payout) * 100
      } else {
        payout_amount = payout
          .toString()
          .replace(',', '')
          .replace('.', '')
      }
      const payload = {
        ...deal,
        uid: this.uid,
        retail: retail_amount,
        payout: payout_amount
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.qty > 1) {
          for (let i = 0; i < this.qty; i++) {
            this.$emit('add-deal', payload)
            return
          }
        }
        this.$emit('add-deal', payload)
      }
    }
  },
  mounted() {
    document.body.classList.add('disable-scroll')
  },
  destroyed() {
    document.body.classList.remove('disable-scroll')
  }
}
</script>

<style lang="scss" scoped></style>
