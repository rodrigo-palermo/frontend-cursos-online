<template>
    <div class="perfil">

        <h3>Perfil de usuário</h3>
<!--        <perfil-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"-->
        <perfil-form
        ></perfil-form>
        <br>
        <hr>
        <h3>Lista</h3>
<!--        <perfil-list v-bind:is-itens-refreshed-outside="isItensRefreshed"-->
        <perfil-list
        ></perfil-list>

    </div>
</template>

<script>
    import PerfilForm from "../components/perfil/PerfilForm";
    import PerfilList from "../components/perfil/PerfilList";

    export default {
        name: "Perfil",
        components: {PerfilForm, PerfilList},
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