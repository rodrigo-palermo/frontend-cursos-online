<template>
    <section id="lista">
        <span v-if="loading"> </span>
        <span v-else><br></span>
        <!--        v-if="showed && !saveUpdateErrored"-->
        <div v-if="true" class="overflow-auto">
            <b-pagination v-model="currentPage"
                          :total-rows="rows"
                          :per-page="perPage"
                          aria-controls="itemsList"
                          size="sm"
                          align="right"
            >
            </b-pagination>

            <b-badge variant="danger" v-if="this.currentCursoId && !this.turmasDoCurso[0]">Não existem turmas para o curso selecionado</b-badge>
            <div class="headerGroup">
                <div class="headerTurmas">
                    <b-badge variant="">curso</b-badge><h5 v-if="this.turmasDoCurso[0]">{{ this.turmasDoCurso[0].curso_nome }}</h5>
                </div>
                <div class="headerTurmas">
                    <b-badge variant="">docente</b-badge><h5 v-if="this.turmasDoCurso[0]">{{ this.turmasDoCurso[0].professor_nome }}</h5>
                </div>
            </div>




            <b-table id="itemsList" striped hover
                     :fields="fields"
                     :sort-by.sync="sortBy"
                     :items='turmasDoCurso'
                     :per-page="perPage"
                     :current-page="currentPage"
                     small
                     primary-key="id"
                     ref="selectableTable"
                     selectable
                     :select-mode="selectMode"
                     @row-selected="onRowSelected"
                     responsive="sm"
            >
<!--                <template v-slot:cell(inscritos)="row">-->
<!--                    <span>{{ alunosDaTurma.length }}</span>-->
<!--                </template>-->
                <template v-slot:cell(acoes)="row">
                    <b-button-group size="sm">
                        <b-button v-if="row.rowSelected" @click="onEdit" variant="primary" title="Alterar">
                            <!--                            Alterar-->
                            <i class="material-icons md-18">edit</i>
                        </b-button>
                        <b-button v-if="row.rowSelected" @click="onDelete" variant="danger" title="Deletar">
                            <!--                            Deletar-->
                            <i class="material-icons md-18">delete</i>
                        </b-button>
                        <b-button v-b-toggle.collapse-1  v-if="row.rowSelected" @click="onInscrever" variant="success" title="Inscrever aluno">
                            <!--                            Inscrever-->
                            <i class="material-icons md-18">add</i>
                        </b-button>
                    </b-button-group>
                </template>

            </b-table>
            <!--LISTA USUÁRIOS / INSCRIÇÃO -->
            <b-collapse v-if="selected" id="collapse-1" style="width: 100%">
                <b-container class="inscricaoCollapse">
                    <div class="headerGroup" id="titleInscricaoCollapse">
                        <div class="headerTurmas">
                            <b-badge variant="">turma</b-badge><h5 v-if="this.selected">{{ this.selected.nome }}</h5>
                        </div>
                    </div>
                    <turma-tem-usuario-list></turma-tem-usuario-list>
                </b-container>
            </b-collapse>
        </div>

        <div v-else-if="saveUpdateErrored">
            <p v-if="saveUpdateErrored">Falha ao carregar dados do servidor!</p>
        </div>
        <!--        <p>is Linha selecionada: {{ rowSelected }}</p>-->
        <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isDesenv">Linha selecionada: {{ selected }}</b-alert>
    </section>
</template>

