<template>
  <div class="publicSpace">
    <LoginHeader customerMode="true" />
    <div v-if="!flag">
      <KakaoLogin 
                  api-key="91cbdca7243fe89cb44e5d61a5aaaf44"
                  :on-success = onSuccessKakao
                  :on-failure = onFailureKakao
      />
      <NaverLogin
      clientId = "WPqClEa8eyJopmHuUcyb"
      callbackUrl="http://localhost:7777/customerLogin"
      :is-popup="true"
      :button-type="3"
      :button-height="50"
      button-color="green"
      :callbackFunction = "naverCallback"
      :getLoginStatus="true"/>

      <GoogleLogin 
                  :params="params" 
                  :renderParams="renderParams" 
                  :onSuccess="onSuccessGoogle" 
                  :onFailure="onFailureGoogle"></GoogleLogin>

      <v-facebook-login app-id=""></v-facebook-login>
    </div>

    <!-- 로그인 이후 추가 입력창-->
    <div v-if="flag">
      <form action="" method="POST" class="form login" @submit.prevent="customerRegister">
          <div class="form__field" >
                <label for="login__tel"><img class="icon" src="../assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
                <input type="tel" v-model="tel" class="form__input" placeholder="고객 전화번호" required>
          </div>

          <div class="form__field" >
                <label for="login_job"><img class="icon" src="../assets/img/register/job.svg"><span class="hidden">Job</span></label>
                <select name="job">
                  <option value="" disabled selected>직업을 선택 해주세요.</option>
                  <option value="photographer">포토그래퍼</option>
                  <option value="employee">회사원</option>
                  <option value="student">학생</option>
                  <option value="etc">그외</option>
                </select>
          </div>

          <div class="form__field">
                <label for="login__funnel"><img class="icon" src="../assets/img/register/funnel.svg"><span class="hidden">Funnel</span></label>
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
import axios from "axios";
import LoginHeader from "@/components/LoginHeader.vue";
import KakaoLogin from "vue-kakao-login";
import NaverLogin from "vue-naver-login";
import GoogleLogin from "vue-google-login";
import VFacebookLogin from 'vue-facebook-login-component';

//kakao
let onSuccessKakao = (data) => {
  console.log("KAKAO - success")
  console.log(data)
  window.Kakao.API.request({
    url:"/v2/user/me",
    success: function(res) {
      console.log(res);
      this.apiKey = res.id;
      this.imgSrc = res.properties.profile_image;
      this.nickname = res.properties.nickname;
      this.email = res.properties.email;
    },
    fail: function(error) {
      console.log(error);
    }
  });
}

let onFailureKakao = (data) => {
  console.log(data)
  console.log("KAKAO - callback 처리에 실패하였습니다.")
}


//naver
let naverCallback = (status) => {
    if (status) {
    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
    var email = NaverLogin.user.getEmail();
    if( email == undefined || email == null) {
      alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
      /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
      NaverLogin.reprompt();
      return;
    }
 
    window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port));
  } else {
    console.log("NAVER - callback 처리에 실패하였습니다.");
  }
}

//google
let onSuccessGoogle = (googleUser) => {
  console.log(googleUser)
  console.log("GOOGLE - success")
}
let onFailureGoogle = (data) => {
  console.log(data)
  console.log("GOOGLE - callback 처리에 실패하였습니다.")
}


export default {
  name: "Login",
  data(){
    return{
      flag : false,
      apiId:-1,
      apiKey:"",
      imgSrc:"",
      nickname:"",
      email:"",
      tel:"",
      job:"",
      funnel:"",
      params:{
        client_id:""
      },
      renderParams: {
        width: 250,
        height: 50,
        logtitle: true
      }
    }
  },
  components: {
    LoginHeader,
    KakaoLogin,
    NaverLogin,
    GoogleLogin,
    VFacebookLogin
  },
  methods: {
    onSuccessKakao,
    onFailureKakao,
    naverCallback,
    onSuccessGoogle,
    onFailureGoogle,
    customerRegister: function(){
      axios
      .post("http://localhost:7777/customer",{
        apiId :this.apiId,
        nicakname: this.nickname,
        job: this.job,
        funnel:this.funnel,
        email:this.email,
        tel:this.tel,
        apiKey : this.apiKey,
        imgSrc : this.imgSrc
        
      })
      .then(res =>{
          if(res!= ""){
            alert("가입 완.")
          }
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }
};
</script>