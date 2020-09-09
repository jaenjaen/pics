import axios from "axios";
var company = JSON.parse(sessionStorage.getItem("company"));

export default {
    name: "CompanyEdit",
    data() {
        return {
            name: "",
            pwMsg: "",
            pwFlag: false,
            password: "",
            checkpassword: "",
            address: "",
            addrShow: false,
            comId: "",
            tel: "",
            logoImg: "",
            logoName: "업체 이미지",
            desc: "",
            max: 13
        };
    },
    mounted() {
        if (company == null) {
            alert("로그인 후 이용 가능합니다.")
            location.href("http://localhost:9999/customerlogin");
        }
        this.name = company.name;
        this.address = company.address;
        this.comId = company.comId;
        this.tel = company.tel;
        this.logoImg = company.logoImg;
        this.desc = company.desc;
    },
    methods: {
        companyEdit: function() {
            if (this.pwFlag == true) {
                axios
                    .put("http://localhost:7777/company", {
                        name: this.name,
                        comId: this.comId,
                        password: this.password,
                        address: this.address,
                        tel: this.tel,
                        logoImg: this.logoImg,
                        description: this.desc
                    })
                    .then(res => {
                        console.log(res);

                        company.name = this.name;
                        company.password = this.password;
                        company.address = this.address;
                        company.tel = this.tel;
                        company.logoImg = this.logoImg;
                        company.description = this.description;

                        sessionStorage.setItem("company", JSON.stringify(company));

                        alert("회원정보가 수정되었습니다.");
                        //location.href = "http://localhost:9999/mypage";
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                alert("입력한 정보를 다시 한번 확인해주세요.");
            }
        }, //~companyEdit

        /* 비밀번호 확인 */
        checkPw: function() {
            if (this.password == this.checkpassword) {
                this.pwFlag = true;
                this.pwMsg = "";
            } else {
                this.pwMsg = "<p style='color:red;'>입력하신 비밀번호와 다릅니다.</p>";
                this.pwFlag = false;
            }
        }, //~checkPw
        /* 주소 모달 띄우기 */
        showModal: function() {
            this.$modal.show("postcodeModal");
        },
        /* 주소 검색완 */
        onComplete(data) {
            this.address = data.address;
            this.addrShow = true;
            this.$modal.hide("postcodeModal");
        },
        /* 주소 변경 */
        editAddr: function() {
            this.$modal.show("postcodeModal");
        },
        /* 전화번호 - 넣기 */
        insertDash() {
            if (this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel + "-";
        },

        /*회원탈퇴 */
        signout() {
            axios.delete("http://localhost:7777/company/" + this.comId)
                .then(res => {
                    console.log(res)
                    alert("회원탈퇴 되었습니다.");
                    sessionStorage.removeItem("company");
                    location.href = "http://localhost:9999";
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
};