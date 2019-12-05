import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getCursos: state => {
        return state.all
    }
};

// actions
const actions = {
    getAllCursos ({ commit }) {
        cursosonline.getCursos( cursos => {
            commit('setCursos', cursos)
        })
    },

    submitCurso ({ dispatch }, item) {
        cursosonline.postCurso( item,
            () => dispatch('getAllCursos')
        )
    },

    updateCurso ({ dispatch }, item) {
        cursosonline.putCurso( item,
            () => dispatch('getAllCursos')
        )
    },

    deleteCurso ({ dispatch }, item) {
        cursosonline.delCurso( item,
            () => dispatch('getAllCursos')
        )
    },

};

// mutations
const mutations = {
    setCursos (state, cursos) {
        state.all = cursos
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};