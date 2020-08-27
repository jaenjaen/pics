<template>
  <div>
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <a href="#">
            <img
              src="../assets/img/header_bottom/pics_logo.svg"
              alt="pics"
              class="brand-logo center"
              id="pics_logo"
            />
          </a>
          <a href="#" @click.prevent="moveToSearch">
            <img src="../assets/img/header_bottom/search_icon.svg" class="right" id="search_icon" />
          </a>
        </div>
      </nav>
    </div>
    <Bottom />
  </div>
</template>


<script>
import Bottom from "@/components/Bottom.vue";
export default {
  name: "bottom",
  components: {
    Bottom
  },
  methods :{
    moveToSearch() {
      this.$router.push("/studioSearch/");
    }
  }
};
</script>

<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped>
.navbar-fixed {
  line-height: 44px !important;
}

nav {
  background-color: white !important;
  height: 44px !important;
}
.nav-wrapper {
  width: 768px;
  margin: 0 auto !important;
}
img {
  margin-top: 13px !important;
}

#pics_logo {
  width: 60px;
}
#search_icon {
  width: 20px;
  margin-right: 25px;
}
</style>

<style scoped>
@media only screen and (min-width: 768px) {
  nav .navbar-fixed {
    height: 44px !important;
    line-height: 44px !important;
  }
}

@media only screen and (min-width: 300px) and (max-width: 767px) {
  nav .navbar-fixed {
    height: 44px !important;
    line-height: 44px !important;
  }
  .nav-wrapper {
    width: 100%;
    margin: 0 auto !important;
  }
}

@media only screen and (min-width: 601px) {
  .navbar-fixed {
    height: 44px !important;
  }
}

@media only screen and (max-width: 600px) {
  .navbar-fixed {
    height: 44px !important;
  }
}
</style>