<template>
  <div class="publicSpace">
    <LoginHeader companyMode="true" />

    <div class="grid">
      <form
        action=""
        method="POST"
        class="form login"
        @submit.prevent="companyLogin"
      >
        <div class="form__field">
          <label for="login__username"
            ><img class="icon" src="@/assets/img/login/loginId.svg" /><span
              class="hidden"
              >comId</span
            ></label
          >
          <input
            id="login__username"
            type="text"
            name="comId"
            v-model="comId"
            class="form__input"
            placeholder="e-mail"
            required
          />
        </div>

        <div class="form__field">
          <label for="login__password"
            ><img class="icon" src="@/assets/img/login/loginPw.svg" /><span
              class="hidden"
              >Password</span
            ></label
          >
          <input
            id="login__password"
            type="password"
            v-model="password"
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
        회원이 아니신가요? &nbsp;&nbsp;<router-link
          to="/companyregister"
          class="register"
          >회원가입</router-link
        >
      </p>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/login/CompanyLogin.js"></script>
<style scoped src="@/assets/css/login/CompanyLogin.css"></style>
