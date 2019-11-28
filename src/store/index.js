import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //vuex state would hold our authentication status, jwt token and user information.
    status: '',
    token: localStorage.getItem('token') || '',
    // gravar tb em localStorage (para usar na sessao)
    user: {},
    admin: false,
    prof: false,
    aluno: false
  },
  mutations: {
    //vuex mutations make changes to vuex store
    //sync
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.username
      state.admin = payload.admin
      state.prof = payload.prof
      state.aluno = payload.aluno
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.staus = ''
      state.token = ''
      state.admin = false
      state.prof = false
      state.aluno = false
    }
  },
  actions: {
    //vuex actions are used to commit mutations to the vuex store.
    //assync
    login({ commit }, user){
      const auth_url = `${process.env.VUE_APP_API_URL}/auth`;
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // axios({url: auth_url, data: user, method:'POST'})
        axios.post(auth_url,user)
            .then(resp => {
              const token = resp.data.token
              const usuario_id = resp.data.id
              const username = resp.data.nome
              const perfil = resp.data.perfil
              let admin = false
              let prof = false
              let aluno = false
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              switch(perfil) {
                case 'Administrador':
                  admin = true;
                  break;
                case 'Professor':
                  prof = true;
                  break;
                case 'Aluno':
                  aluno = true;
                  break;
              }
              let payload = {
                "token": token,
                "username": username,
                "admin": admin,
                "prof": prof,
                "aluno": aluno
              }
              commit('auth_success', payload)
              window.console.log('url post: ', auth_url)
              window.console.log('Usuario fazendo login e enviado para ws: ', user)
              window.console.log('Resposta do WS: ', resp)
              window.console.log('Usuario: ', username)
              window.console.log('Usuario id: ', usuario_id)
              window.console.log('Perfil: ', perfil)
              window.console.log('Token: ', token)
              window.console.log('isAdmin: ',admin)
              window.console.log('isProf: ',prof)
              window.console.log('isAluno: ',aluno)
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
        window.console.log('Removendo token')
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
    isAdmin(state) {
      return state.admin
    },
    isProf: state => state.prof,
    isAluno: state => state.aluno
  }
})
