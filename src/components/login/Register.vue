<template>
    <div id="formulario-register">
        <b-form @submit.prevent="register">
            <b-form-group>
                <b-form-input id="input-0" v-model="item.nome" placeholder="Login" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-1" v-model="item.email" placeholder="E-mail" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-2" v-model="item.senha" placeholder="Senha" type="password" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input @change="getCep" id="input-3" v-model="item.cep" placeholder="CEP" type="text" minlength="8" maxlength="8" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-4" v-model="item.logradouro" placeholder="Logradouro" disabled></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-5" v-model="item.numero" placeholder="Número" required></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-6" v-model="item.complemento" placeholder="Complemento (opcional)" ></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-7" v-model="item.bairro" placeholder="Bairro" disabled></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-8" v-model="item.localidade" placeholder="Localidade" disabled></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-form-input id="input-9" v-model="item.uf" placeholder="Estado" disabled></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button type="submit" variant="primary">Criar conta</b-button>
            </b-button-group>

        </b-form>

    </div>
</template>

<script>
    export default {
        name: "Register",

        data() {
            return {
                loading: true,
                cepErrored: false,
                show: true,
                item: {
                    nome: '',
                    senha: '',
                    email: '',
                    cep: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    localidade: '',
                    uf: '',
                    //aluno (padrao)
                    id_perfil: 3

                },
                endereco: {}
            }
        },

        methods: {
            getCep: function () {
                //ViaCep
                let url = 'https://viacep.com.br/ws/'
                if (this.item.cep.length == 8) {
                    this.$axios
                        .get(url + this.item.cep + '/json/')
                        .then(
                            response => {
                                this.endereco = response.data;
                                window.console.log('Funcao getCep. Dados recebido por ViaCep WS: ', this.endereco);
                                this.item.logradouro = this.endereco.logradouro;
                                this.item.bairro = this.endereco.bairro;
                                this.item.localidade = this.endereco.localidade;
                                this.item.uf = this.endereco.uf;
                            }
                        )
                        .catch(error => {
                            window.alert('CEP não existe. Por favor, tente novamente.');
                            window.console.log('ViaCep error: ', error)
                            this.cepErrored = true;
                        })
                        .finally(() => this.verifyOperation());
                }
            },

            verifyOperation() {
                this.loading = false;
                if(!this.errored) {
                    this.$emit('refreshItens');
                } else {
                    window.console.log('Operação cancelada.');
                }
            },

            register: function() {
                this.$store.dispatch('register', this.item)
                    .then((response) => {
                        window.console.log('Enviando novo registro ao WS.');
                        window.console.log(response);
                    })
                    .catch(error => {
                        window.console.log(error);
                        window.alert(error);
                        this.errored = true;
                        }
                    ).finally(() => {
                        if(!this.errored){
                            window.alert('Cadastro realizado com sucesso. Realize o login.');
                            this.$router.push('/login')
                        } else {
                            window.alert('Erro ao realizar cadastro. Por favor, tente novamente.');
                        }
                })
            }
        }
    }
</script>

<style scoped>

</style>