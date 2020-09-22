import axios from "axios";

export default {
    name: "CustomerRegister",
    data() {
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
            picked: ""
        }
    },
    mounted() {
        var apiData = JSON.parse(sessionStorage.getItem("apiData"));
        console.log(apiData);
        this.apiId = apiData.apiId;
        this.apiKey = apiData.apiKey;
        this.imgSrc = apiData.imgSrc;
        this.nickname = apiData.nickname;
        this.email = apiData.email;
        console.log(this.apiId + "," + this.apiKey + "," + this.imgSrc + "," + this.nickname + "," + this.email);

    },
    methods: {
        customerRegister: function() {
            axios
                .post('http://54.180.25.91:7777/customer', {
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
                    alert(this.nickname + " 님의 가입을 환영합니다.");
                    location.href = "/"
                })
                .catch(e => {
                    console.log(e)
                })
        },
        insertDash() {
            if (this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel + "-"
        }
    }
}