<template>
  <div class="publicSpace">
    <div class="grid">
      <h2>개인고객 가입</h2><br>
      <!-- 로그인 이후 추가 입력창-->
      <form action="" method="POST" class="form login" @submit.prevent="customerRegister">
        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" placeholder="고객 전화번호" required>
        </div>

        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/gender.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="radio" id="M" value="M" v-model="picked"> <label for="M">남성</label> 
          <br> 
          <input type="radio" id="F" value="F" v-model="picked"> <label for="W">여성</label>
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
          <label for="login__funnel"><img class="icon" src="@/assets/img/register/funnel.svg"><span class="hidden">Funnel</span></label>
          <input type="text" v-model="funnel" class="form__input" placeholder="유입경로">
        </div>
        <div class="form__field">
          <input type="submit" value="Register">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "CustomerRegister",
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
    customerRegister: function(){
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
    margin: auto;
    width:25px;
  }
</style>