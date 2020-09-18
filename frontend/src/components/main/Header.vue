<template>
  <div class="navbar-fixed">
    <nav class="header_nav" :style="{width:wWidth}">
      <div class="header_container" :style="{width:wWidth}">
        <div>
          <a href>
            <img src="@/assets/img/util/backward.svg" id="backward" @click.prevent="moveBack" />
          </a>
        </div>
        <div>
          <a @click.prevent="toHome()">
            <img src="@/assets/img/header_bottom/pics_logo.svg" alt="pics" id="pics_logo" />
          </a>
        </div>
        <div>
          <a href="#" @click.prevent="moveToSearch(-1)">
            <img src="@/assets/img/header_bottom/search_icon.svg" id="search_icon" />
          </a>
        </div>
      </div>
    </nav>
    <Bottom />
  </div>
</template>

<script src="@/assets/js/main/header.js">
</script>
<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="@/assets/css/main/header.css">
</style>
