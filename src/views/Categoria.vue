<template>
    <div class="categoria">

        <h3>Categoria de curso</h3>
<!--        <categoria-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"-->
        <categoria-form
        ></categoria-form>
        <br>
        <hr>
        <h3>Lista</h3>
<!--        <categoria-list v-bind:is-itens-refreshed-outside="isItensRefreshed"-->
        <categoria-list
        ></categoria-list>

    </div>
</template>

<script>
    import CategoriaForm from "../components/categoria/CategoriaForm";
    import CategoriaList from "../components/categoria/CategoriaList";

    export default {
        name: "Categoria",
        components: {CategoriaForm, CategoriaList},
        data() {
            return {
                // isItensRefreshed: false,
                // editingItemPai: {}
            }
        }
    }
</script>

<style scoped>

</style>