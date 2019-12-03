<template>
    <div>
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

            <b-form-group>
<!--                REFATORADO do abaixo, mas não funciona com dois :selected-->
<!--                <select class="custom-select" v-model="item.id_categoria">&ndash;&gt;-->
<!--                    <option disabled :selected="!item.id">Selecione uma opção</option>-->
<!--                    <option v-for="categoria in categorias"-->
<!--                            :key="categoria.id"-->
<!--                            :value="categoria.id"-->
<!--                            :selected="item.id && item.id_categoria === categoria.id"-->
<!--                    >{{ categoria.nome }}-->
<!--                    </option>-->
<!--                </select>-->

<!--                FUNCIONANOD, mas tentar refatorado acima sem IF ELS-->
<!--                CRIAR-->
                <select v-if="!item.id" class="custom-select" v-model="item.id_categoria">
                    <option disabled selected="selected">Selecione uma Categoria</option>
                    <option v-for="categoria in categorias"
                    :key="categoria.id"
                    :value="categoria.id">
                        {{ categoria.nome }}
                    </option>
                </select>
<!--                EDITAR-->
                <select v-else class="custom-select" v-model="item.id_categoria">
                    <option disabled>Selecione uma Categoria</option>
                    <option v-for="categoria in categorias"
                            :key="categoria.id"
                            :value="categoria.id"
                            :selected="item.id_categoria === categoria.id"
                            >{{ categoria.nome }}
                    </option>
                </select>
            </b-form-group>

<!--            <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-12" label-for="input-12">-->
<!--                <b-form-input-->
<!--                        id="input-12"-->
<!--                        v-model="item.id_categoria"-->
<!--                        placeholder="Id categoria"-->
<!--                        aria-disabled="true"-->
<!--                        disabled-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->
<!--            <b-form-group id="input-group-121" label-for="input-121">-->
<!--                <b-form-select-->
<!--                        id="input-121"-->
<!--                        v-model="selected"-->
<!--                        :options="categorias"-->
<!--                        placeholder="Categoria"-->
<!--                ></b-form-select>-->
<!--            </b-form-group>-->
            <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-13" label-for="input-13">
                <b-form-input
                        id="input-13"
                        v-model="item.id_usuario_criacao"
                        placeholder="Id usuario criacao"
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
                        
                        placeholder="Data de Criação"
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
    <b-alert show variant="danger" v-if="this.$store.getters.isAdmin">Item a criar: {{ item }}</b-alert>
    </div>
</template>

<script>

    const url = `${process.env.VUE_APP_API_URL}/curso`;
    // const url_foreign_1 = `${process.env.VUE_APP_API_URL}/categoria`;
    import { mapState } from 'vuex';
    export default {

        name: 'CursoForm',

        components: {
        },

        computed: mapState({
            categorias: state => state.categorias.all
        }),

        created() {
            this.$store.dispatch('categorias/getAllCategorias')
        },

        // props: ['editingItemPai'],

        data() {
            return {
                item: {
                    nome: '',
                    id_categoria: '',
                    descricao: '',
                    id_usuario_criacao: '',
                    // dth_criacao: '',
                    imagem: ''
                },
                // items_fk_1: [],
                //selected: '',  //interfere no if do :selected de id_categoria?
                //selected_option: 'selected',
                loading: true,
                errored: false,
                show: true,
            }
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                window.scrollTo({bottom:0,left: 0,behavior: 'smooth'});
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


            // this.$axios.get(url_foreign_1).then(response => {
            //     this.items_fk_1 = response.data;
            //     this.items_fk_1["value"] = this.items_fk_1["id"];
            //     this.items_fk_1["text"] = this.items_fk_1["nome"];
            //     window.console.log('Componente fk 1',this.items_fk_1);
            // })
            //     .catch(error => {
            //         window.console.log(error);
            //         this.saveUpdateErrored = true;
            //     })
            //     .finally(() => this.loading = false,
            //         // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            //     );
            // this.showed = this.saveUpdateErrored === false;
        }
    }

</script>

<style scoped>

</style>