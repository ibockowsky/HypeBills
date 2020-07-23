import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import VIcon from 'vue-tailwind-icons'
import VCalendar from 'v-calendar'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import '@/assets/css/tailwind.css'
import '@/assets/css/style.scss'
const fb = require('@/services/firebase.js')

Vue.config.productionTip = false

Vue.use(VIcon)
Vue.use(Vuelidate)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
const requireComponent = require.context(
  './components/Base',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

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
