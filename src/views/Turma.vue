<template>
    <div class="turma">
        <main>
            <b-row>
                <b-col lg="3">
                    <h4>Cadastro de Turmas</h4>
                    <p>Selecione o curso para criar/exibir turmas</p>
                    <turma-form
                    ></turma-form>
                </b-col>
                <b-col>
                    <h4>Turmas</h4>
                    <p>Selecione uma turma para editar ou inscrever/remover alunos</p>
                    <turma-list
                    ></turma-list>
                </b-col>
            </b-row>
        </main>
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