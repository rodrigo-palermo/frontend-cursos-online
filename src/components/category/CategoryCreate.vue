<template>
    <div id="categorycreate">
        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
            <tr v-for="item in lista"
                v-bind:item="item"
                v-bind:key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.nome}}</td>
                <td>{{item.descricao}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "CategoryCreate",
        props: ['lista'],
        data() {
            return {
                loading: true,
                errored: false,
                categorias: []
            }
        },
        mounted() {
            axios
                .get('http://localhost/wscursosonline/categoria')
                .then(response => {
                    this.lista = response.data;
                    window.console.log('Response',response)
                })
                .catch(error => {
                    window.console.log(error)
                    this.errored = true;
                })
                .finally(() => this.loading = false)
        },
    }
</script>

<style scoped>

</style>