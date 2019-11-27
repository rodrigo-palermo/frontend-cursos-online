import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //vuex state would hold our authentication status, jwt token and user information.
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    //vuex mutations make changes to vuex store
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, username) {
      state.status = 'success'
      state.token = token
      state.user = username
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.staus = ''
      state.token = ''
    }
  },
  actions: {
    //vuex actions are used to commit mutations to the vuex store.

    login({commit}, user){
      const url = `${process.env.VUE_APP_API_URL}/auth`;
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: url, data: user, method:'POST'})
            .then(resp => {
              const token = resp.data.token
              const username = user.name
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, username)
                window.console.log('url post: ', url)
              window.console.log('Usuario fazendo login e enviado para ws: ', user)
              window.console.log('Resposta do WS: ', resp)
              window.console.log('ws token: ', token)
              window.console.log('ws usuario: ', user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },

    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }

  },
  modules: {
  },

  getters: {
    //use getter to get the value of the attributes of vuex state
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
