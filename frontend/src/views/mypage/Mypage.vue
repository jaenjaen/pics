<template>
  <div class="mypage_container" v-if="loginFlag">
    <CompanyMypage v-if="modeFlag" />
    <CustomerMypage v-if="!modeFlag" />
  </div>
</template>

<script>
//import axios from "axios";
import CompanyMypage from "@/components/mypage/CompanyMypage.vue";
import CustomerMypage from "@/components/mypage/CustomerMypage.vue";

export default {
  name: "Mypage",
  components: {
    CompanyMypage,
    CustomerMypage
  },
  data() {
    return {
      modeFlag: false,
      loginFlag: false
    };
  },
  created() {
    if (
      sessionStorage.getItem("company") == null &&
      sessionStorage.getItem("customer") == null
    ) {
      alert("로그인 후 접근 가능합니다.");
      this.$router.push("/customerlogin");
    }
    if (sessionStorage.getItem("company") != null) {
      this.modeFlag = true;
      this.loginFlag = true;
    } else if (sessionStorage.getItem("customer") != null)
      this.loginFlag = true;
  }
};
</script>

<style scoped>
.mypage_container {
  width: 768px;
  margin: auto;
}

@media all and (min-width: 333px) and (max-width: 768px) {
  .mypage_container {
    width: 100%;
  }
}
</style>
