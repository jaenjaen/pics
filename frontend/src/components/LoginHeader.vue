<style scoped src="../assets/css/LoginHeader.css"></style>
<template>
  <div class="loginHeader">

      <ul class="loginSort">
        <li class="loginMode" v-bind:class="{ 'is-active': customerMode }">
            <router-link to="/customerLogin">개인고객 로그인</router-link>
        </li>
        <li class="loginMode" v-bind:class="{ 'is-active': companyMode }">
            <router-link to="/companyLogin">기업고객 로그인</router-link>
        </li>
    </ul>
  </div>
</template>

<script scoped>
export default {
  name:"loginHeader",
  props: {
    customerMode: Boolean,
    companyMode: Boolean
  }
};
</script>

