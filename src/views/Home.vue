<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Welcome msg="Cursos Online"
             welcomeText="Diversas opções de cursos. Increva-se hoje mesmo!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  components: {
    Welcome: Welcome
  }
}
</script>
