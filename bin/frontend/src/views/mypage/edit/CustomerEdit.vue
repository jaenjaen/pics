<template>
<div class="publicSpace">
    <div class="grid">
    <h1> 고객정보 수정 </h1><br>
      <form action="" method="POST" class="form login" @submit.prevent="customerEdit">

        <div class="form__field">
          <label class="nomal_label" for="login__logImg"
            ><img
              class="icon"
              src="@/assets/img/register/companyLogo.svg"
            /><span class="hidden">Logo</span></label
          >
          <input type="text" class="form_input" :placeholder="imgName" style="width:55%;" disabled/>
          <input type="file" class="form__input" id="edit_pic" accept="image/*"  ref="profileImg" @change="onFileChange('edit_pic',$event)"/>
          <label class="upload_label" for="edit_pic">업로드</label>
        </div>

        <div class="form__field">
          <label class="nomal_label" for="login__name"
            ><img
              class="icon"
              src="@/assets/img/register/userEdit.svg"
            /><span class="hidden">nickname</span></label
          >
          <input
            type="text"
            v-model="nickname"
            class="form__input"
            :placeholder="nickname"
            required
          />
        </div>

        <div class="form__field" >
          <label class="nomal_label" for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" :placeholder="tel" required>
        </div>

        <div class="form__field" >
          <label class="nomal_label" for="login_job"><img class="icon" src="@/assets/img/register/job.svg"><span class="hidden">Job</span></label>
          <select name="job" v-model="job">
            <option value="" disabled selected>직업을 선택 해주세요.</option>
            <option value="photographer">포토그래퍼</option>
            <option value="employee">회사원</option>
            <option value="student">학생</option>
            <option value="etc">그외</option>
          </select>
        </div>
        <div class="form__field">
          <input type="submit" value="MODIFY">
        </div>
        <p class="text--center">
        탈퇴하시겠습니까? &nbsp;&nbsp;<a href="#" class="signout" @click="signout">탈퇴하기</a>
      </p>
      </form>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/mypage/edit/CustomerEdit.js"> </script>
<style scoped src="@/assets/css/mypage/edit/CompanyEdit.css"></style>
<style scoped>
 .form__field select{
   width: 248px;
 }
</style>