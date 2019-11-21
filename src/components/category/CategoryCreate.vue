<template>
    <div id="categorycreate">
<!--        <label for="nome">Nome</label>-->
<!--        <input id="nome" v-model="dados"><br>-->
        <p>{{ lista }}</p>

<!--        <button v-on:click="salvar()">Adicionar Categoria</button>-->
<!--        <button v-on:click="limpar()">Limpar</button>-->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "CategoryCreate",
        props: ['lista'],
        data() {
            return {
                categoria: [],
                loading: true,
                errored: false
            }
        },
        mounted() {
            axios
                .get('http://localhost/wscursosonline/categoria')
                .then(response => {
                    this.categoria = response.data;
                    window.console.log('Teste',response)
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