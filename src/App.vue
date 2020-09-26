<template>
  <div id="app">
    <Navbar />
    <div class="mx-auto w-full">
      <Summary v-if="isLoggedIn" />
      <router-view />
    </div>
    <div v-if="alerts.length > 0" class="absolute md:right-0 bottom-0">
      <Alert v-for="alert in alerts" :key="alert.id" :alert="alert" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
  U_GET_USER_DATA,
  B_GET_BILLS,
  D_GET_DEALS,
  U_IS_LOGGED_IN
} from '@/store/mutation-types.js'

import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/Alert.vue'
import Summary from '@/components/Summary.vue'

export default {
  components: {
    Navbar,
    Alert,
    Summary
  },
  created() {
    if (this.isLoggedIn) {
      this.getUserData()
      this.getDeals()
      this.getBills()
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: U_IS_LOGGED_IN
    }),
    ...mapState({
      alerts: state => state.alerts.alerts
    })
  },
  methods: {
    ...mapActions({
      getUserData: U_GET_USER_DATA,
      getDeals: D_GET_DEALS,
      getBills: B_GET_BILLS
    })
  }
}
</script>

<style lang="scss"></style>
