// Referencias:
// Handling Authentication In Vue Using Vuex https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

const token = sessionStorage.getItem('token');

if(token){
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
