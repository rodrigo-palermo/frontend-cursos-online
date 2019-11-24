// //https://www.techiediaries.com/vue-axios-tutorial/
// import axios from 'axios';
// const API_URL = 'http://localhost/wscursosonline';
//
// export class APIService {
//
//     constructor(){ this.lista = [] }
//
//     data() {
//         return {
//             loading: true,
//             errored: false,
//             //lista: []
//         }
//     }
//
//     set _lista(lista) {
//         this.lista = lista;
//     }
//
//     getData() {
//         const url = `${API_URL}/categoria`;
//         return axios.get(url);
//     }
//
//     getData2() {
//         this.getData().then(response => {
//             // this.lista = response.data;
//             window.console.log('Response',response)
//             return response.data;
//
//         })
//             .catch(error => {
//                 window.console.log(error)
//                 this.errored = true;
//             })
//             .finally(() => this.loading = false);
//     }
// }