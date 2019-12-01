<template>
    <div id="formulario">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-1" label-for="input-11">
                <b-form-input
                        id="input-11"
                        v-model="item.id"
                        placeholder="Id"
                        aria-disabled="true"
                        disabled
                ></b-form-input>
            </b-form-group>
            <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-12" label-for="input-12">
                <b-form-input
                        id="input-12"
                        v-model="item.id_categoria"
                        placeholder="Id categoria"
                        aria-disabled="true"
                        disabled
                ></b-form-input>
            </b-form-group>
             <b-form-group id="input-group-121" label-for="input-121">
                <b-form-select
                        id="input-121"
                        v-model="selected"
                        :options="items_fk_1"
                        placeholder="Categoria"
                ></b-form-select>
            </b-form-group>
            <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-13" label-for="input-13">
                <b-form-input
                        id="input-13"
                        v-model="item.id_usuario_criacao"
                        placeholder="Id usuario criacao"
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

            <b-form-group id="input-group-3" label-for="input-3">
                <b-form-input
                        id="input-3"
                        v-model="item.descricao"
                        required
                        placeholder="Descrição"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label-for="input-4">
                <b-form-input
                        id="input-4"
                        v-model="item.dth_criacao"
                        aria-disabled="true"
                        disabled
                        placeholder="Criação"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label-for="input-5">
                <b-form-input
                        id="input-5"
                        v-model="item.imagem"
                        placeholder="Imagem"
                ></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button type="submit" variant="primary">{{ item.id == null ? 'Adicionar' : 'Atualizar' }}</b-button>
                <b-button type="reset" variant="info">Limpar</b-button>
            </b-button-group>

        </b-form>
    </div>
</template>

<script>

    const url = `${process.env.VUE_APP_API_URL}/curso`;
    const url_foreign_1 = `${process.env.VUE_APP_API_URL}/categoria`;
    export default {

        name: 'CursoForm',

        components: {
        },

        // props: ['editingItemPai'],

        data() {
            return {
                item: {
                    nome: '',
                },
                items_fk_1: [],
                selected: null,
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
                    this.$axios
                        .post(url, this.item)
                        .then(
                            this.limpar(),
                            // this.refresh(),
                            window.console.log('Funcao salvar. Enviando objeto ao WS: ',this.item)
                        )
                        .catch(error => {
                            window.console.log(error);
                            this.errored = true;
                        })
                        .finally(() => this.verifyOperation());


                } else {
                    // EDIT
                    let id = this.item.id;
                    this.$axios
                        .put(url+'/'+id, this.item)
                        .then(
                            this.limpar(),
                            window.console.log('Funcao atualizar. Enviando objeto ao WS: ', this.item)
                        )
                        .catch(error => {
                            window.console.log(error);
                            this.errored = true
                            }
                        )
                        .finally(() => this.verifyOperation());
                }
            },

            limpar: function () {
                this.item = {};
            },

            verifyOperation() {
                this.loading = false;
                if(!this.errored) {
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
            });

            this.$axios.get(url_foreign_1).then(response => {
                this.items_fk_1 = response.data;
                this.items_fk_1["value"] = this.items_fk_1["id"];
                this.items_fk_1["text"] = this.items_fk_1["nome"];
                window.console.log('Componente fk 1',this.items_fk_1);
            })
                .catch(error => {
                    window.console.log(error);
                    this.saveUpdateErrored = true;
                })
                .finally(() => this.loading = false,
                    // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
                );
            this.showed = this.saveUpdateErrored === false;
        }
    }

</script>

<style scoped>

</style>