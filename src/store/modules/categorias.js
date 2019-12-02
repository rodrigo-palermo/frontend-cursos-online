import cursosonline from "../../api/cursosonline";

// initial state
const state = {
    all: []
};

// getters
const getters = {}

// actions
const actions = {
    getAllCategorias ({ commit }) {
        cursosonline.getCategorias( categorias => {
            commit('setCategorias', categorias)
        })
    }
};

// mutations
const mutations = {
    setCategorias (state, categorias) {
        state.all = categorias
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};