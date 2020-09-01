<template>
  <div class="publicSpace">
    <CompanyMypage />
    <CustomerMypage />
    
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
      flag:false
    };
  },
  methods: {
  }
};
</script>
