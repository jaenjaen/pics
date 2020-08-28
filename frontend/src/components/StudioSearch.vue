<template>
  <div class="container" id="searchStudio">
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
    <div class="row" id="filter">
      <!-- 필터 Collapse -->
      <div id="filterCol">
        <ul class="collapsible" ref="collapsible">
          <li>
            <div class="collapsible-header" id="colHeader">
              <p>내가 원하는 조건으로 찾기</p>
            </div>

            <div class="collapsible-body" id="filterSpace">
              <div id='cateNdate'>
                <!-- 카테고리 -->
                <div class='input-field' id="categoryFilter" name="categoryFilter">
                  <div id="cateWord">카테고리로 찾기</div>
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
          </li>
        </ul>
      </div>
    </div>
    <span id="searchTop"></span>
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
    <div v-if="loading">
      Loading...
    </div>
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList" v-else>
      <!-- 여기서 출력... 3개씩... 무한스크롤링 가즈아 -->
      <div
        class="card horizontal col s12"
        id="studioInf"
        v-for="studio in studios"
        v-bind:key="studio.stuId"
        @click="showStudioInfo(studio.stuId)"
      >
        <div class="card-image" id="studioImg">
          <img
            :src="getImgUrl(studio.mainImg)"
            width="200em"
            height="210.14em"
          />
        </div>
        <div class="card-content" id='studioContent'>
          <div id="title">{{ studio.name }}</div>
          <div id="nameDesc">
            {{ studio.category.categoryName }} /
            {{ studio.studioFilter.address | category }}
          </div>
          <div>{{ studio.description }}</div>
          <div>{{ studio.studioFilter.unitPrice | currency }} 원/시간</div>
          <div>
            {{ studio.avgScore | demical }} 점
            <span v-for="avgScore in studio.avgScore" :key="avgScore">
              <i class="material-icons" id="icon_filter">star</i>{{avgScore}}
            </span>
          </div>
        </div>
        <div>♡</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#studioInf {
  margin-top: 1em;
  margin-bottom: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  /* border-radius: 1em; */
  cursor: pointer;
}

#studioContent {
  width: 40%;
  padding-top: 1em;
  text-align: left;
}

#studioInf p {
  text-align: left;
  font-size: 0.8em;
}

#studioInf #studioImg {
  width: 100% !important;
  border-radius: 1em;
}

#studioContent #title {
  margin-bottom: 0.1em;
  font-weight: bold;
}

#studioContent #nameDesc {
  font-size: 0.8em;
  margin-bottom: 1em;
}
</style>

<script scoped>
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// 카테고리 변한을 위한 리스트
// Vue 시작
export default {
  name: "studio-list",
  data() {
    return {
      // Axios 전체 리스트 변수
      studios: [],

      // Axios 필터변수
      categoryId: "",
      weekDate: "",
      selectedDate: "",
      addr1: "",
      addr2: "",
      minSize: "",
      maxSize: "",
      minUnitPrice: "",
      maxUnitPrice: "",
      capacity: 0,
      searchContent: "",
      searchTag: "",
      order: "",

      //별점
      score : 0,

      // 기본 변수
      loading: true,
      errored: false
    };
  },
  mounted() {
    // 페이지 오자마자 전체 리스트 뿌리기
    this.searchAllStudios();
    M.AutoInit();
  },
  filters: {
    // 돈에 , 붙여주는 필터
    currency: function(value) {
      let num = new Number(value);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    },
    demical: function(value) {
      let num = new Number(value);
      return num.toFixed(1);
    },
    category: function(value) {
      let str = value.split("시");
      return str[0];
    }
  },
  methods: {
    // Studio 전체 불러오기
    searchAllStudios() {
      axios
        .get("http://127.0.0.1:7777/studio/search")
        .then(response => {
          this.studios = response.data;
          this.categoryId = "";
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    setCategory() {
      this.categoryId = this.$refs.cataSelect.value;
    },
    // 필터 값 넣고 검색
    setFilter() {
      // 날짜가 입력이 되면 요일 리턴
      if (this.selectedDate.length > 0) {
        this.weekDate = week[new Date(this.selectedDate).getDay()];
      }
      // #을 입력하면 해시태그 검색으로 전환
      if (this.searchContent.indexOf("#") == 0) {
        this.searchTag = this.searchContent;
        this.searchContent = "";
      }
      // 필터 객체
      let filters = {
        categoryId: this.categoryId,
        weekDate: this.weekDate,
        selectedDate: this.selectedDate,
        address1: this.addr1,
        address2: this.addr2,
        minSize: this.minSize,
        maxSize: this.maxSize,
        minUnitPrice: this.minUnitPrice,
        maxUnitPrice: this.maxUnitPrice,
        capacity: this.capacity,
        searchContent: this.searchContent,
        searchTag: this.searchTag,
        orderCon: this.order
      };
      //   alert(filters);
      this.search(filters);
    },
    // 검색 메소드
    search(filters) {
      axios
        .post("http://127.0.0.1:7777/studio/search/filter", filters)
        .then(response => {
          //   alert(response.data[0].stuId);
          this.studios = response.data;
          this.searchContent = "";
          this.searchTag = "";
          alert(response.data.avgScore);
          this.closeCol(0);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 상세페이지로 이동
    // showStudioInfo(stuId) {
    //   this.$router.push("/TempStudio/" + stuId);
    // },
    // 이미지 경로
    getImgUrl(url) {
      return require("../assets/img/studio/" + url);
    },
    // 검색 필터 삭제
    initFilter(value) {
      if (value == 1) {
        this.selectedDate = "";
        this.weekDate = "";
      } else {
        this.selectedDate = "";
        this.weekDate = "";
        this.addr1 = "";
        this.addr2 = "";
        this.minSize = "";
        this.maxSize = "";
        this.capacity = "";
        this.minUnitPrice = "";
        this.maxUnitPrice = "";
      }
      this.setFilter();
    },
    //collapse 닫기
    closeCol(value) {
      let elem = this.$refs.collapsible;
      let instance = M.Collapsible.getInstance(elem);
      instance.close(value);
      elem.close(value);
    }
  }
};
</script>

<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>
<style scoped src="vue-material/dist/theme/default.css"></style>

<style scoped>
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
  width: 90%;
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

#filter {
  margin-bottom: 0;
}

#filterCol {
  width: 100%;
}

#filterCol #colHeader {
  height: 3em !important;
  padding-top: 0 !important;
}

#filterSpace {
  text-align: left;
  padding-top: 0;
  padding-bottom: 0.3em;
}

#filterCol p,
#filterSpace p,
#cateWord {
  font-size: 0.9em;
  font-weight: bold;
}

#filterSpace input[type="date"] {
  width: 50%;
  height: 1.9em;
  background-color: white;
  border-radius: 0.3em;
  font-family: "Nanum Gothic", sans-serif;
  /* font-weight: bold; */
  font-size: 0.8em;
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

#categoryFilter {
  width: 40%;
  margin-top:0;
  margin-bottom: 0;
  display: inline-block;
}

