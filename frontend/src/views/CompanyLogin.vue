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
<style src="../assets/css/CompanyLogin.css"></style>

<template>
  <div class="customerLogin">
    <LoginHeader />
    <div class="grid">
      <form action="https://httpbin.org/post" method="POST" class="form login">
        <div class="form__field">
          <label for="login__username"
            ><img class="icon" src="../assets/img/login/loginId.svg" /><span
              class="hidden"
              >comId</span
            ></label
          >
          <input
            id="login__username"
            type="text"
            name="comId"
            class="form__input"
            placeholder="e-mail"
            required
          />
        </div>

        <div class="form__field">
          <label for="login__password"
            ><img class="icon" src="../assets/img/login/loginPw.svg" /><span
              class="hidden"
              >Password</span
            ></label
          >
          <input
            id="login__password"
            type="password"
            name="password"
            class="form__input"
            placeholder="Password"
            required
          />
        </div>

        <div class="form__field">
          <input type="submit" value="Sign In" />
        </div>
      </form>
      <br />
      <p class="text--center">
        회원이 아니신가요? &nbsp;&nbsp;<a class="register" href="#">회원가입</a>
      </p>
    </div>
  </div>
</template>
