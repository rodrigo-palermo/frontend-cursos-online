import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getTurmas: state => {
        return state.all
    }
};

// actions
const actions = {
    getAllTurmas ({ commit }) {
        cursosonline.getTurmas( turmas => {
            commit('setTurmas', turmas)
        })
    },

    submitTurma ({ dispatch }, item) {
        cursosonline.postTurma( item,
            () => dispatch('getAllTurmas')
        )
    },

    updateTurma ({ dispatch }, item) {
        cursosonline.putTurma( item,
            () => dispatch('getAllTurmas')
        )
    },

    deleteTurma ({ dispatch }, item) {
        cursosonline.delTurma( item,
            () => dispatch('getAllTurmas')
        )
    },

};

// mutations
const mutations = {
    setTurmas (state, turmas) {
        state.all = turmas
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};