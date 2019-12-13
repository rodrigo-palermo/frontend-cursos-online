import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import categorias from "./modules/categorias";
import cursos from "./modules/cursos";
import perfils from "./modules/perfils";
import usuarios from "./modules/usuarios";
import turmas from "./modules/turmas";
import turmastemusuarios from "./modules/turmastemusuarios";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        categorias, cursos, perfils, usuarios, turmas, turmastemusuarios
    },

    state: {
        //vuex state would hold our authentication status, jwt token and user information.
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        perfil: localStorage.getItem('perfil') || '',
        userId: localStorage.getItem('userId') || '',
        env_app: process.env.VUE_APP_ENV_SUBTITLE
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
            state.userId = payload.userId
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.staus = ''
            state.token = ''
            state.perfil = ''
            state.userId = ''
        },
        register_request(state) {
            state.status = 'loading'
        },
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
                        const userId = resp.data.id
                        const username = resp.data.nome
                        const perfil = resp.data.perfil

                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        localStorage.setItem('perfil', perfil)
                        localStorage.setItem('userId', userId)
                        let payload = {
                            "token": token,
                            "username": username,
                            "perfil": perfil,
                            "userId": userId
                        }
                        commit('auth_success', payload)
                        window.console.log('url post: ', auth_url)
                        window.console.log('Usuario fazendo login e enviado para ws: ', user)
                        window.console.log('Resposta do WS: ', resp)
                        window.console.log('Usuario: ', username)
                        window.console.log('Usuario id: ', userId)
                        window.console.log('Perfil: ', perfil)
                        window.console.log('Token: ', token)
                        resolve(resp)

                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        localStorage.removeItem('perfil')
                        localStorage.removeItem('userId')
                        reject(err)
                    })
            })
        },

        logout({commit}){
            return new Promise((resolve) => {
                commit('logout')
                window.console.log('Limpando localStorage')
                localStorage.removeItem('token')
                localStorage.removeItem('perfil')
                localStorage.removeItem('userId')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },

        register({ commit }, user){
            const register_url = `${process.env.VUE_APP_API_URL}/register`;
            return new Promise((resolve, reject) => {
                commit('register_request')
                // axios({url: auth_url, data: user, method:'POST'})
                axios.post(register_url,user)
                    .then(resp => {

                        window.console.log('Usuario registrado', user);

                        resolve(resp)

                    })
                    .catch(err => {
                        // commit('register_error')
                        window.console.log('Erro ao registrar', user);
                        reject(err)
                    })
            })
        },

    },

    getters: {
        //use getter to get the value of the attributes of vuex state (like computed properties for stores)
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isAdmin: state => state.perfil === 'Administrador',
        isProf: state => state.perfil === 'Professor',
        isAluno: state => state.perfil === 'Aluno',
        userId: state => state.userId,
        isDesenv: state => state.env_app === 'Desenvolvimento',

    }
})
