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

    <!-- 필터 결과 출력 -->
    <!-- <div id="filterResult">
      <span v-if="selectedDate"
        >날짜 : {{ selectedDate }}
        <i class="material-icons" @click="initFilter(1)">close</i></span
      >
      <span v-if="addr1 || addr2">
        주소 :
        <span v-if="addr1">{{ addr1 }}</span>
        <span v-if="addr2">{{ addr2 }}</span>
        <i class="material-icons" @click="initFilter(2)">close</i>
      </span>
      <span v-if="minSize || maxSize">
        면적 :
        <span v-if="minSize">{{ minSize }}</span> ~
        <span v-if="maxSize">{{ maxSize }}</span>
        <i class="material-icons" @click="initFilter(3)">close</i>
      </span>
      <span v-if="capacity"
        >인원 : {{ capacity }}
        <i class="material-icons" @click="initFilter(4)">close</i></span
      >
      <span v-if="minUnitPrice || maxUnitPrice">
        가격 :
        <span v-if="minUnitPrice">{{ minUnitPrice | currency }}</span> ~
        <span v-if="maxUnitPrice">{{ maxUnitPrice | currency }}</span>
        <i class="material-icons" @click="initFilter(5)">close</i>
      </span>
    </div> -->

    <div class="row" id="filter">
      <!-- 카테고리 버튼 -->
      <div id="categoryBtn">
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="searchAllStudios"
        >
          전체
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(1)"
        >
          카페
        </button>
        <button
          class="waves-effect waves-light btn-small col s2"
          @click="setCategory(2)"
        >
          스튜디오
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(3)"
        >
          집
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(4)"
        >
          사무실
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(5)"
        >
          음식점
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(6)"
        >
          서점
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(7)"
        >
          펍
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(8)"
        >
          겔러리
        </button>
        <button
          class="waves-effect waves-light btn-small col s1"
          @click="setCategory(9)"
        >
          기타
        </button>
      </div>

      <!-- 필터 Collapse -->
      <div id="filterCol">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header" id='colHeader'>
              <p>내가 원하는 조건으로 찾기</p>
            </div>
            <div class="collapsible-body" id="filterSpace">
              <!-- 날짜 -->
              <div id="dateFilter" name="dateFilter">
                <p>예약 날짜로 찾기</p>
                <i class="material-icons" id="icon_filter">insert_invitation</i>
                <input type="date" v-model="selectedDate" />
                <span id='dateInit' @click="initFilter(1)">날짜 초기화</span>
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
              <div id='filterBtn'>
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
    <hr />
    <div v-if="loading">
      Loading...
    </div>
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList" v-else>
      <input type="hidden" ref="searchTop">
      <!-- 정렬하기 위한 select 태그 -->
      <select name="orderCon" id="orderCon" @change="setFilter" v-model="order">
        <option disabled value="">정렬하기</option>
        <option value="1">인기순</option>
        <option value="2">가격순-내림차순</option>
        <option value="3">가격순-오름차순</option>
        <option value="4">평점순</option>
      </select>
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
        <div class="card-content">
          <p>
            {{ studio.category.categoryName }} /
            {{ studio.studioFilter.address | category }}
          </p>
          <p>{{ studio.name }}</p>
          <p>{{ studio.description }}</p>
          <p>{{ studio.studioFilter.unitPrice | currency }} 원/시간</p>
          <p>{{ studio.avgScore | demical }} 점</p>
        </div>
        <div>♡</div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";

// import 'material-design-icons/iconfont/material-icons.css'
// import 'materialize-css/dist/css/materialize.min.css'
// import MC from 'materialize-css/dist/css/materialize.min.css'
import M from "materialize-css/";
// import MI from "material-design-icons/iconfont/material-icons.css";

// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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

      // 기본 변수
      loading: true,
      errored: false
    };
  },
  mounted() {
    // 페이지 오자마자 전체 리스트 뿌리기
    this.searchAllStudios();
    M.AutoInit();
    // MC.AutoInit();
    // MI.AutoInit();
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
    //카테고리 설정 후 검색 이동
    setCategory(categoryId) {
      this.categoryId = categoryId;
      this.setFilter();
    },
    // 필터 값 넣고 검색
    setFilter() {
      // 날짜가 입력이 되면 요일 리턴
      if (this.selectedDate.length > 0) {
        this.weekDate = week[new Date(this.selectedDate).getDay()];
      }
      // alert(this.searchContent.indexOf('#'))
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
          location.href="#searchList";
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
    showStudioInfo(stuId) {
      this.$router.push("/TempStudio/" + stuId);
    },
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
    }
  }
};
</script>

<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>
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
}
</style>
