import axios from 'axios'
const url = `${process.env.VUE_APP_API_URL}`;

export default {
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
        this.showed = this.saveUpdateErrored === false;
    }
}
