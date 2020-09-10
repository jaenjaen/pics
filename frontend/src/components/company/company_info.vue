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
        <carousel
          :items="3"
          :margin="5"
          :loop="true"
          :autoplay="true"
          :center="true"
          :nav="false"
          :dots="false"
        >
          <a href v-for="(studio,index) in company.studioList" :key="index">
            <div class="card">
              <div class="card-image">
                <img :src="getImgUrl(studio.mainImg)" />
              </div>
              <div class="card-content">
                <div class="name">{{studio.name}}</div>
                <div class="category">
                  <p>{{ studio.categoryId | category}}/</p>
                  <p>{{studio.studioFilter.address | city}}</p>
                  <p>{{ studio.avgScore}}</p>
                  <p>{{studio.studioFilter.unitPrice |currency }} 원</p>
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
<style scoped src="@/assets/css/company/company_info.css">
</style>
