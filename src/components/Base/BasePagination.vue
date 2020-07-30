<template>
  <div
    v-if="pager.pages && pager.pages.length"
    class="px-4 py-3 flex items-center justify-between sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        @click="setPage(pager.currentPage - 1)"
        class="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-500 bg-gray-800 select-none hover:text-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        :class="{ 'cursor-not-allowed': pager.currentPage === 1 }"
      >
        Previous
      </a>
      <a
        @click="setPage(pager.currentPage + 1)"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-500 bg-gray-800 select-none hover:text-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        :class="{
          'cursor-not-allowed': pager.currentPage === pager.totalPages
        }"
      >
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div class="mx-auto">
        <nav class="relative z-0 inline-flex shadow-sm">
          <a
            @click="setPage(pager.currentPage - 1)"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            :class="{ 'cursor-not-allowed': pager.currentPage === 1 }"
            aria-label="Previous"
          >
            <icon name="cheveron-left" class="w-5 h-5"></icon>
          </a>
          <a
            v-for="page in pager.pages"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 select-none transition ease-in-out duration-150"
            :key="page"
            @click="setPage(page)"
          >
            {{ page }}
          </a>
          <a
            @click="setPage(pager.currentPage + 1)"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            :class="{
              'cursor-not-allowed': pager.currentPage === pager.totalPages
            }"
            aria-label="Next"
          >
            <icon name="cheveron-right" class="w-5 h-5"></icon>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import paginate from 'jw-paginate'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    initialPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    maxPages: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      pager: {}
    }
  },
  created() {
    if (!this.$listeners.changePage) {
      throw 'Missing required event listener: "changePage"'
    }

    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage)
    }
  },
  watch: {
    items() {
      console.log(this.pager.currentPage)
      this.setPage(this.pager.currentPage)
    }
  },
  methods: {
    setPage(page) {
      const { items, pageSize, maxPages } = this

      // get new pager object for specified page
      const pager = paginate(items.length, page, pageSize, maxPages)

      // get new page of items from items array
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

      // update pager
      this.pager = pager

      // emit change page event to parent component
      this.$emit('changePage', pageOfItems)
    }
  }
}
</script>

<style lang="scss" scoped></style>
