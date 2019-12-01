<template>
    <div class="cadastro">

        <h3>Categoria de curso</h3>
        <categoria-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"
                        ></categoria-form>
        <br>
        <h3>Lista</h3>
        <categoria-list v-bind:is-itens-refreshed-outside="isItensRefreshed"
                        ></categoria-list>

    </div>
</template>

<script>
    import CategoriaList from "../components/categoria/CategoriaList";
    import CategoriaForm from "../components/categoria/CategoriaForm";

    export default {
        name: "Cadastro",
        components: {CategoriaForm, CategoriaList},
        data() {
            return {
                isItensRefreshed: false,
                editingItemPai: {}
            }
        }
    }
</script>

<style scoped>

</style>