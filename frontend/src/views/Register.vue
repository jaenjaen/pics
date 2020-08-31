<template>
  <div>
    <CustomerRegister v-if="flag" />
    <CompanyRegister v-if="!flag" />
  </div>
</template>

<script>
// @ is an alias to /src
import CustomerRegister from "@/components/CustomerRegister.vue";
import CompanyRegister from "@/components/CompanyRegister.vue";

export default {
  name: "Register",
  components: {
    CustomerRegister,
    CompanyRegister
  },
  data() {
    return {
      flag: false,
      apiData: {}
    };
  },
  mounted() {
    this.apiData = sessionStorage.getItem("apiData");
    console.log(this.apiData);

    if (this.apiData != null) {
      this.flag = true;
    }
  }
};
</script>
