<template>
  <div class="mx-auto m-2 bg-gray-900 w-11/12 shadow-md rounded h-56">
    <div v-if="isLoggedIn" class="w-full max-w-xs">
      <h1
        class="p-2 text-5xl text-gray-200 font-bold"
        v-if="isLoggedIn && userData"
      >
        Witaj, {{ userData.username }}!
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { U_IS_LOGGED_IN, U_GET_USER_ID } from '@/store/mutation-types.js'

export default {
  name: 'Home',

  computed: {
    ...mapState({
      userData: state => state.user.currentUserData
    }),
    ...mapGetters({
      isLoggedIn: U_IS_LOGGED_IN,
      getUserId: U_GET_USER_ID
    })
  }
}
</script>

<style scoped></style>
