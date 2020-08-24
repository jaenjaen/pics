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
    <LoginHeader/>
    <div class="grid">
      <form action="https://httpbin.org/post" method="POST" class="form login">
       <div class="form__field">
         <label for="login__username"><img class="icon"><span class="hidden">Username</span></label>
          <input id="login__username" type="text" name="username" class="form__input" placeholder="e-mail" required>
        </div>

        <div class="form__field">
          <label for="login__password"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg><span class="hidden">Password</span></label>
          <input id="login__password" type="password" name="password" class="form__input" placeholder="Password" required>
        </div>

        <div class="form__field">
          <input type="submit" value="Sign In">
        </div>
        
      </form>
      <p class="text--center">Not a member? <a href="#">Sign up now</a> <svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icons.svg#arrow-right"></use></svg></p>
    </div>
  </div>
</template>