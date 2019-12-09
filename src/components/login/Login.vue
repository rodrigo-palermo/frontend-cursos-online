<template>
    <div id="formulario-login">
        <b-form @submit.prevent="login">
            <b-form-group>
                <b-form-input id="input-1" v-model="username" placeholder="Login" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-2" v-model="password" placeholder="Senha" type="password" required></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button type="submit" variant="primary">Entrar</b-button>
            </b-button-group>

        </b-form>

    </div>
</template>

<script>
    export default {
        name: "Login",

        data() {
            return {
                errored: false,
                username: '',
                password: '',
            }
        },

        methods: {
            login: function() {
                // const { username, password } = this;
                let nome = this.username;
                let senha = this.password;
                
                this.$store.dispatch('login', { nome, senha })
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(error => {
                        window.console.log(error);
                        this.errored = true;
                        // window.alert(error);
                        }
                    ).finally(() => {
                        if(this.errored){
                            window.alert('Usuário e/ou senha incorretos.');
                            this.errored = false;
                        }

                })
            }
        }
    }
</script>

<style scoped>

</style>