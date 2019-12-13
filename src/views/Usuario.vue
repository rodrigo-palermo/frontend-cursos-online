<template>
    <div class="usuario">
        <main>
            <b-row>
                <b-col lg="3">
                    <h4>Cadastro de Usuários</h4>
                    <usuario-form
                    ></usuario-form>
                </b-col>
                <b-col>
                    <h4>Lista</h4>
                    <usuario-list
                    ></usuario-list>
                </b-col>
            </b-row>
        </main>
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