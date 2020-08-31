<template>
  <div class="publicSpace">
    <LoginHeader customerMode="true" />
      <KakaoLogin
        api-key="91cbdca7243fe89cb44e5d61a5aaaf44"
        :on-success="onSuccessKakao"
        :on-failure="onFailureKakao"
      />
      <NaverLogin
        clientId="WPqClEa8eyJopmHuUcyb"
        callbackUrl="http://localhost:7777/customerLogin"
        :is-popup="true"
        :button-type="3"
        :button-height="50"
        button-color="green"
        :callbackFunction="naverCallback"
        :getLoginStatus="true"
      />

      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccessGoogle"
        :onFailure="onFailureGoogle"
      ></GoogleLogin>

      <v-facebook-login app-id=""></v-facebook-login>
    </div>
</template>

<script>
import axios from "axios";
import LoginHeader from "@/components/LoginHeader.vue";
import KakaoLogin from "vue-kakao-login";
import NaverLogin from "vue-naver-login";
import GoogleLogin from "vue-google-login";
import VFacebookLogin from "vue-facebook-login-component";

//kakao
let onSuccessKakao = data => {
  

  console.log("KAKAO - success");
  console.log(data);
  window.Kakao.API.request({
    url:"/v2/user/me",
    success: function(res) {
      console.log(res);
      this.apiKey = res.id;
      this.imgSrc = res.properties.profile_image;
      this.nickname = res.properties.nickname;
      this.email = res.kakao_account.email;
      this.apiId = 0;
      this.apiData = {"apiKey":this.apiKey,
                      "imgSrc":this.imgSrc,
                      "nickname": this.nickname,
                      "email": this.email,
                      "apiId": this.apiId};

      axios
        .get("http://localhost:7777/customer/" + this.apiKey, {
          validateStatus: function(status) {
            // 상태 코드가 400 이상일 경우 거부. 나머지(400보다 작은)는 허용.
            return status <= 400;
          }
        })
        .then(res => {
          if (res.data == "") {
            console.log(this.apiData);
            sessionStorage.setItem("apiData", JSON.stringify(this.apiData));
            location.href = "http://localhost:9999/register";
          } else {
            sessionStorage.setItem("customer", data);
            location.href = "http://localhost:9999";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fail: function(error) {
      console.log(error);
    }
  });
};

let onFailureKakao = data => {
  console.log(data)
  console.log("KAKAO - callback 처리에 실패하였습니다.")
};

//naver
let naverCallback = status => {
  if (status) {
    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
    var email = NaverLogin.user.getEmail();
    if (email == undefined || email == null) {
      alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
      /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
      NaverLogin.reprompt();
      return;
    }
 
    window.location.replace(
      "http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port));
  } else {
    console.log("NAVER - callback 처리에 실패하였습니다.");
  }
};

//google
let onSuccessGoogle = googleUser => {
  console.log(googleUser);
  console.log("GOOGLE - success");
};

let onFailureGoogle = data => {
  console.log(data)
  console.log("GOOGLE - callback 처리에 실패하였습니다.");
};

export default {
  name: "Login",
  data() {
    return {
      apiData:[],
      apiId: -1,
      apiKey: "",
      imgSrc: "",
      nickname: "",
      email: "",
      params: {
        client_id: ""
      },
      renderParams: {
        width: 250,
        height: 50,
        logtitle: true
      }
    };
  },
  components: {
    LoginHeader,
    KakaoLogin,
    NaverLogin,
    GoogleLogin,
    VFacebookLogin
  },
  methods: {
    onFailureKakao,
    onSuccessKakao,
    naverCallback,
    onSuccessGoogle,
    onFailureGoogle,
    customerRegister: function() {
      axios
        .post("http://localhost:7777/customer", {
          apiId: this.apiId,
          nicakname: this.nickname,
          job: this.job,
          funnel: this.funnel,
          email: this.email,
          tel: this.tel,
          apiKey: this.apiKey,
          imgSrc: this.imgSrc
        })
        .then(res => {
          if (res != "") {
            alert("가입 완.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated: {}
};
</script>
