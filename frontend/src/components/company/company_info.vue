<template>
  <div class="info_container">
    <div class="base_info">
      <div class="logoImg_div">
        <img class="logoImg" :src="com_imgUrl(company.logoImg)" />
      </div>
      <div class="com_name_description">
        <p class="com_name">{{company.name}}</p>
        <p class="com_description">{{company.description}}</p>
      </div>
    </div>
    <div class="host_info">
      <p class="word">호스트 공간</p>
      <div class="carousel">
        <carousel :items="3" :margin="5" :loop="true" :center="true" :nav="false" :dots="false">
          <a href v-for="(studio,index) in company.studioList" :key="index">
            <div class="card">
              <div class="card-image">
                <img :src="getImgUrl(studio.mainImg)" />
              </div>
              <div class="card-content">
                <div class="name">{{studio.name | forSpace}}</div>
                <div class="category">
                  <div>
                    <p>{{ studio.categoryId | category}}&nbsp;| &nbsp;{{studio.studioFilter.address | city}}</p>
                    <div>
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
        </carousel>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/company/company_info.js"></script>

<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>
<style scoped src="@/assets/css/company/company_info.css">
</style>
