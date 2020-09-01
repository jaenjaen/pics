<template>
  <div class="publicSpace">
    <div v-if="loginFlag">
      <CompanyMypage v-if="modeFlag"/>
      <CustomerMypage v-if="!modeFlag"/>
    </div>
    
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
      modeFlag:false,
      loginFlag:true
    };
  },
  created(){
    if(sessionStorage.getItem("company")==null && sessionStorage.getItem("customer")==null){
      alert("로그인 후 접근 가능합니다.");
      location.href = "http://localhost:9999/customerlogin";
    }
    this.loginFlag = false;
    if(sessionStorage.getItem("company")!=null) this.modeFlag = true;
  },
  methods: {
  }
};
</script>
