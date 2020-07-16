<template>
  <div class="home mx-auto bg-gray-700 w-3/5 shadow-md rounded h-56">
    <div v-if="isLoggedIn" class="w-full max-w-xs">
      <h1 class="p-2 text-5xl font-bold" v-if="isLoggedIn">
        Witaj, {{ username }}!
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('user/getUserData')
  },
  computed: {
    ...mapState({
      userData: state => state.user.currentUserData
    }),
    ...mapGetters('user', ['isLoggedIn'])
  },
  watch: {
    userData() {
      this.username = this.userData.username
    }
  },
  data() {
    return {
      username: this.userData ? this.userData.username : ''
    }
  }
}
</script>

<style scoped></style>
