<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <h1>{{ title }}</h1>
    <b-badge variant="danger" v-if="subtitle">{{ subtitle }}</b-badge>
    <Welcome welcomeText="Diversas opções de cursos. Increva-se hoje mesmo!"/>
<b-container>
    <b-card-group deck>
      <b-card v-for="curso in cursos"
              :key="curso.id"

              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/79/ad/79ad01cf-a0f0-47b5-8129-7f975daa2911.jpg"
              :img-alt="curso.nome"
              text-variant="white"
              :title="curso.nome"
              class="mb-3"

      >

          <div>
              <b-button @click="mostrarDescricao(curso.id)" variant="info" size="sm">Detalhes</b-button>
              <b-button @click="inscreverCurso(curso.id)" variant="primary" size="sm">Increver-se</b-button>
          </div>

      </b-card>
<!--      <b-card-->
<!--              overlay-->
<!--              img-src="https://ugc.futurelearn.com/uploads/images/79/ad/79ad01cf-a0f0-47b5-8129-7f975daa2911.jpg"-->
<!--              img-alt="Gestão e Negócios"-->
<!--              text-variant="white"-->
<!--              title="Gestão e Negócios"-->
<!--      >-->
<!--      </b-card>-->

<!--      <b-card-->
<!--              overlay-->
<!--              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"-->
<!--              img-alt="Ciências, Engenharia e Matemática"-->
<!--              text-variant="white"-->
<!--              title="Ciências, Engenharia e Matemática"-->
<!--      ></b-card>-->


    </b-card-group>
</b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'home',
  components: {
    Welcome: Welcome
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      subtitle: process.env.VUE_APP_ENV_SUBTITLE,


    }
  },
    created() {
        this.$store.dispatch('cursos/getAllCursos');
    },

    computed: {
        rows() {
            return this.cursos.length
        },

        ...mapState({
            cursos: state => state.cursos.all,
            // items_fk_1: state => state.categorias.all,
            // items_fk_2: state => state.usuarios.all

        }),

        ...mapGetters({
            cursosFiltro: 'getCursos'
        })
    },

    methods: {
      selecionarCurso(cursoId) {
          window.alert('Cursoid= '+ cursoId);
      },

        mostrarDescricao(cursoId) {
            window.alert('Detalhes ' + cursoId);
      },

        inscreverCurso(cursoId) {
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isAluno) {
                window.alert('Faça login ou crie uma conta Aluno.');
            } else {
                window.console.log('Curso escolhido id: ',cursoId);
                window.console.log('Aluno id: ',this.$store.getters.userId);
            }
      },
    }
}


</script>
