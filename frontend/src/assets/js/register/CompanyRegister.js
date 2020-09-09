import axios from "axios";

export default {
    name: "CompanyRegister",
    data() {
        return {
            idMsg: "",
            idFlag: false,
            pwMsg: "",
            pwFlag: false,
            addrShow: false,
            name: "",
            comId: "",
            password: "",
            checkpassword: "",
            address: "",
            tel: "",
            desc: "",
            imgSrc: "",
            logoName: "로고 이미지 업로드",
            max: 13,
            condata: ""
        };
    },
    methods: {

        /* 회원가입 */
        companyRegister: function() {
            if (this.idFlag == true && this.pwFlag == true) {
                axios
                    .post("http://localhost:7777/company", {
                        name: this.name,
                        comId: this.comId,
                        password: this.password,
                        address: this.address,
                        tel: this.tel,
                        description: this.desc
                    })
                    .then(response => {
                        this.condata = response.data;
                        alert(this.name + "의 가입을 환영합니다.");
                        location.href = "http://localhost:9999";
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                alert("입력한 정보를 다시 한번 확인해주세요.");
                //console.log(this.idFlag+","+this.pwFlag+","+this.name+","+this.comId+","+this.password+","+this.address+","+this.tel);
            }
        }, //~companyRegister

        /*메일 중복 검사*/
        checkEmail: function() {
            axios
                .get("http://localhost:7777/company/" + this.comId)
                .then(res => {
                    this.condata = res.data;
                    if (this.condata != "") {
                        this.idMsg =
                            "<p style='color:red;'>이미 사용중인 아이디입니다.</p>";
                        this.idFlag = false;
                    } else {
                        this.idMsg =
                            "<p style='color:green;'>사용 가능한 아이디입니다.</p>";
                        this.idFlag = true;
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }, //~checkEmail

        /*바밀번호 검사*/
        checkPw: function() {
            if (this.password == this.checkpassword) {
                this.pwFlag = true;
                this.pwMsg = "";
            } else {
                this.pwMsg = "<p style='color:red;'>입력하신 비밀번호와 다릅니다.</p>";
                this.pwFlag = false;
            }
        }, //~checkPw

        /*우편번호 모달*/
        showModal: function() {
            this.$modal.show("postcodeModal");
        },

        /*모달 닫기*/
        onComplete(data) {
            this.address = data.address;
            this.addrShow = true;
            this.$modal.hide("postcodeModal");
        },

        /*우편번호 수정*/
        editAddr: function() {
            this.$modal.show("postcodeModal");
        },

        /*전화번호 - 추가*/
        insertDash() {
            if (this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel + "-"
        },

        /* 이미지 업로드 관리 */
    }
};