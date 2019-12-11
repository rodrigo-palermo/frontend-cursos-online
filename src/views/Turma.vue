<template>
    <div class="turma">
        <b-container>
            <b-row>
                <b-col>
                    <h3>Turma</h3>
                    <p>Selecione o curso para criar ou ver as turmas existentes.</p>
                    <turma-form
                    ></turma-form>
                </b-col>
                <b-col>
                    <h3></h3>
                    <turma-list
                    ></turma-list>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TurmaForm from "../components/turma/TurmaForm";
    import TurmaList from "../components/turma/TurmaList";

    export default {
        name: "Turma",
        components: {TurmaForm, TurmaList},
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