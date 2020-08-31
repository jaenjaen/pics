<template>
  <div class="publicSpace">
    <div class="grid">
      <h2>기업고객 가입</h2><br>
      <form action="" method="POST" class="form login" @submit.prevent="companyRegister">
       
       <div class="form__field">
          <label for="login__name"><img class="icon" src="../assets/img/register/companyName.svg"><span class="hidden">Name</span></label>
          <input type="text" v-model="name" class="form__input" placeholder="업체 이름" required>
        </div>

       <div class="form__field">
         <label for="login__comId"><img class="icon" src="../assets/img/login/loginId.svg"><span class="hidden">comId</span></label>
          <input type="email" v-model="comId" class="form__input" placeholder="업체 이메일" required @keyup="checkEmail">
        </div>

        <div v-html="idMsg"></div>

        <div class="form__field">
          <label for="login__password"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Password</span></label>
          <input type="password" v-model="password" class="form__input" placeholder="비밀번호" required>
        </div>
        <div class="form__field">
          <label for="login__password"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Password</span></label>
          <input type="password" v-model="checkpassword" class="form__input" placeholder="비밀번호 확인" required @keyup="checkPw">
        </div>

        <div v-html="pwMsg"></div>

        <div class="form__field">
          <label for="login__address"><img class="icon" src="../assets/img/register/companyAddr.svg"><span class="hidden">Address</span></label>
          <input type="text" v-model="address" class="form__input" placeholder="주소" required v-if="addrShow" readonly @click="editAddr"> 
          <input type="button" value="주소 검색" v-if="!addrShow" @click="showModal">
        </div>
        
        <modal name="postcodeModal" :height="455">
          <vue-daum-postcode @complete="onComplete" style="height: 455px; overflow: scroll;"/>
        </modal>

        <div class="form__field">
          <label for="login__tel"><img class="icon" src="../assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" placeholder="업체 전화번호" required>
        </div>

        <div class="form__field">
          <label for="login__logImg"><img class="icon" src="../assets/img/register/companyLogo.svg"><span class="hidden">Logo</span></label>
          <input type="file" class="form__input" placeholder="업체 로고">
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
  name: "CompanyRegister",
  data(){
    return {
        idMsg:"",
        idFlag:false,
        pwMsg:"",
        pwFlag:false,
        addrShow:false,
        name:"",
        comId:"",
        password:"",
        checkpassword:"",
        address:"",
        tel:"",
        condata:""
      }
  }
  ,methods:{
    companyRegister: function(){
      if(this.idFlag == true && this.pwFlag == true){
        axios
        .post('http://localhost:7777/company',{
          name: this.name,
          comId:this.comId,
          password:this.password,
          address:this.address,
          tel:this.tel
        })
         .then(response => {
           this.condata = response.data
           alert(this.name+"의 가입을 환영합니다.");
           location.href="http://localhost:9999"
           })
        .catch(e => {
          console.log(e)
        })
      }
      else { 
        alert("입력한 정보를 다시 한번 확인해주세요.");
        //console.log(this.idFlag+","+this.pwFlag+","+this.name+","+this.comId+","+this.password+","+this.address+","+this.tel);
      }
    }, //~companyRegister
    checkEmail: function(){
      axios
      .get('http://localhost:7777/company/'+this.comId)
      .then(res =>{
        this.condata = res.data;
          if(this.condata != ""){
            this.idMsg="<p style='color:red;'>이미 사용중인 아이디입니다.</p>";
            this.idFlag = false;
          }
          else{
            this.idMsg="<p style='color:green;'>사용 가능한 아이디입니다.</p>";
            this.idFlag = true;
          }
      })
      .catch(e =>{
        console.log(e);
      })
    },//~checkEmail
    checkPw: function(){
      if (this.password == this.checkpassword){
        this.pwFlag=true;
        this.pwMsg="";
      }else{
        this.pwMsg="<p style='color:red;'>입력하신 비밀번호와 다릅니다.</p>";
        this.pwFlag=false;
      }
    },//~checkPw
    showModal: function(){
      this.$modal.show("postcodeModal");
    },
    onComplete(data){
      this.address = data.address;
      this.addrShow = true;
      this.$modal.hide("postcodeModal");
    },
    editAddr: function(){
      this.$modal.show("postcodeModal");
    }
  }
};
</script>
<style scpoed src="../assets/css/CompanyLogin.css"></style>