<template>
    <div class="categoria">
        <b-container>
            <b-row>
                <b-col>
                    <h3>Categoria de curso</h3>
                    <categoria-form
                    ></categoria-form>
                </b-col>
                <b-col>
                    <h3>Lista</h3>
                    <categoria-list
                    ></categoria-list>
                </b-col>
            </b-row>
        </b-container>
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