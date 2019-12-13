import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    professores: [],
    alunos: []
});

// getters
const getters = {
    getUsuarios: state => {
        return state.all
    },

    // getProfessores: state => {
    //     return state.professores
    // }
};

// actions
const actions = {
    getAllUsuarios ({ commit }) {
        cursosonline.getUsuarios( usuarios => {
            commit('setUsuarios', usuarios)
        })
    },

    getAllProfessores ({ commit }, perfil) {
        cursosonline.getUsuariosPorPerfil( perfil,usuarios => {
            commit('setProfessores', usuarios)
        })
    },
    getAllAlunos ({ commit }, perfil) {
        cursosonline.getUsuariosPorPerfil( perfil,usuarios => {
            commit('setAlunos', usuarios)
        })
    },

    submitUsuario ({ dispatch }, item) {
        cursosonline.postUsuario( item,
            () => dispatch('getAllUsuarios')
        )
    },

    updateUsuario ({ dispatch }, item) {
        cursosonline.putUsuario( item,
            () => dispatch('getAllUsuarios')
        )
    },

    deleteUsuario ({ dispatch }, item) {
        cursosonline.delUsuario( item,
            () => dispatch('getAllUsuarios')
        )
    },

};

// mutations
const mutations = {
    setUsuarios (state, usuarios) {
        state.all = usuarios;
    },

    setProfessores (state, usuarios) {
        state.professores = usuarios;
    },

    setAlunos (state, usuarios) {
        state.alunos = usuarios;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};