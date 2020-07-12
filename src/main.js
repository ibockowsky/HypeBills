import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VIcon from 'vue-tailwind-icons'
import '@/assets/css/tailwind.css'
import '@/assets/css/style.scss'
const fb = require('@/services/firebase.js')

Vue.config.productionTip = false

Vue.use(VIcon)

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
