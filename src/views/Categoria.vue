<template>
    <div class="categoria">
        <main>
            <b-row>
                <b-col lg="4">
                    <h4>Categorias de curso</h4>
                    <categoria-form
                    ></categoria-form>
                </b-col>
                <b-col>
                    <h4>Lista</h4>
                    <categoria-list
                    ></categoria-list>
                </b-col>
            </b-row>
        </main>
    </div>
</template>

<script>
    import CategoriaForm from "../components/categoria/CategoriaForm";
    import CategoriaList from "../components/categoria/CategoriaList";

    export default {
        name: "Categoria",
        components: {CategoriaForm, CategoriaList},
        data() {
            return {
                // isItensRefreshed: false,
                // editingItemPai: {}
            }
        }
    }
</script>

<style scoped>

</style>