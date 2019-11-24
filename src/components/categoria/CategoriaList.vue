<template>
    <div id="lista">
        <p v-if="errored">Falha ao carregar dados do servidor!</p>
        <p v-if="loading">Carregando dados...</p>
        <table v-if="show" class='table'>
            <thead>
            <tr>
                <th>id</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in itens"
                :item="item"
                :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.nome}}</td>
                <td>{{item.descricao}}</td>
                <td><a href='category/create/id' class="btn btn-outline-primary" title="Editar"><i class="material-icons md-18">edit</i></a>
                    <a href='category/create/id' class="btn btn-outline-danger" title="Excluir"><i class="material-icons md-18">delete</i></a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    const url = `${process.env.VUE_APP_API_URL}/categoria`;
    export default {

        name: 'CategoriaList',

        components:{},

        // props: ['itens'],
        props: {
            isItensRefreshedOutside: {
                type: Boolean
            }
        },

        data() {
            return {
                loading: true,
                show: false,
                errored: false,
                itens: []
            }
        },

        mounted() {
            return this.refresh();
        },

        methods: {
            refresh: function() {
                this.$axios.get(url).then(response => {
                    this.itens = response.data;
                    window.console.log('Response',response);
                })
                    .catch(error => {
                        window.console.log(error)
                        this.errored = true;
                    })
                    .finally(() => this.loading = false,
                        (this.errored === true)?(this.show = false):(this.show = true)
                    )
            }
        },

        watch: {
            isItensRefreshedOutside: function() {
                this.refresh();
                this.refresh();
                window.console.log('Data changed!', this.isItensRefreshedOutside);
                // this.isItensRefreshedOutside = false;
            }
        }
    }

</script>

<style scoped>

</style>