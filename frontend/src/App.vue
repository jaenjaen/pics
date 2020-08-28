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
@font-face {
  font-family: "Nanum Gothic";
  src: url("./assets/font/NanumGothic-Regular.ttf");
}
body {
  background: #f5f5f5 !important;
}
#app {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}
</style>
