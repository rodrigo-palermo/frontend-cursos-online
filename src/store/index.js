import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    //AUTH
    // AUTH_REQUEST: 'AUTH_REQUEST',
    // AUTH_SUCCESS: 'AUTH_SUCCESS',
    // AUTH_ERROR: 'AUTH_ERROR',
    // AUTH_LOGOUT: 'AUTH_LOGOUT',
    //
    // //USER
    // USER_REQUEST: 'USER_REQUEST',
    // USER_SUCCESS: 'USER_SUCCESS',
    // USER_ERROR: 'USER_ERROR',

    logout({commit}){
      return new Promise((resolve/*, reject*/) => {
        commit('logout')
        localStorage.removeItem('token')
        delete this.$axios.defaults.headers.common['Authorization']
        resolve()
      })
    }

  },
  modules: {
  }
})
