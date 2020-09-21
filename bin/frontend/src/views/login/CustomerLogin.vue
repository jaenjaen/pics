<template>
  <div class="publicSpace">
    <LoginHeader customerMode="true" />
      <KakaoLogin
        api-key="91cbdca7243fe89cb44e5d61a5aaaf44"
        :on-success="onSuccessKakao"
        :on-failure="onFailureKakao"
      />
      <br>
        <GoogleLogin
        :renderParams="renderParams"
        :params="params"
        :onSuccess="onSuccessGoogle"
        :onFailure="onFailureGoogle"
        >Google Login</GoogleLogin>
    </div>
</template>

<script scoped src="@/assets/js/login/CustomerLogin.js"></script>
<style scoped src="@/assets/css/login/CompanyLogin.css"></style>
<style scoped>
html, body{
  overflow: hidden;
}
#google-signin-btn-0{
  display:inline-block;
}
</style>
