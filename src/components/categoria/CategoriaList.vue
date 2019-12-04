<template>
    <div id="lista">

        <span v-if="loading"> Carregando dados...</span>
        <span v-else><br></span>
        <div v-if="showed && !saveUpdateErrored" class="overflow-auto">
            <b-pagination v-model="currentPage"
                          :total-rows="rows"
                          :per-page="perPage"
                          aria-controls="itemsList"
                          size="sm"
            >
            </b-pagination>

<!--            <p class="mt-3">Página atual: {{ currentPage }}</p>-->

            <b-table id="itemsList" striped hover
                     :fields="fields"
                     :items="items"
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
    const url = `${process.env.VUE_APP_API_URL}/categoria`;
    export default {

        name: 'CategoriaList',

        components:{},

        // props: ['items'],
        props: {
            isItensRefreshedOutside: {
                type: Boolean
            },
            editingItem: {
                type: Object
            }
        },

        data() {
            return {
                loading: true,
                showed: false,
                saveUpdateErrored: false,
                deleteErrored: false,

                //bootstrap-vue table
                items: [],
                fields: [
                    //'id',
                    'nome',
                    {key: 'descricao', label: 'Descrição'},
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

        mounted() {
            return this.refresh();
        },

        computed: {
            rows() {
                return this.items.length
            }
        },

        methods: {
            inicializar() {
                //para reinicializar variáveis se ação vinda de outro componente
                this.loading = true;
                // this.saveUpdateErrored = false;
                if(this.saveUpdateErrored){
                    this.showed = false;
                    this.items = [];
                    // window.alert('Inicializanso show e saveUpdateErrored. Esvaziando itens.');
                    this.saveUpdateErrored = false;
                }
            },

            refresh: function() {
                this.$axios.get(url).then(response => {
                    this.items = response.data;
                    window.console.log('Response',response);
                })
                    .catch(error => {
                        window.console.log(error);
                        this.saveUpdateErrored = true;
                    })
                    .finally(() => this.loading = false,
                        // (this.saveUpdateErrored === true)?(this.showed = false):(this.showed = true)
                    );
                this.showed = this.saveUpdateErrored === false;
            },
            onRowSelected(item) {
                this.selected = item[0];
            },

            onEdit() {
                //this.editingItem = this.selected;
                //window.console.log('Enviado item para editar: ', this.editingItem);
                this.$root.$emit('editar', this.selected);
            },

            onDelete() {
                let id = this.selected.id;
                this.$axios
                    .delete(url+'/'+id)
                    .then(
                        window.console.log('Deletando item ',id)
                    ).catch(error => {
                    window.console.log(error);
                    this.deleteErrored = true;
                    })
                    .finally(() => this.refresh());

                    if(!this.deleteErrored){
                        window.console.log('Item deletado.')
                    }
            }
        },

        watch: {
            isItensRefreshedOutside: function() {
                this.inicializar();
                this.refresh();
                this.refresh();
                window.console.log('Data changed!', this.isItensRefreshedOutside);
            }
        }
    }

</script>

<style scoped>

</style>