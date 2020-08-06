<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-900 mb-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white focus:outline-none"
          to="/"
        >
          HypeBills
        </router-link>
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <icon name="dots-vertical" class="w-6 h-6" />
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 focus:outline-none"
              to="/login"
            >
              <span class="ml-2">Login</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 focus:outline-none"
              to="/register"
            >
              <span class="ml-2">Register</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 focus:outline-none"
              to="/deals"
            >
              <span class="ml-2">Deals</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <span
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-default"
              @click="logout"
            >
              <span class="ml-2">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  computed: { ...mapGetters('user', ['isLoggedIn']) },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu
    },
    logout() {
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>

<style scoped></style>
