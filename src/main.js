import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
// import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
