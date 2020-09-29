<template>
  <div
    class="absolute inset-0 m-auto flex justify-center items-center overflow-y-hidden"
  >
    <div
      class="fixed w-full min-h-screen z-40 inset-0 bg-black opacity-50"
      @click.prevent="toggleEditModal"
    ></div>
    <div
      class="fixed flex items-center justify-center md:border border-gray-800 shadow-lg bg-gray-900 w-full md:w-3/4 xl:w-2/5 sm:mx-auto rounded z-50"
    >
      <div class="py-4 text-left px-2 overflow-hidden min-h-screen md:min-h-0">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl text-white font-bold">Edit deal</p>
          <span
            class="text-gray-700 hover:text-gray-600"
            @click.prevent="toggleEditModal"
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
                  v-model="dealForm.status"
                  :options="['unknown', 'on hold', 'sold', 'in transit']"
                  :errorClass="dealForm.status"
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
                  v-model="dealForm.currency"
                  :options="['PLN', 'EUR', 'USD', 'GBP']"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-1/3 px-3 mb-3">
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
              <div class="w-full md:w-2/3 px-3 mb-3">
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
          class="flex flex-col md:flex-row-reverse text-right mt-6 md:-mt-10"
        >
          <span class="shadow-sm my-1 md:my-0 md:mx-1">
            <button
              type="button"
              class="w-full md:w-auto text-white bg-yellow-600 hover:bg-yellow-900 py-2 px-5 rounded"
              :class="{ 'cursor-not-allowed': $v.dealForm.$anyError }"
              :disabled="$v.dealForm.$anyError"
              @click="edit"
            >
              Edit
            </button>
          </span>
          <span class="shadow-sm my-1 md:my-0 md:mx-1">
            <button
              type="button"
              class="w-full md:w-auto text-white bg-gray-700 hover:bg-gray-800 py-2 px-5 rounded"
              @click="toggleEditModal"
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
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import { D_GET_DEAL, D_UPDATE_DEAL } from '@/store/mutation-types.js'
export default {
  name: 'EditDealModal',
  props: {
    dealID: {
      type: String,
      required
    }
  },
  computed: {
    ...mapGetters({
      getDeal: D_GET_DEAL
    }),
    deal() {
      return this.getDeal(this.dealID)
    }
  },
  data: () => ({ dealForm: null }),
  created() {
    const dealDate =
      this.deal.date instanceof Date ? this.deal.date : this.deal.date.toDate()
    this.dealForm = { ...this.deal, date: dealDate }
  },
  validations: {
    dealForm: {
      title: { required },
      size: {},
      retail: { required },
      payout: {},
      where: {}
    }
  },
  methods: {
    ...mapActions({
      updateDeal: D_UPDATE_DEAL
    }),
    toggleEditModal() {
      this.$router.go(-1)
    },
    edit() {
      let retail_amount, payout_amount
      const { retail, payout } = this.dealForm
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
        ...this.dealForm,
        retail: retail_amount,
        payout: payout_amount,
        id: this.dealID
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.updateDeal(payload).then(() => {
          this.$router.go(-1)
        })
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
