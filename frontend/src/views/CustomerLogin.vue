<script>
// @ is an alias to /src
import LoginHeader from "@/components/LoginHeader.vue";

export default {
  name: "Login",
  components: {
    LoginHeader
  }
};

</script>
<template>
  <div class="publicSpace">
      <LoginHeader customerMode=true />
    <h1>고객로그인</h1>
  </div>
</template>