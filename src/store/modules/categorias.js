import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getCategorias: state => {
        return state.all
    }
};

// actions
const actions = {
    getAllCategorias ({ commit }) {
        cursosonline.getCategorias( categorias => {
            commit('setCategorias', categorias)
        })
    },

    submitCategoria ({ dispatch }, item) {
        cursosonline.postCategoria( item,
            () => dispatch('getAllCategorias')
        )
    },

    updateCategoria ({ dispatch }, item) {
        cursosonline.putCategoria( item,
            () => dispatch('getAllCategorias')
        )
    },

    deleteCategoria ({ dispatch }, item) {
        cursosonline.delCategoria( item,
            () => dispatch('getAllCategorias')
        )
    },

};

// mutations
const mutations = {
    setCategorias (state, categorias) {
        state.all = categorias
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};