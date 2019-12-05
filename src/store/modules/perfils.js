import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getPerfils: state => {
        return state.all
    }
};

// actions
const actions = {
    getAllPerfils ({ commit }) {
        cursosonline.getPerfils( perfils => {
            commit('setPerfils', perfils)
        })
    },

    submitPerfil ({ dispatch }, item) {
        cursosonline.postPerfil( item,
            () => dispatch('getAllPerfils')
        )
    },

    updatePerfil ({ dispatch }, item) {
        cursosonline.putPerfil( item,
            () => dispatch('getAllPerfils')
        )
    },

    deletePerfil ({ dispatch }, item) {
        cursosonline.delPerfil( item,
            () => dispatch('getAllPerfils')
        )
    },

};

// mutations
const mutations = {
    setPerfils (state, perfils) {
        state.all = perfils
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};