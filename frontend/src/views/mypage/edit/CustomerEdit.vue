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
          <input type="file" class="form__input" />
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
            v-model="nickname"
            class="form__input"
            :placeholder="nickname"
            required
          />
        </div>

        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" :placeholder="tel" required>
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
        탈퇴하시겠습니까? &nbsp;&nbsp;<ra href="#" class="signout" @click="signout">탈퇴하기</ra>
      </p>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
var customer = JSON.parse(sessionStorage.getItem("customer"));

export default {
  name: "CustomerEdit",
  data(){
    return {
      custId:-1,
      nickname:"",
      imgSr:"",
      tel:"",
      job:"",
      max: 13,
      }
  },mounted(){
    console.log(customer);
    this.custId = customer.custId;
    this.imgSrc = customer.imgSrc;
    this.nickname = customer.nickname;
    this.tel = customer.tel;
    this.job = customer.job;
  }
  ,methods:{
    customerEdit: function(){
        axios
        .put('http://localhost:7777/customer',{
          custId: this.custId,
          imgSrc: this.imgSrc,
          nickname: this.nickname,
          tel: this.tel,
          job: this.job
        })
         .then(res => {
           console.log(res);
           customer.custId = this.custId;
           customer.imgSrc = this.imgSrc;
           customer.nickname = this.nickname;
           customer.tel = this.tel;
           customer.job = this.job;
           sessionStorage.setItem("customer",JSON.stringify(customer));
           //console.log(customer);
           alert("정보가 수정되었습니다.");
           location.href="http://localhost:9999/mypage";
           })
        .catch(e => {
          console.log(e)
        })
      },
      insertDash(){
        if(this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel+"-"
      },
      signout :function(){
        axios.delete("http://localhost:7777/customer/"+this.custId)
        .then(res=>{
          console.log(res)
          alert("회원탈퇴 되었습니다.");
          sessionStorage.removeItem("customer");
          location.href="http://localhost:9999";
        })
        .catch(err=>{
          console.log(err);
        })
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