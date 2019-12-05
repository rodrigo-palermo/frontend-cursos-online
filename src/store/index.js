import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import categorias from "./modules/categorias";
import cursos from "./modules/cursos";
import perfils from "./modules/perfils";
import usuarios from "./modules/usuarios";
import turmas from "./modules/turmas";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        categorias, cursos, perfils, usuarios, turmas
    },

    state: {
        //vuex state would hold our authentication status, jwt token and user information.
        status: '',
        token: sessionStorage.getItem('token') || '',
        user: {},
        perfil: sessionStorage.getItem('perfil') || '',
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
            state.perfil = payload.perfil
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.staus = ''
            state.token = ''
            state.perfil = ''
        }
    },

    actions: {
        //vuex actions are used to commit mutations to the vuex store.
        //async
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

                        sessionStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        sessionStorage.setItem('perfil', perfil)
                        let payload = {
                            "token": token,
                            "username": username,
                            "perfil": perfil
                        }
                        commit('auth_success', payload)
                        window.console.log('url post: ', auth_url)
                        window.console.log('Usuario fazendo login e enviado para ws: ', user)
                        window.console.log('Resposta do WS: ', resp)
                        window.console.log('Usuario: ', username)
                        window.console.log('Usuario id: ', usuario_id)
                        window.console.log('Perfil: ', perfil)
                        window.console.log('Token: ', token)
                        resolve(resp)

                    })
                    .catch(err => {
                        commit('auth_error')
                        sessionStorage.removeItem('token')
                        sessionStorage.removeItem('perfil')
                        reject(err)
                    })
            })
        },

        logout({commit}){
            return new Promise((resolve) => {
                commit('logout')
                window.console.log('Limpando sessionStorage')
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('perfil')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },

    },

    getters: {
        //use getter to get the value of the attributes of vuex state (like computed properties for stores)
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isAdmin: state => state.perfil === 'Administrador',
        isProf: state => state.perfil === 'Professor',
        isAluno: state => state.perfil === 'Aluno'


    }
})