<script>
    import { mapGetters, mapState/*, mapActions*/ } from 'vuex';
    import TurmaTemUsuarioList from "../turmatemusuario/TurmaTemUsuarioList";

    export default {

        name: 'TurmaList',

        components:{ TurmaTemUsuarioList },

        props: {
            isItensRefreshedOutside: {
                type: Boolean
            },
            editingItem: {
                type: Object
            }
        },

        created() {
            // if(this.currentCursoId)
            //     this.$store.dispatch('turmas/getAllTurmasDoCurso', this.currentCursoId);
            // else
            //     this.$store.state.turmasDoCurso = []
            // window.console.log('LIST Created: CURRENT turmasDoCurso:', this.$store.state.turmasDoCurso);
            window.console.log('LIST Created: CURRENT State turmasDoCurso:', this.turmasDoCurso);
        },

        data() {
            return {
                loading: true,
                showed: false,
                saveUpdateErrored: false,
                deleteErrored: false,

                //bootstrap-vue table
                sortBy: 'id',
                fields: [
                    // 'id',
                    // {key: 'curso_nome', label: 'Curso'},
                    {key: 'nome', label: 'Turma', sortable: true},
                    // {key: 'professor_nome', label: 'Professor'},
                    {key: 'descricao', label: 'Descrição', sortable: true},
                    // {key: 'dth_criacao', label: 'Criação', sortable: true},
                    // 'imagem',
                    // {key: 'inscritos', label:'Inscritos', sortable: true},
                    {key: 'acoes', label: 'Ações'},
                ],

                //bootstrap-vue pagination
                perPage: 10,
                currentPage: 1,

                //bootstrap-vue select
                selectMode: 'single',
                selected: {},
            }
        },

        computed: {
            rows() {
                return this.turmasDoCurso.length
            },

            ...mapState({
                turmas: state => state.turmas.all,
                turmasDoCurso: state => state.turmas.turmasDoCurso,
                currentCursoId: state => state.cursos.currentCursoId,
                currentTurmaId: state => state.turmas.currentTurmaId,
                alunosDaTurma: state => state.turmastemusuarios.alunosDaTurma,
                alunosHabilitadosParaTurma: state => state.turmastemusuarios.alunosHabilitadosParaTurma,
            }),
            ...mapGetters({
                turmasFiltro: 'getTurmas'
            })
        },

        methods: {
            // ...mapActions({'refreshTurmas': 'turmas/getAllCategories'}),
            // inicializar() {
            //     //para reinicializar variáveis se ação vinda de outro componente
            //     this.loading = true;
            //     // this.saveUpdateErrored = false;
            //     if(this.saveUpdateErrored){
            //         this.showed = false;
            //         // this.items = [];
            //         // window.alert('Inicializanso show e saveUpdateErrored. Esvaziando itens.');
            //         this.saveUpdateErrored = false;
            //     }
            // },

            onRowSelected(item) {
                this.selected = item[0];
                if(item[0]){
                    this.$store.commit('turmas/setCurrentTurmaId', this.selected.id);
                    this.$store.dispatch('turmastemusuarios/getAllAlunosDaTurma', this.currentTurmaId);
                    this.$store.dispatch('turmastemusuarios/getAllAlunosHabilitadosParaTurma', this.currentTurmaId);
                }

            },

            async onEdit() {
                //this.editingItem = this.selected;
                //window.console.log('Enviado item para editar: ', this.editingItem);
                this.$root.$emit('editar', this.selected);
                //window.scrollTo({top:0,left: 0,behavior: 'smooth'});
            },

            async onDelete() {
                this.$store.dispatch('turmas/deleteTurmaDoCurso', {"id_turma": this.selected.id, "id_curso": this.selected.id_curso});
                // if(this.selected.id_curso) { not working from outside
                //     this.$store.dispatch('turmas/getAllTurmasDoCurso', this.selected.id_curso);
                //     this.$store.dispatch('turmas/getAllTurmasDoCurso', this.selected.id_curso);
                //     window.alert('teste');
                // }
                window.console.log('Funcao deletar. Id enviado ao WS: ', this.selected.id);
                window.console.log('Funcao deletar. Atualiza lista. Id Curso atual - STORE: ', this.currentCursoId);
                window.console.log('Funcao deletar. Atualiza lista. Id Curso atual - SELECT: ', this.selected.id_curso);
                // if(this.currentCursoId)
                //     this.$store.dispatch('turmas/getAllTurmasDoCurso', this.currentCursoId);
            },

            async onInscrever() {
                //this.editingItem = this.selected;
                //window.console.log('Enviado item para inscricao: ', this.editingItem);
                // this.$root.$emit('editar', this.selected);
                //window.scrollTo({top:0,left: 0,behavior: 'smooth'});
            },
        },

        watch: {
            isItensRefreshedOutside: function() {
                // this.inicializar();
                window.console.log('Data changed!', this.isItensRefreshedOutside);
            }
        }
    }

</script>

<style scoped>


    .headerGroup {
        text-align: left;

    }
    .headerTurmas {
        text-align: left;
        margin-bottom: 15px;
        display: inline-block;
        margin-right: 30px;
    }

    #titleInscricaoCollapse  {
        padding-bottom: 0px;
        margin-bottom: 0px;
    }

</style>