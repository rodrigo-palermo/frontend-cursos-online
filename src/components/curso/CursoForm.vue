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

                <b-form-group>
                    <select required id="input-6" class="custom-select" v-model="item.id_categoria">
                    <option value="" disabled>Selecione uma Categoria</option>
                        <option v-for="categoria in categorias"
                                :key="categoria.id"
                                :value="categoria.id"
                                selected="item.id_categoria === categoria.id">
                            {{ categoria.nome }}
                        </option>
                    </select>
                </b-form-group>

                <b-form-group  v-if="this.$store.getters.isAdmin">

                    <select required id="input-8" class="custom-select" v-model="item.id_usuario_criacao">
                        <option value="" disabled>Selecione o Professor</option>
                        <option v-for="professor in professores"
                                :key="professor.id"
                                :value="professor.id"
                                :selected="item.id_usuario_criacao === professor.id">
                            {{ professor.nome }}
                        </option>
                    </select>

                </b-form-group>

                <b-form-group id="input-group-2" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="item.nome"
                            required
                            placeholder="Nome do Curso"
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

<!--                <b-form-file-->
<!--                            v-model="file"-->
<!--                            accept="image/jpeg, image/png, image/gif"-->
<!--                            :state="Boolean(file)"-->
<!--                            placeholder="Escolha uma imagem"-->
<!--                            drop-placeholder="Jogue o arquivo aqui..."-->
<!--                ></b-form-file>-->
<!--                <div class="mt-3">Arquivo escolhido: {{ file ? file.name : '' }}</div><br>-->

                <b-button-group>
                    <b-button type="submit" variant="primary">{{ item.id == null ? 'Adicionar' : 'Atualizar' }}</b-button>
                    <b-button type="reset" variant="info">Limpar</b-button>
                </b-button-group>
            </b-form>
        </div>
        <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isDesenv">Item a criar: {{ item }}</b-alert>
    </div>

</template>

<script>

    import { mapState } from 'vuex';
    export default {

        name: 'CursoForm',

        components: {
        },

        computed: mapState({
            categorias: state => state.categorias.all,
            professores: state => state.usuarios.professores,
            cursos: state => state.cursos.all
        }),

        created() {
            this.$store.dispatch('categorias/getAllCategorias'),
            // this.$store.dispatch('usuarios/getAllUsuarios'),
            this.$store.dispatch('usuarios/getAllProfessores','professor')
            // this.$store.dispatch('cursos/getAllCursos')
        },

        data() {
            return {
                // file: null,
                item: {
                    nome: '',
                    id_categoria: '',
                    descricao: '',
                    id_usuario_criacao: '',
                    dth_criacao: '',
                    imagem: ''
                },
                //selected: '',  //interfere no if do :selected de id_categoria?
                //selected_option: 'selected',
                loading: true,
                errored: false,
                show: true,
            
            }
            //     options: [
            //                   { value: null, text: 'Selecione uma Categoria' },
            //                           ]
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                if(this.item.id == null) {
                    //CREATE
                    if(this.$store.getters.isProf)
                        this.item.id_usuario_criacao = this.$store.getters.userId
                    let date = new Date(Date.now());
                    this.item.dth_criacao = date.toLocaleString();
                    this.$store.dispatch('cursos/submitCurso', this.item);
                    window.console.log('Funcao salvar. Enviando objeto ao WS: ',this.item);
                    this.limpar();
                    this.verifyOperation()


                } else {
                    // EDIT
                    this.$store.dispatch('cursos/updateCurso', this.item);
                    window.console.log('Funcao atualizar. Enviando objeto ao WS: ', this.item)
                    this.limpar();
                    this.verifyOperation()
                }
            },

            limpar: function () {
                this.item = {"id_categoria": "", "id_usuario_criacao": ""};
            },

            verifyOperation() {
                this.loading = false;
                if(!this.errored) {
                    //window.scrollTo({top:9000,left: 0,behavior: 'smooth'});
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

        }
    }

</script>

<style scoped>

</style>