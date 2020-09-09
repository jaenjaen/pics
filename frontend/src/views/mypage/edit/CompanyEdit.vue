<template>
  <div class="publicSpace" style="height:100vh;">
    <div class="grid">
      <h2>업체 정보 수정</h2>
      <br />
      <form action="" method="POST" class="form login" @submit.prevent="companyEdit" >
        
        <div class="form__field">
          <label class="nomal_label" for="login__name">
            <img class="icon" src="@/assets/img/register/companyName.svg" />
            <span class="hidden">Name</span>
          </label>
          <input type= "text" v-model="name" class="form__input" :placeholder="name" required/>
        </div>

        <div class="form__field">
          <label class="nomal_label" for="login__password"
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
          <label class="nomal_label"  for="login__password"
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
            class="nomal_label"  ><img
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
          <label class="nomal_label"  for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" :placeholder="tel" required>
        </div>

        <div class="form__field">
          <label class="nomal_label"  for="login__logImg"
            ><img
              class="icon"
              src="@/assets/img/register/companyLogo.svg"
            /><span class="hidden">Logo</span></label
          >
          <input type="text" class="form_input" :placeholder="logoName" style="width:55%;" disalbed/>
          <input type="file" class="form__input" id="logo_upload"/>
          <label class="upload_label" for="logo_upload">업로드</label>
        </div>

        <div class="form__field">
          <label class="nomal_label"  for="login__desc"
            ><img class="icon" src="@/assets/img/register/description.svg" /><span
              class="hidden"
              >description</span
            ></label
          >
          <input
            type="text"
            v-model="desc"
            class="form__input"
            :placeholder="desc"
          />
        </div>
        <div class="form__field">
          <input type="submit" value="Modify" />
        </div>
        <p class="text--center">
        탈퇴하시겠습니까? <a href="#" class="signout" @click="signout"> 탈퇴하기</a>
      </p>

      </form>
  </div>
  </div>
</template>

<script scoped src="@/assets/js/mypage/edit/CompanyEdit.js"></script>
<style scoped src="@/assets/css/mypage/edit/CompanyEdit.css"></style>
