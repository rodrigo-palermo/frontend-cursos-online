import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    turmasDoCurso: [],
    currentTurmaId: null,
});

// getters
const getters = {
    getTurmas: state => {
        return state.all
    },

    getTurmasDoCurso: state => {
        return state.turmasDoCurso
    }
};

// actions
const actions = {
    getAllTurmas ({ commit }) {
        cursosonline.getTurmas( turmas => {
            commit('setTurmas', turmas)
        })
    },

    getAllTurmasDoCurso ({ commit }, id_curso) {
        cursosonline.getTurmasDoCurso( id_curso, turmas =>
            commit('setTurmasDoCurso', turmas)
        );
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

    deleteTurma ({ dispatch }, id) {
        cursosonline.delTurma( id,
            () => dispatch('getAllTurmas')
        )
    },

    deleteTurmaDoCurso ({ dispatch }, {id_turma, id_curso}) {
        cursosonline.delTurma( id_turma,
            () => dispatch('getAllTurmasDoCurso', id_curso)
        )
    },

};

// mutations
const mutations = {
    setTurmas (state, turmas) {
        state.all = turmas;
    },

    setTurmasDoCurso (state, turmas) {
        state.turmasDoCurso = turmas;
    },

    setCurrentTurmaId (state, id) {
        state.currentTurmaId = id;
    }



};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};