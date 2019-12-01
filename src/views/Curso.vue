<template>
    <div class="curso">

        <h3>Curso</h3>
        <curso-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"
        ></curso-form>
        <br>
        <hr>
        <h3>Lista</h3>
        <curso-list v-bind:is-itens-refreshed-outside="isItensRefreshed"
        ></curso-list>

    </div>
</template>

<script>
    import CursoForm from "../components/curso/CursoForm";
    import CursoList from "../components/curso/CursoList";

    export default {
        name: "Curso",
        components: {CursoForm, CursoList},
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