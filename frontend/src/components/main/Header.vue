<template>
  <div>
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <a href>
            <img src="@/assets/img/util/backward.svg" alt id="backward" @click.prevent="moveBack" />
          </a>
          <a href="http://localhost:9999">
            <img
              src="@/assets/img/header_bottom/pics_logo.svg"
              alt="pics"
              class="brand-logo center"
              id="pics_logo"
            />
          </a>
          <a href="#" @click.prevent="moveToSearch(-1)">
            <img src="@/assets/img/header_bottom/search_icon.svg" class="right" id="search_icon" />
          </a>
        </div>
      </nav>
    </div>
    <Bottom />
  </div>
</template>

<script src="@/assets/js/main/header.js">
</script>
<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="@/assets/css/main/header.css">
</style>
