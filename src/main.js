// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuefire from 'vuefire'
import App from './App'
import router from './router'
import firebase from './service/firebase'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)
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
    knowledge: firebase.database.ref('resources/knowledge'),
    products: firebase.database.ref('resources/products'),
    services: firebase.database.ref('resources/services')
  },
  router,
  template: '<App/>',
  components: { App }
})
