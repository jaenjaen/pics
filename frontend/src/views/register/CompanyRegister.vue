<template>
  <div class="publicSpace">
    <div class="grid">
      <h2>기업고객 가입</h2>
      <br />
      <form
        action=""
        method="POST"
        class="form login"
        @submit.prevent="companyRegister"
      >
        <div class="form__field">
          <label for="login__name"
            ><img
              class="icon"
              src="@/assets/img/register/companyName.svg"
            /><span class="hidden">Name</span></label
          >
          <input
            type="text"
            v-model="name"
            class="form__input"
            placeholder="업체 이름"
            required
          />
        </div>

        <div class="form__field">
          <label for="login__comId"
            ><img class="icon" src="@/assets/img/login/loginId.svg" /><span
              class="hidden"
              >comId</span
            ></label
          >
          <input
            type="email"
            v-model="comId"
            class="form__input"
            placeholder="업체 이메일"
            required
            @keyup="checkEmail"
          />
        </div>

        <div v-html="idMsg"></div>

        <div class="form__field">
          <label for="login__password"
            ><img class="icon" src="@/assets/img/login/loginPw.svg" /><span
              class="hidden"
              >Password</span
            ></label
          >
          <input
            type="password"
            v-model="password"
            class="form__input"
            placeholder="비밀번호"
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
            type="password"
            v-model="checkpassword"
            class="form__input"
            placeholder="비밀번호 확인"
            required
            @keyup="checkPw"
          />
        </div>

        <div v-html="pwMsg"></div>

        <div class="form__field">
          <label for="login__address"
            ><img
              class="icon"
              src="@/assets/img/register/companyAddr.svg"
            /><span class="hidden">Address</span></label
          >
          <input
            type="text"
            v-model="address"
            class="form__input"
            placeholder="주소"
            required
            v-if="addrShow"
            readonly
            @click="editAddr"
          />
          <input
            type="button"
            value="주소 검색"
            v-if="!addrShow"
            @click="showModal"
          />
        </div>

        <modal name="postcodeModal" :height="455">
          <vue-daum-postcode
            @complete="onComplete"
            style="height: 455px; overflow: scroll;"
          />
        </modal>

        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" placeholder="업체 전화번호" required>
        </div>

        <div class="form__field">
          <label for="login__logImg"
            ><img
              class="icon"
              src="@/assets/img/register/companyLogo.svg"
            /><span class="hidden">Logo</span></label
          >
           <input type="text" class="form_input" :placeholder="logoName" style="width:55%;" disabled/>
          <input type="file" class="form__input" id="logo_upload"/>
          <label class="upload_label" for="logo_upload">업로드</label>
        </div>

        <div class="form__field">
          <label for="login__comId"
            ><img class="icon" src="@/assets/img/register/description.svg" /><span
              class="hidden"
              >description</span
            ></label
          >
          <input
            type="text"
            v-model="desc"
            class="form__input"
            placeholder="업체 설명"
          />
        </div>

        <div class="form__field">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/register/CompanyRegister.js" ></script>
<style scoped src="@/assets/css/login/CompanyLogin.css"></style>
