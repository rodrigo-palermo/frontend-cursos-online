<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <h1>{{ title }}</h1>
    <b-badge variant="danger" v-if="subtitle">{{ subtitle }}</b-badge>
    <Welcome welcomeText="Diversas opções de cursos. Increva-se hoje mesmo!"/>
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
