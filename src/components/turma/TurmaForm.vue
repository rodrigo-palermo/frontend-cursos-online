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

                <b-form-group v-if="this.$store.getters.isAdmin">
                    <select @change="onSelected" required id="input-61" class="custom-select" v-model="item.id_curso">
                        <option value="" disabled>Selecione um Curso</option>
                        <option v-for="curso in cursos"
                                :key="curso.id"
                                :value="curso.id"
                                selected="item.id_curso === curso.id">
                            {{ curso.nome }}  (Docente: {{ curso.usuario_criacao_nome}})
                        </option>
                    </select>
                </b-form-group>

<!--                <b-form-group v-if="this.$store.getters.isAdmin" id="input-group-611" label-for="input-611">-->
<!--                    <b-form-input-->
<!--                            id="input-611"-->
<!--                            v-model="professor_nome_titular"-->
<!--                            required-->
<!--                            placeholder="Professor titular"-->
<!--                            aria-disabled="true"-->
<!--                            disabled-->
<!--                    ></b-form-input>-->
<!--                </b-form-group>-->

                <b-form-group v-if="this.$store.getters.isProf">
                    <select @change="onSelected" required id="input-62" class="custom-select" v-model="item.id_curso">
                        <option value="" disabled>Selecione um Curso</option>
                        <option v-for="curso in cursosDoProfessor"
                                :key="curso.id"
                                :value="curso.id"
                                selected="item.id_curso === curso.id">
                            {{ curso.nome }}
                        </option>
                    </select>
                </b-form-group>

                <b-form-group id="input-group-2" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="item.nome"
                            required
                            placeholder="Nome da Turma"
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
<!--                        v-model="file"-->
<!--                        accept="image/jpeg, image/png, image/gif"-->
<!--                        :state="Boolean(file)"-->
<!--                        placeholder="Escolha uma imagem"-->
<!--                        drop-placeholder="Jogue o arquivo aqui..."-->
<!--                ></b-form-file>-->
<!--                <div class="mt-3">Arquivo escolhido: {{ file ? file.name : '' }}</div><br>-->

                <b-button-group>
                    <b-button type="submit" variant="primary">{{ item.id == null ? 'Adicionar' : 'Atualizar' }}</b-button>
                    <b-button type="reset" variant="info">Limpar</b-button>
                </b-button-group>
            </b-form>
        </div>
        <b-alert class="admin-alert" show variant="danger" v-if="app_env">Item a criar: {{ item }}</b-alert>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    export default {

        name: 'TurmaForm',

        components: {
        },

        computed: mapState({
            cursos: state => state.cursos.all,
            cursosDoProfessor: state => state.cursos.cursosDoProfessor,
            // lastCursoIdInserted: state => state.cursos.lastCursoIdInserted
            turmasDoCurso: state => state.turmas.turmasDoCurso,
            // currentCursoId: state => state.turmas.currentCursoId,
        }),

        created() {
            // if(this.currentCursoId)
            //     this.$store.dispatch('turmas/getAllTurmasDoCurso', this.currentCursoId);
            this.$store.dispatch('cursos/getAllCursosDoProfessor', this.$store.getters.userId);
            this.$store.dispatch('cursos/getAllCursos');
        },

        data() {
            return {
                app_env: process.env.VUE_APP_ENV_SUBTITLE,
                // file: null,
                item: {
                    nome: '',
                    descricao: '',
                    id_curso: '',
                    dth_criacao: '',
                    imagem: '',
                    professor_nome: ''
                },
                loading: true,
                errored: false,
                show: true,
            }
        },

        methods: {
            onSelected(){
                this.$store.dispatch('turmas/getAllTurmasDoCurso', this.item.id_curso);
                // window.console.log('CURRENT CURSO ID - mapStore:', this.currentCursoId);
                // this.professor_nome_titular = this.currentProfessorNome;
                // window.console.log('CURRENT CURSO ID - local item:', this.item.id_curso);
            },

            onSubmit(evt) {
                evt.preventDefault();
                if(this.item.id == null) {
                    //CREATE
                    let date = new Date(Date.now());
                    this.item.dth_criacao = date.toLocaleString();
                    this.$store.dispatch('turmas/submitTurma', this.item);
                    this.$store.dispatch('turmas/getAllTurmasDoCurso', this.item.id_curso);
                    window.console.log('Funcao salvar. Enviando objeto ao WS: ',this.item);
                    // let id_professor = this.$store.getters.userId;
                    // let item_turmaTemusuario = {"id_turma": this.item.id, "id_usuario": id_professor};
                    // this.$store.dispatch('turmastemusuarios/submitTurmaTemUsuario', item_turmaTemusuario);
                    window.console.log('Funcao atribuir Professor em turma. IMPLEMENTAR');

                } else {
                    // EDIT
                    this.$store.dispatch('turmas/updateTurma', this.item);
                    this.$store.dispatch('turmas/getAllTurmasDoCurso', this.item.id_curso);
                    window.console.log('Funcao atualizar. Enviando objeto ao WS: ', this.item)
                }
                this.verifyOperation();
                this.limparExcetoCursoId();
            },

            limpar: function () {
                this.item = {'id_curso': ''};
            },

            limparExcetoCursoId: function () {
                this.item = {'id_curso': this.item.id_curso};
                this.$store.dispatch('turmas/getAllTurmasDoCurso', this.item.id_curso);
            },

            verifyOperation() {
                this.loading = false;
                if(!this.errored) {
                    //window.scrollTo({top:9000,left: 0,behavior: 'smooth'});
                    // this.$emit('refreshItens');
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
                //esvazia para componente List correspondente
                this.$store.commit('turmas/setTurmasDoCurso',[]);
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