#dateFilter {
  width: 50%;
  margin-left: 2em;
  display: inline-block;
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
  margin-left: 1em;
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

#order {
  width: 20%;
}

.card.horizontal .card-image img {
  width: 100% !important;
}

.btn-small {
  height: 32.4px;
  line-height: 32.4px;
  font-size: 12px !important;
  background: linear-gradient(135deg, #33a3dc, #034ea2) !important;
}

select {
  display: none;
}

select.browser-default {
  display: block;
}

select {
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  padding: 5px;
  border: 1px solid #f2f2f2;
  border-radius: 2px;
  height: 3rem;
}

.select-label {
  position: absolute;
}

.select-wrapper {
  position: relative;
}

.select-wrapper.valid + label,
.select-wrapper.invalid + label {
  width: 100%;
  pointer-events: none;
}

.select-wrapper input.select-dropdown {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  outline: none;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  font-size: 16px;
  margin: 0 0 8px 0;
  padding: 0;
  display: block;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  z-index: 1;
}

.select-wrapper input.select-dropdown:focus {
  border-bottom: 1px solid #26a69a;
}

.select-wrapper .caret {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  z-index: 0;
  fill: rgba(0, 0, 0, 0.87);
}

.select-wrapper + label {
  position: absolute;
  top: -26px;
  font-size: 0.8rem;
}

select:disabled {
  color: rgba(0, 0, 0, 0.42);
}

.select-wrapper.disabled + label {
  color: rgba(0, 0, 0, 0.42);
}

.select-wrapper.disabled .caret {
  fill: rgba(0, 0, 0, 0.42);
}

.select-wrapper input.select-dropdown:disabled {
  color: rgba(0, 0, 0, 0.42);
  cursor: default;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.select-wrapper i {
  color: rgba(0, 0, 0, 0.3);
}

.select-dropdown li.disabled,
.select-dropdown li.disabled > span,
.select-dropdown li.optgroup {
  color: rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

body.keyboard-focused .select-dropdown.dropdown-content li:focus {
  background-color: rgba(0, 0, 0, 0.08);
}

.select-dropdown.dropdown-content li:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.select-dropdown.dropdown-content li.selected {
  background-color: rgba(0, 0, 0, 0.03);
}

.prefix ~ .select-wrapper {
  margin-left: 3rem;
  width: 92%;
  width: calc(100% - 3rem);
}

.prefix ~ label {
  margin-left: 3rem;
}

.select-dropdown li img {
  height: 40px;
  width: 40px;
  margin: 5px 15px;
  float: right;
}

.select-dropdown li.optgroup {
  border-top: 1px solid #eee;
}

.select-dropdown li.optgroup.selected > span {
  color: rgba(0, 0, 0, 0.7);
}

.select-dropdown li.optgroup > span {
  color: rgba(0, 0, 0, 0.4);
}

.select-dropdown li.optgroup ~ li.optgroup-option {
  padding-left: 1rem;
}


</style>
