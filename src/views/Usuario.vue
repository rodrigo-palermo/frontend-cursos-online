<template>
    <div class="usuario">

        <h3>Usuário</h3>
<!--        <usuario-form v-on:refreshItens="isItensRefreshed = !isItensRefreshed"-->
        <usuario-form
        ></usuario-form>
        <br>
        <hr>
        <h3>Lista</h3>
<!--        <usuario-list v-bind:is-itens-refreshed-outside="isItensRefreshed"-->
        <usuario-list
        ></usuario-list>

    </div>
</template>

<script>
    import UsuarioForm from "../components/usuario/UsuarioForm";
    import UsuarioList from "../components/usuario/UsuarioList";

    export default {
        name: "Usuario",
        components: {UsuarioForm, UsuarioList},
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