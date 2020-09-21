import axios from "axios";
import LoginHeader from "@/components/LoginHeader.vue";
import KakaoLogin from "vue-kakao-login";
import GoogleLogin from "vue-google-login";
import router from "../../../router";

//kakao
let onSuccessKakao = data => {
    console.log("KAKAO - success");
    console.log(data);
    window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(res) {
            console.log(res);
            this.apiKey = res.id;
            this.imgSrc = res.properties.profile_image;
            this.nickname = res.properties.nickname;
            this.email = res.kakao_account.email;
            this.apiId = 0;
            this.apiData = {
                "apiKey": this.apiKey,
                "imgSrc": this.imgSrc,
                "nickname": this.nickname,
                "email": this.email,
                "apiId": this.apiId
            };

            axios
                .get("http://54.180.25.91:7777/customer/" + this.apiKey, {
                    validateStatus: function(status) {
                        // 상태 코드가 400 이상일 경우 거부. 나머지(400보다 작은)는 허용.
                        return status <= 400;
                    }
                })
                .then(res => {
                    if (res.data == "") {
                        sessionStorage.setItem("apiData", JSON.stringify(this.apiData));
                        router.push('/customerregister');
                    } else {
                        sessionStorage.setItem("customer", JSON.stringify(res.data));
                        router.push('/');
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
let onFailureGoogle = function(data) {
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
                client_id: "804544618984-l5mb6g3htflqb0uvliqbkl3maa06j4ng.apps.googleusercontent.com"
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
        onSuccessGoogle(googleUser) {
            console.log("GOOGLE - success");
            var profile = googleUser.getBasicProfile();
            this.apiKey = googleUser.getId();
            this.imgSrc = profile.getImageUrl();
            this.nickname = profile.getName();
            this.email = profile.getEmail();
            this.apiData = {
                "apiKey": this.apiKey,
                "imgSrc": this.imgSrc,
                "nickname": this.nickname,
                "email": this.email,
                "apiId": 2
            };

            //로그인 or 가입
            axios
                .get("http://54.180.25.91:7777/customer/" + this.apiKey, {
                    validateStatus: function(status) {
                        // 상태 코드가 400 이상일 경우 거부. 나머지(400보다 작은)는 허용.
                        return status <= 400;
                    }
                })
                .then(res => {
                    if (res.data == "") {
                        console.log(this.apiData);
                        sessionStorage.setItem("apiData", JSON.stringify(this.apiData));
                        router.push('/customerregister');
                    } else {
                        sessionStorage.setItem("customer", JSON.stringify(res.data));
                        router.push('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onFailureGoogle,
    }
};