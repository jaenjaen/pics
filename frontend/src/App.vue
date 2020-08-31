<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/reservation">Reservation</router-link> |
      <router-link to="/registerStudio">registerStudio</router-link> | 
      <router-link to="/StudioInfo">StudioInfo</router-link>|  
      <router-link to="/customerlogin">login</router-link> | 
      <router-link to="/studioSearch">searchStudio</router-link> |
      <!-- <router-link to="/Map">Map</router-link> | -->
      <Header />
    </div>

    <router-view />
  </div>
</template>

// <script>
import Header from "@/components/Header.vue";

export default {
  name: "pics-header",
  components: {
    Header
  }
};
</script>

<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
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
