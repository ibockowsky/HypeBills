<template>
  <div id="app" class="relative w-screen">
    <Navbar />
    <div class="mx-auto w-full">
      <Summary v-if="isLoggedIn" />
      <router-view />
    </div>
    <div v-if="alerts.length > 0" class="fixed md:right-0 bottom-0">
      <Alert v-for="alert in alerts" :key="alert.id" :alert="alert" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

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
      this.getCurrencies()
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      alerts: state => state.alerts.alerts
    })
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      getCurrencies: 'user/getCurrencies',
      getDeals: 'deals/getDeals',
      getBills: 'bills/getBills'
    })
  }
}
</script>

<style lang="scss"></style>
