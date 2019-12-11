<template>
    <div class="curso">
        <b-container>
            <b-row>
                <b-col>
                    <h3>Curso</h3>
                    <curso-form
                    ></curso-form>
                </b-col>
                <b-col>
                    <h3>Lista</h3>
                    <curso-list
                    ></curso-list>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import CursoForm from "../components/curso/CursoForm";
    import CursoList from "../components/curso/CursoList";

    export default {
        name: "Curso",
        components: {CursoForm, CursoList},
        data() {
            return {
                isItensRefreshed: false,
                editingItemPai: {}
            }
        }
    }
</script>

<style scoped>

</style>