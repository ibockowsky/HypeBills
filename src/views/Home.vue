<template>
  <div class="home mx-auto bg-gray-900 w-11/12 md:w-3/5 shadow-md rounded h-56">
    <div v-if="isLoggedIn" class="w-full max-w-xs">
      <h1 class="p-2 text-5xl text-gray-200 font-bold" v-if="isLoggedIn">
        Witaj, {{ userData.username }}!
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',

  created() {
    if (this.isLoggedIn) {
      this.getUserData(this.getUserId)
    }
  },
  computed: {
    ...mapState({
      userData: state => state.user.currentUserData
    }),
    ...mapGetters('user', ['isLoggedIn', 'getUserId'])
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData'
    })
  }
}
</script>

<style scoped></style>
