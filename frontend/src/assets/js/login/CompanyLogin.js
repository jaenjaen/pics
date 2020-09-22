import LoginHeader from "@/components/LoginHeader.vue";
import axios from "axios";
import router from "../../../router";

export default {
    name: "customerLogin",
    components: {
        LoginHeader
    },
    data() {
        return {
            comId: "",
            password: "",
            rdata: [],
            err: "",
        };
    },
    methods: {
        companyLogin: function() {
            axios
                .get(
                    "http://localhost:7777/company/" + this.comId + "/" + this.password
                )
                .then(res => {
                    this.rdata = res.data;
                    if (this.rdata != "") {
                        sessionStorage.setItem("company", JSON.stringify(this.rdata));
                        router.push('/');
                    }
                })
                .catch(e => {
                    console.log(e)
                    alert("가입하지 않은 아이디이거나, 잘못된 비밀번호 입니다.");
                });
        }
    }
};