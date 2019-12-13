<template>
    <div class="curso">
        <main>
            <b-row>
                <b-col lg="4">
                    <h4>Cadastro de Cursos</h4>
                    <curso-form
                    ></curso-form>
                </b-col>
                <b-col>
                    <h4>Lista de Cursos</h4>
                    <curso-list
                    ></curso-list>
                </b-col>
            </b-row>
        </main>
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