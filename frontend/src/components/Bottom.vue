<template>
  <div class="bottom">
    <div class="container_bottom">
      <div class="item_bottom">
        <a href>
          <img src="../assets/img/header_bottom/marking.svg" alt />
          <p>찜</p>
        </a>
      </div>
      <div class="item_bottom">
        <a href>
          <img src="../assets/img/header_bottom/logo_symbol.svg" alt />
          <p>홈</p>
        </a>
      </div>
      <div class="item_bottom">
        <a href>
          <img src="../assets/img/header_bottom/mypage.svg" alt />
          <p>MY PICS</p>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
</script>


<style scoped src="../assets/css/remove_css.css" />

<style scoped>
.bottom {
  position: fixed;
  z-index: 9999;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  text-align: center;
  height: 51px;
}

.container_bottom {
  width: 768px;
  margin: 0 auto;
  padding: 5px 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

a {
  font-size: 9.52px;
  color: black;
  text-decoration: none;
}

img {
  width: 20px;
  /* height: 30px; */
}
</style>

<style scoped>
@media only screen and (max-width: 768px) {
  .container_bottom {
    width: 100%;
  }
}
</style>