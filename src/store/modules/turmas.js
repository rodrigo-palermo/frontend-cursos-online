import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    turmasDoCurso: []
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

    getAllTurmasDoCurso ({ commit }, id) {
        cursosonline.getTurmasDoCurso( id, turmas => {
            commit('setTurmasDoCurso', turmas)
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

        );
        dispatch('getAllTurmasDoCurso', item.id_curso)

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



};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};