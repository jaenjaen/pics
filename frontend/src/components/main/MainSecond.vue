<template>
  <div class="mainsecond_container">
    <div class="word_container">
      <div class="word_item">추천 인기공간</div>
      <div class="word_item">
        <a href>더보기</a>
      </div>
    </div>
    <!-- 캐라셀 -->
    <div class="mainsecond_carousel">
      <carousel :items="4" :margin="5" :loop="true" :nav="false">
        <a href v-for="(studio,index) in studio_infos" :key="index">
          <div class="row">
            <div class="card">
              <div class="card-image">
                <img :src="getImgUrl(studio.mainImg)" />
              </div>
              <div class="card-content"></div>
            </div>
          </div>
        </a>
      </carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import carousel from "vue-owl-carousel";
export default {
  components: { carousel },
  data() {
    return {
      studio_infos: []
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:7777/studio/search")
      .then(response => (this.studio_infos = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    // 이미지 경로
    getImgUrl(url) {
      return require("@/assets/img/studio/" + url);
    }
  }
};
</script>

<style scoped src="../../assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>

<style scoped>
.mainsecond_container {
  width: 768px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: White;
}

.word_container {
  width: 730px;
  margin: 0 auto;
  padding: 15px 5px;
  display: flex;
  justify-content: space-between;
}
.word_item:nth-child(1) {
  font-weight: 700;
}

.mainsecond_carousel {
  width: 730px;
  margin: 0 auto;
}
.input_info {
  width: 120px;
}
img {
  width: 120px;
  height: 127.5px;
}
</style>
