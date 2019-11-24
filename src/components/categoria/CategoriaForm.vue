<template>
    <form id="formulario">
        <div class="form-group">
            <!--    <label for="nome">Categoria</label>-->
            <input v-model="item.nome" type="input" class="form-control"  name="nome" placeholder="Categoria" value="" required>
        </div>
        <div class="form-group">
            <!--    <label for="descricao">Descrição</label>-->
            <input v-model="item.descricao" type="input" class="form-control"  name="descricao" placeholder="Descrição" value="" required>
        </div>

<!--        <input type="hidden" id="hdnId" value="">-->
        <input class="btn btn-primary" type="submit" name="submit" value="'Atualizar':'Cadastrar'" @click="salvar()">
<!--        <a href="#" class="btn btn-secondary">Voltar</a>-->
    </form>

</template>

<script>

    const url = `${process.env.VUE_APP_API_URL}/categoria`;
    export default {

        name: 'CategoriaForm',

        components: {

        },

        //props: ['lista'],

        data() {
            return {
                item: {},
                loading: true,
                errored: false,
                lista: []
            }
        },

        methods: {
            salvar: function () {
                // this.$emit('postItem', {item: this.item});
                this.$emit('refreshItens');
                this.$axios
                    .post(url, this.item)
                    .then(
                        this.limpar(),
                        // this.refresh(),
                        window.console.log('Funcao salvar. Enviando objeto: ',this.item)
                    )
                    .catch(error => {
                        window.console.log(error);
                        this.errored = true;
                        window.console.log('Operação cancelada.');
                    })
                    .finally(() => this.loading = false);
                // window.console.log('Atualizando dados em ouo componente');
                // this.$parent.$children[1].refresh();
                // this.$parent.$children[1].refresh();
            },
            limpar: function () {
                this.item = {};
            },
            // refresh: function () {
            //
            //     return this.$axios.get(url).then(response => {
            //         this.lista = response.data;
            //         window.console.log('Response', response);
            //     })
            //         .catch(error => {
            //             window.console.log(error);
            //             this.errored = true;
            //         })
            //         .finally(() => this.loading = false);
            // }
        },

        mounted() {
            // this.refresh();
        }
    }

</script>

<style scoped>

</style>