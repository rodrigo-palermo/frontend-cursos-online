import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    cursosDoProfessor: [],
    currentCursoId: null
});

// getters
const getters = {
    getCursos: state => {
        return state.all
    },

    getCursosDoProfessor: state => {
        return state.cursosDoProfessor
    },
};

// actions
const actions = {
    getAllCursos ({ commit }) {
        cursosonline.getCursos( cursos => {
            commit('setCursos', cursos)
        })
    },

    getAllCursosDoProfessor ({ commit }, id) {
        cursosonline.getCursosDoProfessor( id, cursos => {
            commit('setCursosDoProfessor', cursos)
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
        state.all = cursos;
    },

    setCursosDoProfessor (state, cursos) {
        state.cursosDoProfessor = cursos;
    },

    setCurrentCursoId (state, id) {
        state.currentCursoId = id;
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};