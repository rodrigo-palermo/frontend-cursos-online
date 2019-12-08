<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <h1>{{ title }}</h1>
    <b-badge variant="danger" v-if="subtitle">{{ subtitle }}</b-badge>
    <Welcome welcomeText="Diversas opções de cursos. Increva-se hoje mesmo!"/>
<b-container>
    <b-card-group deck>
      <b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/79/ad/79ad01cf-a0f0-47b5-8129-7f975daa2911.jpg"
              img-alt="Gestão e Negócios"
              text-variant="white"
              title="Gestão e Negócios"
      >
      </b-card>

      <b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>
<b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>
  </b-card-group>
    <b-card-group deck>

    <b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>
<b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card><b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>
    </b-card-group>
    <b-card-group deck>
    <b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card><b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card><b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>
    </b-card-group>
    <b-card-group deck><b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card><b-card
              overlay
              img-src="https://ugc.futurelearn.com/uploads/images/05/f9/05f9ea30-473b-43ed-adcb-e2ed3b2457ab.jpg"
              img-alt="Ciências, Engenharia e Matemática"
              text-variant="white"
              title="Ciências, Engenharia e Matemática"
      ></b-card>



    </b-card-group>
</b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  components: {
    Welcome: Welcome
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      subtitle: process.env.VUE_APP_ENV_SUBTITLE
    }
  }
}


</script>
