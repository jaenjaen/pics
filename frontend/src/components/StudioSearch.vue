<template>
  <div>
    <div id="search">
      <p>지금 바로 나한테 딱 맞는</p>
      <strong>촬영공간 찾기</strong>
      <input type="text" /><button>돋보기</button>
    </div>
    <hr />
    <div id="filter">
      <button @click="showDateF = !showDateF">날짜</button>
      <button @click="showAddrF = !showAddrF">위치</button>
      <button @click="showSizeF = !showSizeF">장소 규모</button>
      <button @click="showPriceF = !showPriceF">가격</button>
      <button @click="showCapaF = !showCapaF">최대 수용인원</button>
      <br />
      <span name="dateFilter" v-if="showDateF">
        달력 <input type="date" v-model="selectedDate" /> <br />
      </span>
      <span name="addrFilter" v-if="showAddrF">
        GPS <input type="text" value="" v-model="addr1" />시
        <input type="text" v-model="addr2" />동/면/읍 <br />
      </span>
      <span name="sizeFilter" v-if="showSizeF">
        집 <input type="text" />m^2 ~ <input type="text" /> <br />
      </span>
      <span name="priceFilter" v-if="showPriceF">
        화폐 <input type="text" />원 ~ <input type="text" />원 <br />
      </span>
      <span name="capaFilter" v-if="showCapaF">
        닝겐 <input type="text" />명 <br />
      </span>
      <button name="setFilter" @click="setFilter">적용</button>
    </div>
    <hr />
    <div v-if="loading">
      Loading...
    </div>
    <div id="searchList" v-else>
      <select name="orderCon" id="order" @change="setOrder" v-model="order">
        <option disabled value="">정렬하기</option>
        <option value="orderCon=1">인기순</option>
        <option value="orderCon=2">가격순-내림차순</option>
        <option value="orderCon=3">가격순-오름차순</option>
        <option value="orderCon=4">평점순</option>
      </select>
      <input type="hidden" name="filters" />
      <ol>
        <li v-for="studio in studios" v-bind:key="studio.stuId">
          {{ studio.stuId }}
        </li>
      </ol>
      <input type="hidden" name="filters " />
    </div>
  </div>
</template>

<script>
import axios from "axios";
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export default {
  name: "customers-list",
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
      order: "",

      //  필터이베트 관련 변수
      showDateF: false,
      showAddrF: false,
      showSizeF: false,
      showPriceF: false,
      showCapaF: false,
      // 로딩 변수
      loading: true
    };
  },
  mounted() {
    this.retrieveStudios();
  },

  methods: {
    retrieveStudios() {
      axios
        .get("http://127.0.0.1:7777/studio/search")
        .then(response => (this.studios = response.data))
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    setOrder() {
      // alert(order.value);
      let filters = [this.order];
      alert(filters);
      this.search(filters);
    },
    setFilter() {
      if (this.selectedDate > 0) {
        this.weekDate = week[new Date(this.selectedDate).getDay()];
      }
      // alert(this.weekDate);
      let filters = {
        categoryId: "",
        weekDate: this.weekDate,
        selectedDate: this.selectedDate,
        address1: this.addr1,
        address2: this.addr2,
        minSize: "",
        maxSize: "",
        minUnitPrice: "",
        maxUnitPrice: "",
        capacity: "",
        searchContent: "",
        searchTag: "",
        orderCon: ""
      };
      //   alert(filters);
      this.search(filters);
    },
    search(filters) {
      axios
        .post("http://127.0.0.1:7777/studio/search/filter", filters)
        .then(response => {
          //   alert(response.data[0].stuId);
          this.studios = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
body {
  width: 800px;
  margin: auto;
}

#app div * {
  margin-top: 20px;
}

strong {
  display: block;
}
</style>
