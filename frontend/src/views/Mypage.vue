<template>
  <div class="publicSpace">
    <CompanyMypage v-if="falg"/>
    <CustomerMypage v-if="!falg"/>
    
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
