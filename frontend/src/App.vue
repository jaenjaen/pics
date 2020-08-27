<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "pics-header",
  components: {
    Header
  }
};
</script>

<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style>
body {
  background-color: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}
</style>
