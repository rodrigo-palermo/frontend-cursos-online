<template>
    <div class="usuario">
        <b-container>
            <b-row>
                <b-col>
                    <h3>Cadastro de Usuários</h3>
                    <usuario-form
                    ></usuario-form>
                </b-col>
                <b-col>
                    <h3>Lista</h3>
                    <usuario-list
                    ></usuario-list>
                </b-col>
            </b-row>
        </b-container>
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