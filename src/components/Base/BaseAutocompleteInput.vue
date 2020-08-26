<template>
  <div>
    <label v-if="label" class="block text-white text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border border-gray-800 rounded w-full py-2 px-3 text-gray-500 bg-gray-700 leading-tight focus:outline-none"
      :value="value"
      :class="{
        'border-red-500': errorClass
      }"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
    <div class="relative -mt-1" v-if="open">
      <div
        class="absolute bg-gray-800 my-2 border border-gray-800 rounded max-h-64 overflow-auto z-10 right-0 left-0 over"
      >
        <div
          v-for="(item, $index) in results"
          :key="$index"
          @click="handleClick(item.name)"
          class="rounded hover:bg-gray-700"
        >
          <div class="flex">
            <div class="w-16 rounded">
              <img
                v-if="item.thumbnail_url.length === 0"
                src="http://placekitten.com/300/214"
                alt=""
                class="object-contain m-auto h-16 w-full"
              />
              <img
                v-else
                :src="item.thumbnail_url"
                :alt="item.name"
                class="object-contain m-auto h-16 w-full"
              />
            </div>
            <div class="ml-1 p-1">
              <div class="text-white text-lg font-semibold">
                {{ item.name }}
              </div>
              <div class="text-white text-sm">
                <span class="font-bold">ID: </span
                >{{ item.style_id ? item.style_id : '#' }}
                <span class="font-bold">Last sale: </span>
                {{ item.last_sale }}$
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'
import axios from 'axios'

export default {
  name: 'BaseAutocompleteInput',
  mixins: [formFieldMixin],
  props: {
    api_url: {
      type: String,
      required: true
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  data: () => ({
    results: [],
    open: false
  }),
  watch: {
    value() {
      if (
        this.value.length === 0 ||
        this.results.some(item => item.name === this.value)
      ) {
        this.results = []
        this.open = false
      } else {
        axios
          .post(this.api_url, {
            params: `query=${this.value}&facets=*&filters=`
          })
          .then(response => {
            let items = response.data.hits.splice(0, 10)
            this.results = items
            if (this.results.some(item => item.name === this.value)) return
            this.open = true
          })
      }
    }
  },
  methods: {
    handleClick(name) {
      this.$emit('input', name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
