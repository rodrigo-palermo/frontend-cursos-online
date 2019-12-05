<template>
    <div>
        <div id="formulario">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-1" label-for="input-1">
                    <b-form-input
                            id="input-1"
                            v-model="item.id"
                            placeholder="Id"
                            aria-disabled="true"
                            disabled
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="item.nome"
                            required
                            placeholder="Nome"
                    ></b-form-input>
                </b-form-group>

                <b-button-group>
                    <b-button type="submit" variant="primary">{{ item.id == null ? 'Adicionar' : 'Atualizar' }}</b-button>
                    <b-button type="reset" variant="info">Limpar</b-button>
                </b-button-group>
            </b-form>
        </div>
        <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isAdmin">Item a criar: {{ item }}</b-alert>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    export default {

        name: 'TurmaForm',

        components: {
        },

        computed: mapState({
            turmas: state => state.turmas.all
        }),

        created() {
            this.$store.dispatch('turmas/getAllTurmas')
        },

        data() {
            return {
                item: {
                    nome: '',
                    descricao: '',
                },
                loading: true,
                errored: false,
                show: true,
            }
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                if(this.item.id == null) {
                    //CREATE
                    this.$store.dispatch('turmas/submitTurma', this.item);
                    window.console.log('Funcao salvar. Enviando objeto ao WS: ',this.item);
                    this.limpar();
                    this.verifyOperation()


                } else {
                    // EDIT
                    this.$store.dispatch('turmas/updateTurma', this.item);
                    window.console.log('Funcao atualizar. Enviando objeto ao WS: ', this.item)
                    this.limpar();
                    this.verifyOperation()
                }
            },

            limpar: function () {
                this.item = {};
            },

            verifyOperation() {
                this.loading = false;
                if(!this.errored) {
                    window.scrollTo({top:9000,left: 0,behavior: 'smooth'});
                    this.$emit('refreshItens');
                } else {
                    window.console.log('Operação cancelada.');
                }
            },

            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.limpar()
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
        },

        mounted() {
            this.$root.$on('editar', data => {
                window.console.log('Dados recebidos em componente: ', data);
                this.item = data;
            })
        }
    }

</script>

<style scoped>

</style>