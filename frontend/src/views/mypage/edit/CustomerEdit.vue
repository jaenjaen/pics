<template>
<div class="publicSpace">
    <div class="grid">
    <h1> 고객정보 수정 </h1><br>
      <form action="" method="POST" class="form login" @submit.prevent="customerEdit">

        <div class="form__field">
          <label for="login__logImg"
            ><img
              class="icon"
              src="@/assets/img/register/companyLogo.svg"
            /><span class="hidden">Logo</span></label
          >
          <input type="file" class="form__input" placeholder="프로필 사진" />
        </div>

        <div class="form__field">
          <label for="login__name"
            ><img
              class="icon"
              src="@/assets/img/register/userEdit.svg"
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

        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" placeholder="고객 전화번호" required>
        </div>

        <div class="form__field" >
          <label for="login_job"><img class="icon" src="@/assets/img/register/job.svg"><span class="hidden">Job</span></label>
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
        탈퇴하시겠습니까? &nbsp;&nbsp;<router-link
          to="/companyregister"
          class="signout"
          >탈퇴하기</router-link>
      </p>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "CustomerEdit",
  data(){
    return {
      apiId: -1,
      apiKey: "",
      imgSrc: "",
      nickname: "",
      email: "",
      tel: "",
      job: "",
      funnel: "",
      max: 13,
      picked:""
      }
  },mounted(){
    var apiData = JSON.parse(sessionStorage.getItem("apiData"));
    console.log(apiData);
    this.apiId = apiData.apiId;
    this.apiKey = apiData.apiKey;
    this.imgSrc = apiData.imgSrc;
    this.nickname = apiData.nickname;
    this.email = apiData.email;
    console.log(this.apiId+","+this.apiKey+","+this.imgSrc+","+this.nickname+","+this.email);

  }
  ,methods:{
    customerEdit: function(){
        axios
        .post('http://localhost:7777/customer',{
          apiId: this.apiId,
          apiKey: this.apiKey,
          imgSrc: this.imgSrc,
          nickname: this.nickname,
          email: this.email,
          tel: this.tel,
          job: this.job,
          funnel: this.funnel,
          gender: this.picked
        })
         .then(response => {
           this.condata = response.data
           sessionStorage.removeItem("apiData")
           alert(this.nickname+" 님의 가입을 환영합니다.");
           location.href="http://localhost:9999"
           })
        .catch(e => {
          console.log(e)
        })
      },
      insertDash(){
        if(this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel+"-"
      }
  }
}

</script>
<style scpoed src="@/assets/css/login/CompanyLogin.css"></style>
<style scoped>
 .form__field select{
   width: 248px;
 }
 .form__field{
   background-color: #F5F5F5;
 }
  input[type='radio']{
    margin-top:8%;
  }

  router-link{

  }
</style>