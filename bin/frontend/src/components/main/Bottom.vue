<template>
  <div class="bottom" :style="{width:wWidth}">
    <div class="container_bottom" :style="{width:wWidth}">
      <div class="item_bottom" @click.prevent="toWishiList()">
        <img src="@/assets/img/header_bottom/marking.svg" alt />
        <p>찜</p>
      </div>
      <div class="item_bottom" @click.prevent="toHome()">
        <img src="@/assets/img/header_bottom/logo_symbol.svg" alt />
        <p>홈</p>
      </div>
      <div class="item_bottom" @click.prevent="toMyPage()">
        <img src="@/assets/img/header_bottom/mypage.svg" alt />
        <p>MY</p>
      </div>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/main/bottom.js"></script>

<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="@/assets/css/main/bottom.css">
</style>
