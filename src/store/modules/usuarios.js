import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getUsuarios: state => {
        return state.all
    }
};

// actions
const actions = {
    getAllUsuarios ({ commit }) {
        cursosonline.getUsuarios( usuarios => {
            commit('setUsuarios', usuarios)
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
        state.all = usuarios
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};