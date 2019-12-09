<template>
    <header>
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand href="#">CURSOS ONLINE</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- NAV ITEMS - LEFT -->
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>

                    <b-nav-dropdown v-if="isAdmin">
                        <template v-slot:button-content>
                            Administrador
                        </template>
                        <h6 class="dropdown-header">Cursos</h6>
                        <b-dropdown-item to="/categoria">Categoria</b-dropdown-item>
                        <b-dropdown-item to="/curso">Curso</b-dropdown-item>
                        <b-dropdown-item to="/turma">Turma</b-dropdown-item>

                        <h6 class="dropdown-header">Usuários</h6>
                        <b-dropdown-item to="/perfil">Perfil</b-dropdown-item>
                        <b-dropdown-item to="/usuario">Usuário</b-dropdown-item>
                    </b-nav-dropdown>

                    <b-nav-dropdown v-if="isProf">
                        <template v-slot:button-content>
                            Professor
                        </template>
                        <h6 class="dropdown-header">Cursos</h6>
                        <b-dropdown-item to="/curso">Criar/Editar Cursos</b-dropdown-item>

                        <h6 class="dropdown-header">Turma</h6>
                        <b-dropdown-item to="/turma">Criar/Editar Turmas</b-dropdown-item>
                    </b-nav-dropdown>

                    <b-nav-dropdown v-if="isAluno">
                        <template v-slot:button-content>
                            Aluno
                        </template>
                        <h6 class="dropdown-header">Cursos</h6>
                        <b-dropdown-item to="/curso">Ver Cursos</b-dropdown-item>
                    </b-nav-dropdown>

                    <b-nav-item to="/about">Sobre</b-nav-item>
                </b-navbar-nav>

                <!-- NAV ITEMS - RIGHT -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Pesquisar"></b-form-input>
<!--                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Pesquisar</b-button>-->
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            Conta
                        </template>
                        <div v-if="isLoggedIn">
                            <b-dropdown-item to="#">Perfil</b-dropdown-item>
                            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                        </div>
                        <div v-else>
                            <b-dropdown-item to="/login">Login</b-dropdown-item>
                            <b-dropdown-item to="/register">Registrar-se</b-dropdown-item>
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
            },
            isAdmin: function() {
                return this.$store.getters.isAdmin
            },
            isProf: function() {
                return this.$store.getters.isProf
            },
            isAluno: function() {
                return this.$store.getters.isAluno
            },
        },

        methods: {
            logout: function() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },

        created: function () {
            this.$axios.interceptors.response.use(undefined, function (err) {
                return new Promise(function () {
                    if (err.status === 401 && err.config /*&& !err.config.__isRetryRequest*/) {
                        this.$store.dispatch('logout')
                    }
                    throw err;
                });
            });
        }

    }


</script>

<style scoped>
    nav {
        background-color: #0a5593;
        box-shadow: 0 .25rem .25rem rgba(0,0,0,.25),inset 0 -1px 5px rgba(0,0,0,.25);
    }
    .dropdown-header {
        color: royalblue;
    }
</style>