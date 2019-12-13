import cursosonline from "../../api/cursosonline";

// initial state
const state = () => ({
    all: [],
    turmasTemUsuariosDoCurso: [],
    alunosDaTurma: [],
    alunosHabilitadosParaTurma: []
});

// getters
const getters = {
    getTurmasTemUsuarios: state => {
        return state.all
    },

    // getTurmasTemUsuariosDoCurso: state => {
    //     return state.turmasTemUsuariosDoCurso
    // }
};

// actions
const actions = {
    getAllTurmasTemUsuarios ({ commit }) {
        cursosonline.getTurmasTemUsuarios( turmasTemUsuarios => {
            commit('setTurmasTemUsuarios', turmasTemUsuarios)
        })
    },

    // getAllTurmasTemUsuariosDoCurso ({ commit }, id) {
    //     cursosonline.getTurmasTemUsuariosDoCurso( id, turmasTemUsuarios => {
    //         commit('setTurmasTemUsuariosDoCurso', turmasTemUsuarios)
    //     })
    // },

    getAllAlunosDaTurma ({ commit }, id) {
        cursosonline.getAlunosDaTurma( id, turmasTemUsuarios => {
            commit('setAlunosDaTurma', turmasTemUsuarios)
        })
    },

    getAllAlunosHabilitadosParaTurma ({ commit }, id) {
        cursosonline.getAlunosHabilitadosParaTurma( id, turmasTemUsuarios => {
            commit('setAlunosHabilitadosParaTurma', turmasTemUsuarios)
        })
    },

    submitTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.postTurmaTemUsuario( item,
            () => {
            dispatch('getAllTurmasTemUsuarios');
            dispatch('getAllAlunosDaTurma',item.id_turma);
            dispatch('getAllAlunosHabilitadosParaTurma',item.id_turma)
        }
        )
    },

    updateTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.putTurmaTemUsuario( item,
            () => dispatch('getAllTurmasTemUsuarios')
        )
    },

    deleteTurmaTemUsuario ({ dispatch }, item) {
        cursosonline.delTurmaTemUsuario( item,
            () => {
                dispatch('getAllTurmasTemUsuarios');
                dispatch('getAllAlunosDaTurma',item.id_turma);
                dispatch('getAllAlunosHabilitadosParaTurma',item.id_turma)
            }
        )
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

    setAlunosDaTurma (state, alunosMatriculados) {
        state.alunosDaTurma = alunosMatriculados;
    },

    setAlunosHabilitadosParaTurma (state, alunosHabilitados) {
        state.alunosHabilitadosParaTurma = alunosHabilitados;
    },



};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};