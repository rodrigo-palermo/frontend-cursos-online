<template>
  <div id="app">
    <HeaderPage></HeaderPage>
    <router-view/>
    <FooterPage></FooterPage>
  </div>
</template>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #0075b5;*/
/*}*/
@import "assets/main.css";
</style>
<script>
  import FooterPage from "./components/FooterPage";
  import HeaderPage from "./components/HeaderPage";
  export default {
    components: {HeaderPage, FooterPage}
  }
</script>