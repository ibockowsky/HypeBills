<template>
  <div id="app">
    <Navbar />
    <div class="mx-auto w-full">
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
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/Alert.vue'

export default {
  components: {
    Navbar,
    Alert
  },
  computed: {
    ...mapGetters({
      alerts: 'alerts/getAlerts'
    })
  },
  methods: {
    removeAlert(alert) {
      this.$store.dispatch('alerts/removeAlert', alert)
    }
  }
}
</script>

<style></style>
