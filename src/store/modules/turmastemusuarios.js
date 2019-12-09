import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    turmasTemUsuariosDoCurso: []
});

// getters
const getters = {
    getTurmasTemUsuarios: state => {
        return state.all
    },

    getTurmasTemUsuariosDoCurso: state => {
        return state.turmasTemUsuariosDoCurso
    }
};

// actions
const actions = {
    getAllTurmasTemUsuarios ({ commit }) {
        cursosonline.getTurmasTemUsuarios( turmasTemUsuarios => {
            commit('setTurmasTemUsuarios', turmasTemUsuarios)
        })
    },

    getAllTurmasTemUsuariosDoCurso ({ commit }, id) {
        cursosonline.getTurmasTemUsuariosDoCurso( id, turmasTemUsuarios => {
            commit('setTurmasTemUsuariosDoCurso', turmasTemUsuarios)
        })
    },

    submitTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.postTurmaTemUsuario( item,
            () => dispatch('getAllTurmasTemUsuarios')
        )
    },

    updateTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.putTurmaTemUsuario( item,
            () => dispatch('getAllTurmasTemUsuarios')
        )
    },

    deleteTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.delTurmaTemUsuario( item,
            () => dispatch('getAllTurmasTemUsuarios')

        );
        dispatch('getAllTurmasTemUsuariosDoCurso', item.id_curso)

    },

};

// mutations
const mutations = {
    setTurmasTemUsuarios (state, turmasTemUsuarios) {
        state.all = turmasTemUsuarios;
    },

    setTurmasTemUsuariosDoCurso (state, turmasTemUsuarios) {
        state.turmasTemUsuariosDoCurso = turmasTemUsuarios;
    },



};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};