<template>
    <div class="container" id="searchStudio">
    <!-- 검색 부분 -->
    <div id="search">
      <span id="searchBorder">
        <input
          id="searchContent"
          name="searchContent"
          type="text"
          v-model="filters.searchContent"
          placeholder="나에게 딱 맞는 촬영공간 찾기    ||    '#' 을 앞에 붙이면 해시태그 검색 "
          v-on:keyup.enter="setFilter"
        />
      </span>
    </div>
    <!-- <router-link to="/customerlogin">로그인하기</router-link> -->
    <a @click.prevent="login">로그인하기</a>
    <a @click.prevent="logout">로그아웃하기</a>
    <!-- 필터 부분 -->
    <div class="row" id="filter">
      <!-- 필터 Collapse -->
      <div id="filterCol">
        <div>
          <div v-b-toggle.my-collapse class="collapsible-header" id="colHeader">
            <p>내가 원하는 조건으로 찾기</p>
          </div>
          <b-collapse id="my-collapse" v-model="visible">
            <div id="filterSpace">
              <div id="cateNdate">
                <!-- 카테고리 -->
                <div
                  class="input-field"
                  id="categoryFilter"
                  name="categoryFilter"
                >
                  <p id="cateWord">카테고리로 찾기</p>
                  <!-- <i class="material-icons" id="icon_filter">dashboard</i> -->
                  <select name="cataSelect" id="cataSelect" @change="setCategory" ref="cataSelect">
                    <option value="none">카테고리를 선택해주세요</option>
                    <option value="-1">전체</option>
                    <option value="1">카페</option>
                    <option value="2">스튜디오</option>
                    <option value="3">집</option>
                    <option value="4">사무실</option>
                    <option value="5">음식점</option>
                    <option value="6">루프탑</option>
                    <option value="7">펍</option>
                    <option value="8">학교</option>
                    <option value="9">기타</option>
                  </select>
                </div>
                <!-- 날짜 -->
                <div id="dateFilter" name="dateFilter">
                  <p>예약 날짜로 찾기</p>
                  <i class="material-icons" id="icon_filter"
                    >insert_invitation</i
                  >
                  <input type="date" v-model="filters.selectedDate" />
                  <span id="dateInit" @click="initFilter(1)">날짜 초기화</span>
                </div>
              </div>
              <hr />

              <!-- 주소 -->
              <div id="addrFilter" name="addrFilter">
                <p>주소로 찾기</p>
                <i class="material-icons" id="icon_filter">gps_fixed</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.addr1"
                  placeholder="도시명을 입력해주세요"
                />
                <span>시</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.addr2"
                  placeholder="구/면/읍 입력해주세요"
                />
                <span>구/면/읍</span>
              </div>
              <hr />

              <!-- 장소 규모 -->
              <div id="sizeFilter" name="sizeFilter">
                <p>공간 크기로 찾기</p>
                <i class="material-icons" id="icon_filter">location_city</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.minSize"
                  placeholder="최소면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span
                ><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.maxSize"
                  placeholder="최대면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span>
              </div>
              <hr />

              <!-- 인원수 -->
              <div id="capaFilter" name="capaFilter">
                <p>인원 규모로 찾기</p>
                <i class="material-icons" id="icon_filter">accessibility</i>
                <i class="material-icons" id="icon_capa1" @click="filters.capacity--"
                  >exposure_neg_1</i
                >
                <span>{{ filters.capacity }}명</span>
                <i class="material-icons" id="icon_capa2" @click="filters.capacity++"
                  >exposure_plus_1</i
                >
              </div>
              <hr />

              <!-- 가격 -->
              <div id="priceFilter" name="priceFilter">
                <p>시간당 가격으로 찾기</p>
                <i class="material-icons" id="icon_filter">attach_money</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.minUnitPrice"
                  placeholder="최소금액을 입력해주세요"
                />
                <span>원</span><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.maxUnitPrice"
                  placeholder="최대금액을 입력해주세요"
                />
                <span>원</span>
              </div>
              <div id="filterBtn">
                <!-- 초기화 버튼 -->
                <button
                  class="waves-effect waves-light btn-small"
                  id="initBtn"
                  @click="initFilter(2)"
                >
                  초기화
                </button>
                <!-- 적용 버튼 -->
                <button
                  class="waves-effect waves-light btn-small"
                  id="applyBtn"
                  @click="setFilter"
                >
                  적용
                </button>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
    <!-- 정렬하기 부분 -->
    <div id="order">
      <!-- 정렬하기 위한 select 태그 -->
      <select name="orderCon" id="orderCon" @change="setFilter" v-model="filters.orderCon">
        <option value="" disabled>정렬하기</option>
        <option value="1">인기순</option>
        <option value="2">가격순-내림차순</option>
        <option value="3">가격순-오름차순</option>
        <option value="4">평점순</option>
      </select>
    </div>
    <!-- 로딩 시 출력 부분 -->
    <div id="loading" v-if="loading"></div>
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList" v-else>
      <!-- 여기서 출력... 3개씩... 무한스크롤링 가즈아 -->
      <!-- 카드 형식 큰 틀 -->
      <div
        class="card horizontal col s12"
        id="studioInf"
        v-for="(studio, $index) in studios"
        v-bind:key="$index"
        ref="scrollContainer"
        @click="showStudioInfo(studio.stuId)"
      >
        <!-- 이미지 출력 부분 -->
        <div class="card-image" id="studioImg">
          <img
            :src="getImgUrl(studio.mainImg)"
            width="200em"
            height="210.14em"
          />
        </div>
        <!-- 업체 간단 요약 부분 -->
        <div class="card-content" id="studioContent">
          <div id="title">{{ studio.name }}</div>
          <div id="nameAddr">
            {{ studio.category.categoryName }} /
            {{ studio.studioFilter.address | category }}
          </div>
          <div id="desc">{{ studio.description | shortenDesc }}</div>
          <div id="info">
            {{ studio.studioFilter.unitPrice | currency }} 원/시간
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
            <span v-if="studio.countReview == 0">
              평가 없음
            </span>
            <span v-else> {{ studio.avgScore | demical }} 점 </span>
          </div>
        </div>
        <!-- 찜기능 부분 -->
        <div id="regBM">
          <img src="@/assets/img/util/fullheart.svg" width="20em" @click.capture="setBookMark(1,studio.stuId,$event)" v-if="studio.bookmark"/>
          <img src="@/assets/img/util/heart.svg" width="20em" @click.capture="setBookMark(0,studio.stuId,$event)" v-else/>
          <!-- <input type="hidden" :value="studio.stuId" v-model="stuId"/> -->
        </div>
      </div>
      <!-- 스크롤 내려서 더 검색할 때 동글뱅이 -->
      <div id="loading" v-if="doSearch">
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
  </div>
</template>

<script scoped src="@/assets/js/search/StudioList.js"></script>

<style scoped type="text/css" src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>
<style scoped src="@/assets/css/search/StudioList.css">