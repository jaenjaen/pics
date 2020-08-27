<template>
  <div id="studioInfo">
    <div id="loading" v-if="this.loading">Loading</div>
    <div id="result">
      <ol>
        <li v-for="info in infos" v-bind:key="info.stuId">{{info.stuId}}</li>
      </ol>
    </div>
  </div>
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
    this.showStudioInfo()
  },
  methods: {
    showStudioInfo () {
      axios
        .get("http://127.0.0.1:7777/getStudioInfo/"+ this.stuId)
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
