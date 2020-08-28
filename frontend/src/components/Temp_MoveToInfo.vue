<template>
  <div id="studioInfo">
    <div id="loading" v-if="this.loading">Loading</div>
    <div id="result">
      <ol>
        <li v-for="info in infos" v-bind:key="info.stuId">{{ info.stuId }}</li>
      </ol>
    </div>
    <div class="input-field">
      <select name="" id="">
        <option value="">dd</option>
        <option value="">ee</option>
      </select>
    </div>
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
    <!-- <div id="categoryBtn">
                <p>카테고리로 찾기</p>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="searchAllStudios"
                >
                  전체
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(1)"
                >
                  카페
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(2)"
                >
                  스튜디오
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(3)"
                >
                  집
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(4)"
                >
                  사무실
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(5)"
                >
                  음식점
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(6)"
                >
                  서점
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(7)"
                >
                  펍
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(8)"
                >
                  겔러리
                </button>
                <button
                  class="waves-effect waves-light btn-small"
                  @click="setCategory(9)"
                >
                  기타
                </button>
              </div> -->
</template>

<script scoped>
import axios from "axios";
// Vue 시작
export default {
  name: "studio-info",
  props: ["stuId"],
  data() {
    return {
      // Axios 전체 리스트 변수
      infos: [],
      // 로딩 변수
      loading: true
    };
  },
  mounted() {
    this.showStudioInfo();
  },
  methods: {
    showStudioInfo() {
      axios
        .get("http://127.0.0.1:7777/getStudioInfo/" + this.stuId)
        .then(response => (this.infos = response.data))
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script> 

<style scoped>
#studioInfo {
  width: 768px;
  margin: auto;
}
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>

<script>
// #filterResult span i {
//   vertical-align: middle;
//   font-size: 1rem;
//   cursor: pointer;
// }

// #categoryBtn {
//   margin-top: 1%;
//   display: block;
// }

// #categoryBtn > button {
//   /* margin-right: 0.51em !important; */
// }

// .btn-small {
//   height: 32.4px;
//   line-height: 32.4px;
//   font-size: 12px !important;
//   background: linear-gradient(135deg, #33a3dc, #034ea2) !important;
// }
</script>

