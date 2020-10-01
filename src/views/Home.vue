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

export default {
  name: 'Home',

  computed: {
    ...mapState({
      userData: state => state.user.currentUserData
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getUserId: 'user/isLoggedIn'
    })
  }
}
</script>

<style scoped></style>
