<template>
  <div class="container" id="searchStudio">
    <!-- 검색 부분 -->
    <div id="search">
      <span id="searchBorder">
        <input
          id="searchContent"
          name="searchContent"
          type="text"
          v-model="searchContent"
          placeholder="나에게 딱 맞는 촬영공간 찾기    ||    '#' 을 앞에 붙이면 해시태그 검색 "
          v-on:keyup.enter="setFilter"
        />
      </span>
    </div>
    <!-- 필터 부분 -->
    <div class="row" id="filter">
      <!-- 필터 Collapse -->
      <div id="filterCol">
        <div>
          <div v-b-toggle.my-collapse class="collapsible-header" id="colHeader">
            <p>내가 원하는 조건으로 찾기</p>
          </div>
          <b-collapse id="my-collapse">
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
                  <select
                    name="cataSelect"
                    id="cataSelect"
                    @change="setCategory"
                    ref="cataSelect"
                  >
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
                  <input type="date" v-model="selectedDate" />
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
                  v-model="addr1"
                  placeholder="도시명을 입력해주세요"
                />
                <span>시</span>
                <input
                  type="text"
                  value=""
                  v-model="addr2"
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
                  v-model="minSize"
                  placeholder="최소면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span
                ><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="maxSize"
                  placeholder="최대면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span>
              </div>
              <hr />

              <!-- 인원수 -->
              <div id="capaFilter" name="capaFilter">
                <p>인원 규모로 찾기</p>
                <i class="material-icons" id="icon_filter">accessibility</i>
                <i class="material-icons" id="icon_capa1" @click="capacity--"
                  >exposure_neg_1</i
                >
                <span>{{ capacity }}명</span>
                <i class="material-icons" id="icon_capa2" @click="capacity++"
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
                  v-model="minUnitPrice"
                  placeholder="최소금액을 입력해주세요"
                />
                <span>원</span><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="maxUnitPrice"
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
      <select name="orderCon" id="orderCon" @change="setFilter" v-model="order">
        <option disabled value="">정렬하기</option>
        <option value="1">인기순</option>
        <option value="2">가격순-내림차순</option>
        <option value="3">가격순-오름차순</option>
        <option value="4">평점순</option>
      </select>
    </div>
    <!-- 로딩 시 출력 부분 -->
    <div v-if="loading">
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
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList" v-else>
      <!-- 여기서 출력... 3개씩... 무한스크롤링 가즈아 -->
      <!-- 카드 형식 큰 틀 -->
      <div
        class="card horizontal col s12"
        id="studioInf"
        v-for="(studio, $index) in studios"
        v-bind:key="$index"
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
          <button
            class="btn-small"
            :value="studio.stuId"
            @click="setBookMark($event)"
          >
            찜
          </button>
          <input type="hidden" v-model="session" ref="session" />
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script type="text/javascript" scoped src="@/assets/js/StudioSearch.js"></script>

<style scoped type="text/css" src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>

<style scoped src="vue-material/dist/theme/default.css"></style>
<style scoped src="@/assets/css/StudioSearch.css">

/* <style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic");

#searchStudio {
  width: 768px;
  margin: auto;
  font-family: "Nanum Gothic", sans-serif;
}

#search {
  margin-top: 1em;
  margin-bottom: 0.5em;
}
#searchBorder {
  width: 90%;
  padding: 1.3em 0.2em 1.1em 0.2em;
  border: 1px solid #33a3dc;
  border-radius: 1.2em;
  background: linear-gradient(45deg, #33a3dc, #034ea2);
}

#searchContent {
  /* box-sizing: border-box; */
  /* width: 90%;
  height: 3.2em;
  padding-left: 2em;
  background-color: white !important;
  border-radius: 1em;
  cursor: pointer;
}

#searchContent::placeholder {
  color: #4e83be;
}

#filterResult {
  margin-left: 1.8em;
  text-align: left;
  vertical-align: middle;
}

#filterSpace>input[type=text]{
  height: 2rem;}

#filterResult > span {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.5em;
  background-color: #fff9c4;
  border: 1px solid #f2f2f2;
  border-radius: 1em;
  color: #737373;
  vertical-align: middle;
  font-size: 0.9em;
}

#filterResult span i {
  vertical-align: middle;
  font-size: 1rem;
  cursor: pointer;
}

#categoryBtn {
  margin-top: 1%;
  margin-left: 0.5em;
  display: block;
}

#categoryBtn > button {
  margin-right: 0.51em !important;
}

.btn-small {
  height: 32.4px;
  line-height: 32.4px;
  font-size: 12px !important;
  background: linear-gradient(135deg, #33a3dc, #034ea2) !important;
}

#filterCol {
  width: 100%;
}

#filterCol #colHeader{
  height: 3em !important;
  padding-top: 0 !important;
}

#filterSpace {
  text-align: left;
  padding-top: 0;
  padding-bottom: 0.3em;
}

#filterCol p,
#filterSpace p {
  font-size: 0.9em;
  font-weight: bold;
}

#filterSpace input[type="date"] {
  width: 20%;
  height: 1.9em;
  background-color: white;
  border-radius: 0.3em;
  font-family: "Nanum Gothic", sans-serif;
  font-size: 0.9em;
  color: #737373;
  text-align: center;
}

#icon_filter {
  margin-left: 0;
  margin-right: 0.7em;
  font-size: 2rem;
  color: #3571b5;
  vertical-align: middle;
}

#filterSpace input[type="text"] {
  width: 24%;
  text-align: center;
}

#addrFilter span,
#sizeFilter span,
#priceFilter span,
#capaFilter span {
  margin-right: 1em;
  font-weight: bold;
  font-size: 0.9em;
}

#dateInit {
  margin-left:1em;
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
}


#filterSpace input[type="text"] {
  width: 30%;
  height: 1.8em;
  margin-right: 0.5em;
  background-color: white;
  border-radius: 0.3em;
}

#filterSpace input[type="text"]::placeholder {
  color: #737373;
  text-align: center;
  font-size: 0.9em;
}

#capaFilter #icon_capa1,
#icon_capa2 {
  width: 6.2%;
  margin-right: 0.5em;
  background-color: white;
  border-radius: 1em;
  vertical-align: middle;
  cursor: pointer;
  font-size: 1.4rem;
  text-align: center;
}

#capaFilter span {
  margin-right: 1em;
  text-align: center;
  font-size: 1em;
}

#filterBtn {
  margin-top: 0.5em;
}

#filterBtn #initBtn {
  margin-left: 81.5%;
}

#filterBtn #applyBtn {
  margin-left: 0.5em;
}

#studioInf {
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  cursor: pointer;
}

#studioInf p {
  text-align: left;
  font-size: 0.8em;
}

#studioInf #studioImg {
  width: 100% !important;
}

.card.horizontal .card-image img {
  width: 100% !important;
}  */

</style>
