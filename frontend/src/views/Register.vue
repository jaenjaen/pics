
<template>
  <div class="publicSpace">
    <div class="grid">
      <form action="" method="POST" class="form login" @submit.prevent="Register">
       
       <div class="form__field">
          <label for="login__name"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Name</span></label>
          <input id="login__name" type="text" v-model="name" class="form__input" placeholder="Name" required>
        </div>

       <div class="form__field">
         <label for="login__comId"><img class="icon" src="../assets/img/login/loginId.svg"><span class="hidden">comId</span></label>
          <input id="login__comId" type="email" name="comId" v-model="comId" class="form__input" placeholder="E-mail" required>
        </div>

        <div class="form__field">
          <label for="login__password"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Password</span></label>
          <input id="login__password" type="password" v-model="password" class="form__input" placeholder="Password" required>
        </div>

        <div class="form__field">
          <label for="login__password"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Password</span></label>
          <input id="login__password" type="password" v-model="password" class="form__input" placeholder="CheckPassword" required>
        </div>

        <div class="form__field">
          <label for="login__address"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Address</span></label>
          <input id="login__address" type="text" v-model="address" class="form__input" placeholder="Address" required>
        </div>

        <div class="form__field">
          <label for="login__tel"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">PhoneNumber</span></label>
          <input id="login__tel" type="tel" v-model="tel" class="form__input" placeholder="Phone number" required>
        </div>

        <div class="form__field">
          <label for="login__logImg"><img class="icon" src="../assets/img/login/loginPw.svg"><span class="hidden">Logo</span></label>
          <input id="login__logImg" type="file" name="logImg" class="form__input" placeholder="Logo Image">
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
    name: "Register",
    data(){
    return {
      comId:"",
      password:"",
      rdata:[]
    }
  },methods:{
    companyLogin: function(){
      axios.get('http://localhost:7777/company/'+this.comId+"/"+this.password)
        .then(response => {
          this.rdata = response.data
          console.log(response.data);
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
};

</script>
<style scpoed src="../assets/css/CompanyLogin.css"></style>