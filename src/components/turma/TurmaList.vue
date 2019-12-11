<template>
    <div id="lista">
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

<!--            <p class="mt-3">Página atual: {{ currentPage }}</p>-->

            <b-table id="itemsList" striped hover
                     :fields="fields"
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
                <template v-slot:cell(acoes)="row">
                    <b-button-group size="sm">
                        <b-button v-if="row.rowSelected" @click="onEdit" variant="primary" title="Alterar">
                            <!--                        {{ row.rowSelected ? 'Hide' : 'Show'}}-->
<!--                            Alterar-->
                            <i class="material-icons md-18">edit</i>
                        </b-button>
                        <b-button v-if="row.rowSelected" @click="onDelete" variant="danger" title="Deletar">
                            <!--                        {{ row.rowSelected ? 'Hide' : 'Show'}}-->
<!--                            Deletar-->
                            <i class="material-icons md-18">delete</i>
                        </b-button>
                    </b-button-group>

                </template>

            </b-table>
        </div>
        <div v-else-if="saveUpdateErrored">
            <p v-if="saveUpdateErrored">Falha ao carregar dados do servidor!</p>
        </div>

<!--        <p>is Linha selecionada: {{ rowSelected }}</p>-->
        <b-alert class="admin-alert" show variant="danger" v-if="app_env">Linha selecionada: {{ selected }}</b-alert>
    </div>
</template>

<script>
    import { mapGetters, mapState/*, mapActions*/ } from 'vuex';
    export default {

        name: 'TurmaList',

        components:{},

        props: {
            isItensRefreshedOutside: {
                type: Boolean
            },
            editingItem: {
                type: Object
            }
        },

        created() {
            if(this.currentCursoId)
                this.$store.dispatch('turmas/getAllTurmasDoCurso', this.currentCursoId);
            // else
            //     this.$store.state.turmasDoCurso = []
            // window.console.log('LIST Created: CURRENT turmasDoCurso:', this.$store.state.turmasDoCurso);
            window.console.log('LIST Created: CURRENT State turmasDoCurso:', this.turmasDoCurso);
        },

        data() {
            return {
                app_env: process.env.VUE_APP_ENV_SUBTITLE,
                loading: true,
                showed: false,
                saveUpdateErrored: false,
                deleteErrored: false,

                //bootstrap-vue table
                fields: [
                    //'id',
                    'nome',
                    {key: 'curso_nome', label: 'Curso'},
                    {key: 'professor_nome', label: 'Professor'},
                    {key: 'descricao', label: 'Descrição'},
                    // {key: 'dth_criacao', label: 'Criação'},
                    // 'imagem',
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
                currentCursoId: state => state.turmas.currentCursoId
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
            }
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

</style>