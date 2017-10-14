// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuefire from 'vuefire'
import App from './App'
import router from './router'
import firebase from './service/firebase'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Vuefire)
Vue.material.registerTheme('default', {
  primary: 'red',
  accent: 'indigo',
  warn: 'orange',
  background: 'grey'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    knowledge: firebase.database.ref('resources/knowledge').orderByChild('created_at'),
    products: firebase.database.ref('resources/products').orderByChild('created_at'),
    services: firebase.database.ref('resources/services').orderByChild('created_at')
  },
  router,
  template: '<App/>',
  components: { App }
})
