<template>
  <div>
    <div class="main_category">
      <div class="main_container">
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/cafe.svg" alt />
          </a>
          <p>카페</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/house.svg" alt />
          </a>
          <p>집</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/office.svg" alt />
          </a>
          <p>사무실</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/pub.svg" alt />
          </a>
          <p>PUB</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/resturant.svg" alt />
          </a>
          <p>식당</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/rooftop.svg" alt />
          </a>
          <p>루프탑</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/school.svg" alt />
          </a>
          <p>학교</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../assets/img/main_icon/studio.svg" alt />
          </a>
          <p>스튜디오</p>
        </div>
      </div>
    </div>
    <MainSecond />
  </div>
</template>

// <script>
import MainSecond from "@/components/MainSecond.vue";
export default {
  name: "mainsecond",
  components: {
    MainSecond
  },
  methods: {
    moveToSearch() {
      this.$router.push("/studioSearch/");
    }
  }
};
</script>

<style scoped src="../assets/css/remove_css.css" />
<style scoped src="materialize-css/dist/css/materialize.min.css" />

<style scoped>
.main_category {
  background-color: white;
  height: 250px;
}
.main_container {
  display: flex;
  width: 768px;
  height: 250px;
  padding-top: 20px;
  vertical-align: middle;
  margin: 0 auto;

  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;

  /* background-color: red; */
}
.main_icon {
  flex: 1 1 25%;
}
img {
  width: 60px;
  height: 60px;
}

p {
  font-weight: 700;
}

@media only screen and (max-width: 768px) {
  .main_container {
    width: 100%;
    height: 200px;
  }
  .main_category {
    height: 200px;
  }
  p {
    font-size: 0.5rem;
  }
}
</style>