<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <div class="fixed inset-0 transition-opacity">
      <div
        class="absolute inset-0 bg-black opacity-75"
        @click.prevent="toggleModal"
      ></div>
    </div>

    <div
      class="rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="relative h-16 border-b border-gray-800">
              <span class="absolute bottom-0 text-xl text-white">
                Add deal
              </span>
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
                  <div class="w-full md:w-1/2 px-3">
                    <BaseInput
                      label="Size"
                      v-model="$v.dealForm.size.$model"
                      type="text"
                      :errorClass="$v.dealForm.size.$error"
                      @blur="$v.dealForm.size.$touch()"
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
                    <BaseInput
                      label="Currency"
                      v-model="$v.dealForm.currency.$model"
                      type="text"
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
                  <div class="w-full md:w-1/2 px-3">
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
          </div>
        </div>
      </div>
      <div class="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="addDeal(dealForm)"
          >
            Add
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-800 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            @click="toggleModal"
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, strongPassword } from 'vuelidate/lib/validators'

export default {
  name: 'AddDealModal',

  data() {
    return {
      dealForm: {
        title: '',
        size: '',
        retail: '',
        payout: '',
        currency: '',
        date: new Date(),
        where: ''
      }
    }
  },
  validations: {
    dealForm: {
      title: { required },
      size: {},
      retail: { required },
      payout: {},
      currency: { required },
      where: {}
    }
  },
  methods: {
    toggleModal() {
      this.$emit('toggle-modal')
    },
    addDeal(deal) {
      this.$emit('add-deal', deal)
    }
  }
}
</script>

<style lang="scss" scoped></style>
