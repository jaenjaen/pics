<template>
  <div class="mainthird">
    <div class="word">컨셉별 촬영장소 찾기</div>
    <div class="img_container">
      <div class="jb-wrap" @click.prevent="moveToSearch('컨셉.조명')">
        <div class="jb-image">
          <img src="@/assets/img/studio/1_조명.jpg" alt />
        </div>
        <div class="jb-text">
          <p>조명 맛집</p>
        </div>
      </div>
      <div class="jb-wrap" @click.prevent="moveToSearch('컨셉.vlog')">
        <div class="jb-image">
          <img src="@/assets/img/studio/1_브이로그.jpg" alt />
        </div>
        <div class="jb-text">
          <p>브이로그</p>
          <p>감성</p>
        </div>
      </div>
      <div class="jb-wrap" @click.prevent="moveToSearch('컨셉.욕실')">
        <div class="jb-image">
          <img src="@/assets/img/studio/1_욕실.jpg" alt />
        </div>
        <div class="jb-text">
          <p>감성적인</p>
          <P>욕실</P>
        </div>
      </div>
      <div class="jb-wrap" @click.prevent="moveToSearch('컨셉.클래식')">
        <div class="jb-image">
          <img src="@/assets/img/studio/1_클래식.jpg" alt />
        </div>
        <div class="jb-text">
          <p>클래식</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/main/mainthird.js"></script>
<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="material-design-icons/iconfont/material-icons.css">
</style>
<style scoped src="@/assets/css/main/mainthird.css">
</style>
