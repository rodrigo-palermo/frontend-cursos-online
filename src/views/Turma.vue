<template>
    <div class="turma">

        <h3>Turma</h3>
<!--        <turma-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"-->
        <turma-form
        ></turma-form>
        <br>
        <hr>
        <h3>Lista</h3>
<!--        <turma-list v-bind:is-itens-refreshed-outside="isItensRefreshed"-->
        <turma-list
        ></turma-list>

    </div>
</template>

<script>
    import TurmaForm from "../components/turma/TurmaForm";
    import TurmaList from "../components/turma/TurmaList";

    export default {
        name: "Turma",
        components: {TurmaForm, TurmaList},
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