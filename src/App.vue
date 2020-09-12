<template>
  <div id="app">
    <Navbar />
    <div class="mx-auto w-full">
      <Summary v-if="isLoggedIn" />
      <router-view />
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div v-if="alerts.length > 0" class="absolute md:right-0 bottom-0">
      <Alert
        v-for="alert in alerts"
        :key="alert.id"
        :alert="alert"
        @expired="removeAlert(alert)"
      />
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
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapState({
      alerts: state => state.alerts.alerts
    })
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      getDeals: 'deals/getDeals',
      getBills: 'bills/getBills',
      removeAlert: 'alerts/removeAlert'
    })
  }
}
</script>

<style></style>
