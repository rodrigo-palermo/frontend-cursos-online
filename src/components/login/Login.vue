<template>
    <div>
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
                username: '',
                password: '',
            }
        },

        methods: {
            login: function() {
                // const { username, password } = this;
                let username = this.username;
                let password = this.password;
                
                this.$store.dispatch('login', { username, password })
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(error => window.console.log(error))
            }
        }
    }
</script>

<style scoped>

</style>