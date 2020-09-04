<template>
  <div
    class="fixed w-full bottom-0 z-20 md:px-4 md:pb-4 inset-0 flex items-center justify-center"
  >
    <div
      class="fixed w-full h-100 inset-0 overflow-hidden animated fadeIn faster"
      style="background: rgba(0,0,0,.8);"
      @click.prevent="toggleAddModal"
    ></div>
    <div
      class="flex items-center justify-center md:border border-gray-800 shadow-lg bg-gray-900 w-full md:w-3/4 xl:w-2/5 sm:mx-auto rounded z-50"
    >
      <div
        class="py-4 text-leftx px-2 overflow-y-auto overflow-x-hidden max-h-screen sm:h-auto"
      >
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl text-white font-bold">Add deal</p>
          <span
            class="text-gray-700 hover:text-gray-600"
            @click.prevent="toggleAddModal"
            ><icon name="x" class="w-6 h-6"
          /></span>
        </div>
        <div class="mt-2">
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full  px-3 mb-6 md:mb-0">
                <BaseAutocompleteInput
                  label="Title"
                  v-model="$v.dealForm.title.$model"
                  type="text"
                  :errorClass="$v.dealForm.title.$error"
                  @blur="$v.dealForm.title.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-3/4 px-3">
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
                  :options="['unknown', 'on hold', 'sold', 'in transit']"
                  :errorClass="$v.dealForm.status.$error"
                  @blur="$v.dealForm.status.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-5/12 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Retail"
                  v-model.number="$v.dealForm.retail.$model"
                  type="text"
                  :errorClass="$v.dealForm.retail.$error"
                  @blur="$v.dealForm.retail.$touch()"
                />
              </div>
              <div class="w-full md:w-5/12 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Payout"
                  v-model.number="$v.dealForm.payout.$model"
                  type="text"
                  :errorClass="$v.dealForm.payout.$error"
                  @blur="$v.dealForm.payout.$touch()"
                />
              </div>
              <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
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
                  :options="['PLN', 'EUR', 'USD', 'GBP']"
                  :errorClass="$v.dealForm.currency.$error"
                  @blur="$v.dealForm.currency.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-3/12 px-3 mb-6 md:mb-0">
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
              <div class="w-full md:w-2/12 px-3 mb-6 md:mb-0">
                <BaseInput
                  label="Qty."
                  v-model.number="$v.qty.$model"
                  :errorClass="$v.qty.$error"
                  @blur="$v.qty.$touch()"
                />
              </div>
              <div class="w-full md:w-7/12 px-3 mb-6 md:mb-0">
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
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              :class="{ 'cursor-not-allowed': $v.dealForm.$anyError }"
              :disabled="$v.dealForm.$anyError"
              @click="addDeal(dealForm)"
            >
              Add
            </button>
          </span>
          <span class="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-800 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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
      deal = { ...deal, uid: this.uid }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        if (this.qty > 1) {
          for (let i = 0; i < this.qty; i++) {
            this.$emit('add-deal', deal)
          }
        } else this.$emit('add-deal', deal)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
