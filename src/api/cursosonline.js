import axios from 'axios'
const url = `${process.env.VUE_APP_API_URL}`;

export default {
    //CATEGORIAS
    getCategorias(callback){
        axios.get(url+'/categoria')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postCategoria(item, callback){
        axios.post(url+'/categoria', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putCategoria(item, callback){
        const id = item.id;
        axios.put(url+'/categoria/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delCategoria(id, callback){
        axios.delete(url+'/categoria/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },


    //CURSOS
    getCursos(callback){
        axios.get(url+'/cursosfree')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    getCursosDoProfessor(id, callback){
        axios.get(url+'/cursosdoprofessor/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postCurso(item, callback){
        axios.post(url+'/curso', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putCurso(item, callback){
        const id = item.id;
        axios.put(url+'/curso/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delCurso(id, callback){
        axios.delete(url+'/curso/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },


    //PERFILS
    getPerfils(callback){
        axios.get(url+'/perfil')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postPerfil(item, callback){
        axios.post(url+'/perfil', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putPerfil(item, callback){
        const id = item.id;
        axios.put(url+'/perfil/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delPerfil(id, callback){
        axios.delete(url+'/perfil/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },


    //USUARIOS
    getUsuarios(callback){
        axios.get(url+'/usuario')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    getUsuariosPorPerfil(perfil, callback){
        axios.get(url+'/usuariosporperfil/'+perfil)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postUsuario(item, callback){
        axios.post(url+'/usuario', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putUsuario(item, callback){
        const id = item.id;
        axios.put(url+'/usuario/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delUsuario(id, callback){
        axios.delete(url+'/usuario/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                if(error.response.status == 412)
                    window.alert('Erro ao excluir registro.'+
                                '\nMensagem do servidor: '+error.response.data);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },


    //TURMAS
    getTurmas(callback){
        axios.get(url+'/turma')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    getTurmasDoCurso(id, callback){
        axios.get(url+'/turmasdocurso/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postTurma(item, callback){
        axios.post(url+'/turma', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putTurma(item, callback){
        const id = item.id;
        axios.put(url+'/turma/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delTurma(id, callback){
        axios.delete(url+'/turma/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },


    //TURMA TEM USUARIOS
    getTurmasTemUsuarios(callback){
        axios.get(url+'/turmatemusuario')
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    postTurmaTemUsuario(item, callback){
        axios.post(url+'/turmatemusuario', item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    putTurmaTemUsuario(item, callback){
        const id = item.id;
        axios.put(url+'/turmatemusuario/'+id, item)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },

    delTurmaTemUsuario(id, callback){
        axios.delete(url+'/turmatemusuario/'+id)
            .then( response => callback(response.data))
            .catch(error => {
                window.console.log(error);
                // this.saveUpdateErrored = true;
            })
            .finally(() => this.loading = false,
                // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            );
        // this.showed = this.saveUpdateErrored === false;
    },
}
