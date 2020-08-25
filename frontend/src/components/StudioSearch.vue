<template>
  <div class="container" id="searchStudio">
    <div id="search">
      <p>지금 바로 나한테 딱 맞는</p>
      <b>촬영공간 찾기</b> <br /><br />
      <input
        id="searchContent"
        name="searchContent"
        type="text"
        v-model="searchContent"
        placeholder="#을 앞에 붙이면 해시태그 검색"
        v-on:keyup.enter="setFilter"
      />
      <button @click="setFilter">돋보기</button>
    </div>
    <hr />
    <div class="row" id="filter">
      <!-- 카테고리 버튼 -->
      <div id="categoryBtn">
        <button class="waves-effect waves-light btn-small" @click="searchAllStudios" >All</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(1)">Cafe</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(2)">Studio</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(3)">House</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(4)">Office</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(5)">Restuarant</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(6)">Bookstore</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(7)">Pub</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(8)">Gallery</button>
        <button class="waves-effect waves-light btn-small" @click="setCategory(9)">Extra</button>
      </div>
      <!-- 필터 버튼 -->
      <div id='filterBtn' class="col s12">
        <ul class="tabs">
          <li class="tab col s2 " @click="showDateF = !showDateF"><a href="#dateFilter">날짜</a></li>
          <li class="tab col s2" @click="showAddrF = !showAddrF"><a href='#addrFilter'>위치</a></li>
          <li class="tab col s2" @click="showSizeF = !showSizeF"><a href='#sizeFilter'>장소 규모</a></li>
          <li class="tab col s2" @click="showCapaF = !showCapaF"><a href='#capaFilter'>인원</a></li>
          <li class="tab col s2" @click="showPriceF = !showPriceF"><a href='#priceFilter'>가격</a></li>
          <button class="btn-small col s2" name="setFilter" @click="setFilter">적용</button>
        </ul>
      </div>
        <!-- 필턴 버튼 클릭 시 해당 필터 입력창 -->
        <!-- 날짜 -->
      <div id="filterSpace">
        <span class="col s12" id='dateFilter' name="dateFilter">
          <p>달력</p> <input class="col s6" type="date" v-model="selectedDate" />
        </span>
        <!-- 주소 -->
        <span class="col s12" id='addrFilter' name="addrFilter">
          <p>GPS</p> <input class="col s4"  type="text" value="" v-model="addr1" />
          <span class="col s1" >시</span>
          <input class="col s5"  type="text" v-model="addr2" />
          <span class="col s2">동/면/읍</span>
        </span>
        <!-- 장소 규모 -->
        <span class="col s12" id='sizeFilter' name="sizeFilter">
          <p>집</p> 
          <input class="col s4" type="text" v-model="mizSize" />
          <img class="col s1" src="../assets/img/studio/m2.png" alt="">
          <img class="col s1" src="../assets/img/studio/dash.png" alt="">
          <input class="col s4" type="text" v-model="maxSize" />
          <img class="col s1" src="../assets/img/studio/m2.png" alt="">
        </span>
        <!-- 인원수 -->
        <span class="col s12" id='capaFilter' name="capaFilter">
          <p>인원</p>
          <span class="col offset-s4"></span>
          <i class="material-icons col s1" @click="capacity--">exposure_neg_1</i>
          <span id='capa' class='col s1'>{{capacity}}명</span>
          <i class="material-icons col s1" @click="capacity++">exposure_plus_1</i>
        </span>
        <!-- 가격 -->
        <span class="col s12" id='priceFilter' name="priceFilter">
          화폐 <input type="text" v-model="minUnitPrice" />원 ~
          <input type="text" v-model="maxUnitPrice" />원
        </span>
      </div>
    </div>
    <hr />
    <div v-if="loading">
      Loading...
    </div>
    <!-- 검색된 업체들이 출력되는 곳 -->
    <div class="row" id="searchList" v-else>
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
        class="col s4"
        id="studio"
        v-for="studio in studios"
        v-bind:key="studio.stuId"
        @click="showStudioInfo(studio.stuId)"
      >
        <div>
          <img :src="getImgUrl(studio.mainImg)" width="200" height="200" />
        </div>
        <p>{{ studio.name }}</p>
        <p>{{ studio.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import M from "materialize-css";

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
      mizSize: "",
      maxSize: "",
      minUnitPrice: "",
      maxUnitPrice: "",
      capacity: 0,
      searchContent: "",
      searchTag: "",
      order: "",

      //  필터이베트 관련 변수
      showDateF: false,
      showAddrF: false,
      showSizeF: false,
      showPriceF: false,
      showCapaF: false,
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

  methods: {
    // Studio 전체 불러오기
    searchAllStudios() {
      axios
        .get("http://127.0.0.1:7777/studio/search")
        .then(response => (this.studios = response.data))
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
        minSize: this.mizSize,
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
    }
  }
};
</script>

<style>
#searchStudio {
  width: 768px;
  margin: auto;
  font-family: "Nanum Gothic", sans-serif;
}

#searchContent {
  width: 50%;
}

#filterBtn {
  margin-top: 2%;
}

#filterSpace>span{
  margin-bottom: 2%;
  text-align: left;
  vertical-align: bottom;
  ;
}

#filterSpace>input[type=text]{
  height: 2rem;
}

.btn-small {
    height: 32.4px;
    line-height: 32.4px;
    font-size: 12px !important;
}

#filterBtn .btn-small{
  margin-top: 1% !important;
  font-size: 13px !important;
  /* margin-left: 4.8% !important; */

}

#capa{
  text-align: center;
  font-size: 1.1em;
}

.tabs .tab {
    /* line-height: 75px !important; */
    cursor: pointer;
    
}
.tabs .tab:hover {
    font-weight : bold !important;
    border-bottom: 1.5px solid black;
}
</style>
