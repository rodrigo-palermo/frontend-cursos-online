<template>
    <div id="listaInscricao">

        <!--        <div v-if="true" class="overflow-auto">-->
        <b-row>
            <b-col>
                <b-form-group label="" align="left">
                    <b-badge variant="">alunos habilitados</b-badge>
                    <b-badge variant="danger" v-if="this.alunosHabilitadosParaTurma.length === 0">Não existem alunos habilitados</b-badge>
                    <p v-else>Selecione para inscrever</p>
                    <b-form-checkbox-group
                            v-model="selectedParaInscrever"
                            name="inscricao-turma-alunos"
                            stacked
                    >
                        <b-form-checkbox v-for="aluno in alunosHabilitadosParaTurma"
                                         :key="aluno.id"
                                         :value="aluno.id"
                        >{{ aluno.nome }}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <b-button v-if="this.alunosHabilitadosParaTurma.length !== 0 && selectedParaInscrever.length !== 0" size="sm" @click="onInscrever" variant="success" title="Inscrever aluno na turma">
                    Inscrever &raquo;
                </b-button>
                <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isDesenv">Alunos para Inscrever {{ selectedParaInscrever }}</b-alert>
            </b-col>
            <b-col>
                <b-form-group label="" align="left">
                    <b-badge variant="">alunos inscritos</b-badge>
                    <b-badge variant="danger" v-if="this.alunosDaTurma.length === 0">Não existem alunos inscritos</b-badge>
                    <p v-else>Selecione para remover da turma</p>
                    <b-form-checkbox-group
                            v-model="selectedParaRemover"
                            name="inscricao-turma-alunos"
                            stacked
                    >
                        <b-form-checkbox v-for="aluno in alunosDaTurma"
                                         :key="aluno.id"
                                         :value="aluno.id"
                        >{{ aluno.nome }}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <b-button v-if="this.alunosDaTurma.length !== 0 && selectedParaRemover.length !== 0" size="sm" @click="onRemover" variant="danger" title="Remover aluno da turma">
                    &laquo; Remover
                </b-button>
                <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isDesenv">Alunos para Remover: {{ selectedParaRemover }}</b-alert>

            </b-col>
        </b-row>


        <!--    </div>-->
    </div>
</template>

<script>
    import { mapGetters, mapState/*, mapActions*/ } from 'vuex';
    export default {

        name: 'TurmaTemUsuarioList',

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
            //pressupoe que já existe uma turma selecionada no componente pai
            this.$store.dispatch('usuarios/getAllProfessores','professor');
            this.$store.dispatch('usuarios/getAllAlunos','aluno');
            if(this.currentTurmaId) {
                this.$store.dispatch('turmastemusuarios/getAllAlunosDaTurma', this.currentTurmaId);
                this.$store.dispatch('turmastemusuarios/getAllAlunosHabilitadosParaTurma', this.currentTurmaId);
            }
            // window.console.log('CREATED - professores',this.professores);
            // window.console.log('CREATED - alunos',this.alunos);
            // window.console.log('CREATED - alunosMatriculados',this.alunosDaTurma);
        },

        data() {
            return {
                loading: true,
                showed: false,
                saveUpdateErrored: false,
                deleteErrored: false,

                //bootstrap-vue table


                //bootstrap-vue select
                // selectMode: 'single',
                selectedParaInscrever: [],
                selectedParaRemover: [],
            }
        },

        computed: {
            rows() {
                return this.usuarios.length
            },

            ...mapState({
                currentTurmaId: state => state.turmas.currentTurmaId,
                professores: state => state.usuarios.professores,
                alunos: state => state.usuarios.alunos,
                alunosDaTurma: state => state.turmastemusuarios.alunosDaTurma,
                alunosHabilitadosParaTurma: state => state.turmastemusuarios.alunosHabilitadosParaTurma,
            }),
            ...mapGetters({
            })
        },


        methods: {
            // ...mapActions({'refreshUsuarios': 'usuarios/getAllCategories'}),
            inicializar() {
                //para reinicializar variáveis se ação vinda de outro componente
                this.loading = true;
                // this.saveUpdateErrored = false;
                if(this.saveUpdateErrored){
                    this.showed = false;
                    // this.items = [];
                    // window.alert('Inicializanso show e saveUpdateErrored. Esvaziando itens.');
                    this.saveUpdateErrored = false;
                }
            },

            // onRowSelected(item) {
            //     this.selected = item[0];
            // },

            onInscrever() {
                for(var i=0; i<this.selectedParaInscrever.length; i++)
                    this.$store.dispatch('turmastemusuarios/submitTurmaTemUsuario', {"id_turma": this.currentTurmaId, "id_usuario": this.selectedParaInscrever[i]});
                this.selectedParaInscrever = [];
                // this.refreshAlunos();
            },

            onRemover() {
                for(var i=0; i<this.selectedParaRemover.length; i++)
                    this.$store.dispatch('turmastemusuarios/deleteTurmaTemUsuario', {"id_turma": this.currentTurmaId, "id_usuario": this.selectedParaRemover[i]});
                this.selectedParaRemover = [];
                // this.refreshAlunos();
            },

            // refreshAlunos(){
            //     // this.$store.dispatch('turmastemusuarios/getAllAlunosDaTurma', this.currentTurmaId);
            //     // this.$store.dispatch('turmastemusuarios/getAllAlunosHabilitadosParaTurma', this.currentTurmaId);
            // }
        },

        watch: {
            isItensRefreshedOutside: function() {
                this.inicializar();
                window.console.log('Data changed!', this.isItensRefreshedOutside);
            }
        }
    }

</script>

<style scoped>
    #listaInscricao {
        padding: 5px;
    }

    #listaAlunosInscritos {
        text-align: left;
    }

</style>