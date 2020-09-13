<template>
  <div class="whish_container">
    <p class="title">찜 리스트 (*^ω^*)</p>
    <a href v-for="(studio,index) in studios" :key="index">
      <div class="card">
        <div class="card-image">
          <img :src="getImgUrl(studio.mainImg)" />
        </div>
        <div class="card-content">
          <div>
            <div class="name">
              <h5>{{studio.name | forSpace}}</h5>
              <img
                id="fullheart"
                src="@/assets/img/util/fullheart.svg"
                @click.prevent="removeBookmark()"
                v-show="!heartShow"
              />
              <img
                id="heart"
                src="@/assets/img/util/heart.svg"
                @click.prevent="putBookmark()"
                v-show="heartShow"
              />
            </div>
          </div>

          <div class="category">
            <div>
              <p>{{ studio.categoryId | category}}&nbsp;| &nbsp;{{studio.studioFilter.address | city}}</p>
              <div id="price">
                <span class="price">{{studio.studioFilter.unitPrice |currency }}</span>
                <span>원</span>
              </div>
            </div>
            <div id="review">
              <!-- 별점 부분 -->
              <span id="star">
                <span v-if="studio.avgScore > 0 && studio.avgScore < 1">
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 1">
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 1 && studio.avgScore < 2">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 2">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 2 && studio.avgScore < 3">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 3">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 3 && studio.avgScore < 4">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 4">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 4 && studio.avgScore < 5">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 5">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
              </span>
              <span v-if="studio.countReview == 0">평가 없음</span>
              <!-- <span v-else>{{ studio.avgScore | demical }} 점</span> -->
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script scoped src="@/assets/js/mypage/wishiList.js"></script>
<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="material-design-icons/iconfont/material-icons.css">
</style>
<style scoped src="@/assets/css/mypage/wishiList.css">
</style>