<template>
    <header>
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand href="#">CURSOS ONLINE</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/cadastro">Cadastro</b-nav-item>
                    <b-nav-item to="/about">Sobre</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Pesquisar"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Pesquisar</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            Conta
                        </template>
<!--                        <div v-if="isLoggedIn">-->
                        <div>
                            <b-dropdown-item to="#">Perfil</b-dropdown-item>
                            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
<!--                        </div>-->
<!--                        <div v-else>-->
                            <b-dropdown-item to="/conta">Registrar-se</b-dropdown-item>
                            <b-dropdown-item to="/login">Entrar</b-dropdown-item>
                        </div>

                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
    export default {
        name: "HeaderPage",

        computed: {
            isLoggedIn: function() {
                return this.$store.getters.isLoggedIn
            }
        },

        methods: {
            logout: function() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        },

    }


</script>

<style scoped>
nav {
    background-color: #0a5593;
    box-shadow: 0 .25rem .25rem rgba(0,0,0,.25),inset 0 -1px 5px rgba(0,0,0,.25);
}
</style>