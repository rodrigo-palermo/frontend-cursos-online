<template>
    <div id="lista">

        <span v-if="loading"> </span>
        <span v-else><br></span>
<!--        <div v-if="showed && !saveUpdateErrored" class="overflow-auto">-->
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
                     :items="cursos"
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
        <b-alert class="admin-alert" show variant="danger" v-if="this.$store.getters.isAdmin">Linha selecionada: {{ selected }}</b-alert>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    // const url_foreign_1 = `${process.env.VUE_APP_API_URL}/categoria`;
    // const url_foreign_2 = `${process.env.VUE_APP_API_URL}/usuario`;
    export default {

        name: 'CursoList',

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
            if(this.$store.getters.isAdmin)
                this.$store.dispatch('cursos/getAllCursos');
            else if(this.$store.getters.isProf)
                this.$store.dispatch('cursos/getAllCursosDoProfessor', this.$store.getters.userId);
            this.$store.dispatch('categorias/getAllCategorias');
            this.$store.dispatch('usuarios/getAllUsuarios')
        },

        data() {
            return {
                loading: true,
                showed: false,
                saveUpdateErrored: false,
                deleteErrored: false,

                //bootstrap-vue table
                fields: [
                    //'id',
                    {key: 'nome', label: 'Curso'},
                    {key: 'usuario_criacao_nome', label: 'Professor'},
                    {key: 'categoria_nome', label: 'Categoria'},
                    {key: 'descricao', label: 'Descrição'},
                    // {key: 'dth_criacao', label: 'Criação'},
                    // 'imagem',
                    {key: 'acoes', label: 'Ações'},
                ],

                //bootstrap-vue pagination
                perPage: 5,
                currentPage: 1,

                //bootstrap-vue select
                selectMode: 'single',
                selected: {},

            }
        },

        // mounted() {
        //     return this.refresh();
        // },

        computed: {
            rows() {
                return this.cursos.length
            },

            ...mapState({
                cursos: state => state.cursos.all,
                // cursos: state => state.cursos.cursosDoProfessor,
                items_fk_1: state => state.categorias.all,
                items_fk_2: state => state.usuarios.all

            }),

            ...mapGetters({
                cursosFiltro: 'getCursos'
            })
        },

        methods: {
            // inicializar() {
            //     //para reinicializar variáveis se ação vinda de outro componente
            //     this.loading = true;
            //     // this.saveUpdateErrored = false;
            //     if(this.saveUpdateErrored){
            //         this.showed = false;
            //         this.items = [];
            //         // window.alert('Inicializando show e saveUpdateErrored. Esvaziando itens.');
            //         this.saveUpdateErrored = false;
            //     }
            // },

            // refresh: function() {
            //
            //     this.$axios.get(url_foreign_1).then(response => {
            //         this.items_fk_1 = response.data;
            //         window.console.log('Response fk 1',response);
            //     })
            //         .catch(error => {
            //             window.console.log(error);
            //             this.saveUpdateErrored = true;
            //         })
            //         .finally(() => this.loading = false,
            //             // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            //         );
            //     this.$axios.get(url_foreign_2).then(response => {
            //         this.items_fk_2 = response.data;
            //         window.console.log('Response fk 2',response);
            //     })
            //         .catch(error => {
            //             window.console.log(error);
            //             this.saveUpdateErrored = true;
            //         })
            //         .finally(() => this.loading = false,
            //             // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
            //         );
            //     this.showed = this.saveUpdateErrored === false;
            // },
            onRowSelected(item) {
                this.selected = item[0];
            },

            async onEdit() {
                this.$root.$emit('editar', this.selected);
                //window.scrollTo({top:0,left: 0,behavior: 'smooth'});
            },

            async onDelete() {
                this.$store.dispatch('cursos/deleteCurso', this.selected.id);
                window.console.log('Funcao deletar. Id enviado ao WS: ', this.selected.id)

            }
        },

        watch: {
            isItensRefreshedOutside: function() {
                // this.inicializar();
                // this.refresh();
                // this.refresh();
                window.console.log('Data changed!', this.isItensRefreshedOutside);
            }
        }
    }

</script>

<style scoped>

</style>