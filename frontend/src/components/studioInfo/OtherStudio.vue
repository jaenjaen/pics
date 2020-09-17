<template>
  <div class="mainsecond_container">
    <div class="word_container">
      <div class="word_item">
        <h5>유사한 스튜디오 보기</h5>
      </div>
      <div class="word_item">
      </div>
    </div>
    <!-- 캐라셀 -->
    <div class="mainsecond_carousel">
        <carousel
          v-if="studio_infos && studio_infos.length"
          v-bind:items="num"
          :margin="5"
          :loop="true"
          :nav="false"
        >
        <a href v-for="(studio,index) in studio_infos" :key="index">
          <div class="row">
            <div class="card" @click.prevent="moveToComInfo(studio.stu_id)">
              <div class="card-image">
                <img :src="imgUrl(studio.main_img)" />
                <!-- <img :src="`@/assets/img/studio/${studio.main_img}`" /> -->
              </div>
              <div class="card-content">
                <div class="name">{{studio.name|substring}}</div>
                <div class="category">
                  {{ studio.category_name }}/
                  {{studio.address | category}}
                </div>
                <div class="price">
                  {{ studio.unit_price | currency }}
                  <span>원/시간</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </carousel>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/studioInfo/OtherStudio.js"></script>
<style scoped src="../../assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="material-design-icons/iconfont/material-icons.css">
</style>
<style scoped src="@/assets/css/main/mainsecond.css">
</style>
