<template>
    <div class="perfil">
        <main>
            <b-row>
                <b-col lg="4">
                    <h4>Cadastro de Perfil de Usuário</h4>
                    <perfil-form
                    ></perfil-form>
                </b-col>
                <b-col>
                    <h4>Lista</h4>
                    <perfil-list
                    ></perfil-list>
                </b-col>
            </b-row>
        </main>
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