<template>
  <div class="container" id="searchStudio">
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList">
      <!-- 여기서 출력... 3개씩... 무한스크롤링 가즈아 -->
      <!-- 카드 형식 큰 틀 -->
      <div
        class="card horizontal col s12"
        id="studioInf"
        v-for="(studio, index) in studios"
        v-bind:key="index"
        ref="scrollContainer"
        @click="showStudioInfo(studio.stuId)"
      >
        <!-- 이미지 출력 부분 -->
        <div class="card-image" id="studioImg">
          <img :src="getImgUrl(studio.mainImg)" width="200em" height="210.14em" />
        </div>
        <!-- 업체 간단 요약 부분 -->
        <div class="card-content" id="studioContent">
          <div class="container_name">
            <div id="title">{{ studio.name }}</div>
            <!-- 찜기능 부분 : 로그인을 하지 않으면 안 보이게-->
            <div id="regBM" v-if="filters.session != -1">
              <!-- 이미 찜했을 때 -->
              <img
                src="@/assets/img/util/fullheart.svg"
                width="20em"
                height="24em"
                @click.capture="setBookMark(index, studio.stuId,$event)"  
                v-if="studio.bookmark"
              />
              <!-- 찜하지 않았을 때 -->
              <img
                src="@/assets/img/util/heart.svg"
                width="20em"
                height="24em"
                @click.capture="setBookMark(index, studio.stuId,$event)"
                v-else
              />
              <!-- <input type="hidden" :value="studio.stuId" v-model="stuId"/> -->
            </div>
          </div>
          <div id="nameAddr">
            {{ studio.category.categoryName }} /
            {{ studio.studioFilter.address | category }}
          </div>
          <div id="desc">{{ studio.description }}</div>
          <div id="info">
            {{ studio.studioFilter.unitPrice | currency }}
            <span>원/시간</span>
          </div>
          <!-- 평점 및 리뷰 출력 부분 -->
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
            <span v-else>{{ studio.avgScore | demical }} 점</span>
          </div>
        </div>
      </div>
      <!-- 스크롤 내려서 더 검색할 때 동글뱅이 -->
      <div id="loading-after" v-if="doSearch">
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 로딩 시 출력 부분 -->
    <div id="loading" v-if="loading">
      <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    </div>
    <!-- 찜등록/제거 시 팝업창 -->
    <modal name="delBook" adaptive="adaptive" resizable="resizable" width="20%" height="30%" :maxWidth=768>
      <div id="unaBook">
        <p>찜목록에서 제거됐습니다</p>
        <button class="btn-small" @click="closePop">확인</button>
      </div>
    </modal>
    <modal name="regBook" adaptive="adaptive" resizable="resizable" width="20%" height="30%" :maxWidth=768>
      <div id="regBook">
        <p>찜목록에 등록됐습니다</p>
        <button class="btn-small" @click="closePop">확인</button>
      </div>
    </modal>
  </div>
</template>

<script scoped src="@/assets/js/search/StudioList.js"></script>

<style scoped type="text/css" src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>
<style scoped src="@/assets/css/search/StudioList.css">