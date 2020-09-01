<template>
  <div class="publicSpace">
    <LoginHeader customerMode="true" />
      <KakaoLogin
        api-key="91cbdca7243fe89cb44e5d61a5aaaf44"
        :on-success="onSuccessKakao"
        :on-failure="onFailureKakao"
      />
      <br>
        <GoogleLogin
        :renderParams="renderParams"
        :params="params"
        :onSuccess="onSuccessGoogle"
        :onFailure="onFailureGoogle"
        >Google Login</GoogleLogin>
    </div>
</template>

<script>
import axios from "axios";
import LoginHeader from "@/components/LoginHeader.vue";
import KakaoLogin from "vue-kakao-login";
import GoogleLogin from "vue-google-login";

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
            sessionStorage.setItem("apiData", JSON.stringify(this.apiData));
            location.href = "http://localhost:9999/register";
          } else {
            sessionStorage.setItem("customer", JSON.stringify(res.data));
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
  console.log(data);
  console.log("KAKAO - callback 처리에 실패하였습니다.");
};

//google
let onFailureGoogle = function(data){
  console.log(data);
  console.log("GOOGLE - callback 처리에 실패하였습니다.");
};

export default {
  name: "Login",
  data() {
    return {
      apiData: [],
      apiId: -1,
      apiKey: "",
      imgSrc: "",
      nickname: "",
      email: "",
      params: {
        client_id:
          "904661069189-3mk7nkmdpmp22qnb0sr0li8t1laim3cr.apps.googleusercontent.com"
      },
      renderParams: {
        width: 300,
        height: 49,
        logtitle: true
      },
      isConnected: false,
      FB: undefined,
    }
  },
  components: {
    LoginHeader,
    KakaoLogin,
    GoogleLogin,
  },
  methods: {
    onFailureKakao,
    onSuccessKakao,
    onSuccessGoogle(googleUser){
    console.log("GOOGLE - success");
    var profile = googleUser.getBasicProfile();
    this.apiKey = googleUser.getId();
    this.imgSrc = profile.getImageUrl();
    this.nickname = profile.getName();
    this.email = profile.getEmail();
    this.apiData = {"apiKey": this.apiKey,
                    "imgSrc": this.imgSrc,
                    "nickname": this.nickname,
                    "email": this.email,
                    "apiId": 2
                    };
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
              sessionStorage.setItem("customer", JSON.stringify(res.data));
              location.href = "http://localhost:9999";
            }
          })
          .catch(err => {
            console.log(err);
          });
  },
    onFailureGoogle,
  }
};
</script>

<style scoped>

#google-signin-btn-0{
  display:inline-block;
}
</style>
