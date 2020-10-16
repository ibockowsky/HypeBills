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
          <form class="w-full max-w-lg" @keyup.enter="addDeal(dealForm)">
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full px-3 mb-3">
                <BaseAutocompleteInput
                  label="Title"
                  type="text"
                  v-model="$v.dealForm.title.$model"
                  :errorClass="$v.dealForm.title.$error"
                  :errorContent="errorInputMessages.empty"
                  @blur="$v.dealForm.title.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-3/4 px-3 mb-3">
                <BaseInput
                  label="Size"
                  type="text"
                  v-model="$v.dealForm.size.$model"
                  @blur="$v.dealForm.size.$touch()"
                />
              </div>
              <div class="w-full md:w-1/4 px-3 mb-3">
                <BaseSelect
                  label="Status"
                  v-model="$v.dealForm.status.$model"
                  :options="globals.dealStatuses"
                  @blur="$v.dealForm.status.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-5/12 px-3 mb-3">
                <BaseInput
                  label="Retail"
                  type="text"
                  v-model="$v.dealForm.retail.$model"
                  :errorClass="$v.dealForm.retail.$error"
                  :errorContent="errorInputMessages.notNumber"
                  @blur="$v.dealForm.retail.$touch()"
                />
              </div>
              <div class="w-full md:w-5/12 px-3 mb-3">
                <BaseInput
                  label="Payout"
                  type="text"
                  v-model="$v.dealForm.payout.$model"
                  :errorClass="$v.dealForm.payout.$error"
                  :errorContent="errorInputMessages.notNumber"
                  @blur="$v.dealForm.payout.$touch()"
                />
              </div>
              <div class="w-full md:w-1/6 px-3 mb-3">
                <BaseSelect
                  label="Currency"
                  v-model="$v.dealForm.currency.$model"
                  :options="globals.dealCurrencies"
                  @blur="$v.dealForm.currency.$touch()"
                />
              </div>
            </div>
            <div class="flex flex-wrap md:mb-3">
              <div class="w-full md:w-4/12 px-3 mb-3">
                <BaseDatePicker
                  label="Date"
                  v-model="$v.dealForm.date.$model"
                />
              </div>
              <div class="w-full md:w-2/12 px-3 mb-3">
                <BaseInput
                  label="Qty."
                  v-model.number="$v.qty.$model"
                  :errorClass="$v.qty.$error"
                  :errorContent="errorInputMessages.notInteger"
                  @blur="$v.qty.$touch()"
                />
              </div>
              <div class="w-full md:w-6/12 px-3 mb-3">
                <BaseInput
                  label="Where"
                  type="text"
                  v-model="$v.dealForm.where.$model"
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
            <BaseFormButton
              class="bg-green-600 hover:bg-green-800"
              :isAnyError="$v.dealForm.$anyError"
              @click="addDeal(dealForm)"
            >
              Add
            </BaseFormButton>
          </span>
          <span class="shadow-sm my-1 md:my-0 md:mx-1">
            <BaseFormButton
              class="bg-gray-700 hover:bg-gray-800"
              @click="toggleAddModal"
            >
              Cancel
            </BaseFormButton>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { parseToAmount } from '@/helpers/calcHelpers.js'
import {
  dealFormValidate,
  isInteger,
  errorInputMessages
} from '@/helpers/vuelidateHelpers.js'
import * as globals from '@/helpers/globalConsts.js'

export default {
  name: 'AddDealModal',
  computed: {
    ...mapGetters({
      uid: 'user/getUserId'
    }),
    globals() {
      return globals
    },
    errorInputMessages() {
      return errorInputMessages
    }
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
      ...dealFormValidate
    },
    qty: { required, isInteger }
  },
  methods: {
    toggleAddModal() {
      this.$emit('toggle-modal')
    },
    addDeal(deal) {
      const payload = {
        ...deal,
        uid: this.uid
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.qty > 1)
          this.$emit('add-deals', { deal: payload, qty: this.qty })
        else this.$emit('add-deal', payload)
      }
    }
  },
  mounted() {
    // this.$fixBody.fixBody()
    // document.body.classList.add('disable-scroll')
    document.body.classList.add('not-scrollable')
  },
  destroyed() {
    // this.$fixBody.unfixBody()
    // document.body.classList.remove('disable-scroll')
    document.body.classList.remove('not-scrollable')
  }
}
</script>

<style lang="scss" scoped></style>
