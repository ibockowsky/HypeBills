<template>
  <div
    class="fixed w-full bottom-0 z-20 px-4 pb-4 inset-0 flex items-center justify-center"
  >
    <div
      class="fixed w-full h-100 inset-0 overflow-hidden animated fadeIn faster"
      style="background: rgba(0,0,0,.8);"
      @click.prevent="toggleEditModal"
    ></div>
    <div
      class="flex items-center justify-center border border-gray-800 shadow-lg modal-container bg-gray-900 sm:w-10/12 xl:w-1/3 mx-auto rounded z-50"
    >
      <div
        class="py-4 text-left px-2 overflow-y-auto overflow-x-hidden max-h-screen sm:h-auto"
      >
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl text-white font-bold">Add deal</p>
        </div>
        <div class="mt-2">
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Title"
                  v-model="$v.dealForm.title.$model"
                  type="text"
                  :errorClass="$v.dealForm.title.$error"
                  @blur="$v.dealForm.title.$touch()"
                />
              </div>
              <div class="w-full md:w-1/4 px-3">
                <BaseInput
                  label="Size"
                  v-model="$v.dealForm.size.$model"
                  type="text"
                  :errorClass="$v.dealForm.size.$error"
                  @blur="$v.dealForm.size.$touch()"
                />
              </div>
              <div class="w-full md:w-1/4 px-3">
                <BaseSelect
                  label="Status"
                  v-model="$v.dealForm.status.$model"
                  :options="status_options"
                  :errorClass="$v.dealForm.status.$error"
                  @blur="$v.dealForm.status.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Retail"
                  v-model="$v.dealForm.retail.$model"
                  type="text"
                  :errorClass="$v.dealForm.retail.$error"
                  @blur="$v.dealForm.retail.$touch()"
                />
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Payout"
                  v-model="$v.dealForm.payout.$model"
                  type="text"
                  :errorClass="$v.dealForm.payout.$error"
                  @blur="$v.dealForm.payout.$touch()"
                />
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <!-- <BaseInput
                      label="Currency"
                      v-model="$v.dealForm.currency.$model"
                      type="text"
                      :errorClass="$v.dealForm.currency.$error"
                      @blur="$v.dealForm.currency.$touch()"
                    /> -->
                <BaseSelect
                  label="Currency"
                  v-model="$v.dealForm.currency.$model"
                  :options="currency_options"
                  :errorClass="$v.dealForm.currency.$error"
                  @blur="$v.dealForm.currency.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-yellow-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              :class="{ 'cursor-not-allowed': $v.dealForm.$anyError }"
              :disabled="$v.dealForm.$anyError"
              @click="editDeal(dealForm)"
            >
              Edit
            </button>
          </span>
          <span class="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-800 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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
import { mapGetters } from 'vuex'

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
      getDeal: 'deals/getDeal'
    }),
    deal() {
      return this.getDeal(this.dealID)
    }
  },
  data() {
    return {
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
      status_options: ['unknown', 'on hold', 'sold', 'in transit'],
      currency_options: ['PLN', 'EUR', 'USD', 'GBP']
    }
  },
  mounted() {
    this.dealForm.title = this.deal.title
    this.dealForm.size = this.deal.size
    this.dealForm.retail = this.deal.retail
    this.dealForm.payout = this.deal.payout
    this.dealForm.currency = this.deal.currency
    this.dealForm.date = this.deal.date
    this.dealForm.where = this.deal.where
    this.dealForm.status = this.deal.status
  },
  validations: {
    dealForm: {
      title: { required },
      size: {},
      retail: { required },
      payout: {},
      currency: { required },
      where: {},
      status: { required }
    }
  },
  methods: {
    toggleEditModal() {
      this.$router.go(-1)
    },
    editDeal(deal) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        deal.id = this.dealID
        this.$store.dispatch('deals/editDeal', [this.dealID, deal]).then(() => {
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>