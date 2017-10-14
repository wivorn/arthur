// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'red',
  accent: 'indigo',
  warn: 'orange',
  background: 'grey'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
