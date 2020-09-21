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
            max: 13,
        };
    },
    mounted() {
        if (company == null) {
            alert("로그인 후 이용 가능합니다.")
            location.href = "/customerlogin";
        }
        this.name = company.name;
        this.address = company.address;
        this.comId = company.comId;
        this.tel = company.tel;
        this.logoImg = company.logoImg;
        this.logoName = company.logoImg.split("/")[5];
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
                        location.href = "/mypage";
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
            this.deleteImg(); {
                axios.delete("http://localhost:7777/company/" + this.comId)
                    .then(res => {
                        console.log(res)
                        alert("회원탈퇴 되었습니다.");
                        sessionStorage.removeItem("company");
                        location.href = "/";
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        /*이미지 업로드 관리 */
        onFileChange(fileId, e) {
            var files = e.target.files || e.dataTransfer.files;
            var inputBox = document.getElementById(fileId);
            var maxSize = 5 * 1024 * 1000;
            var imgPath = [];

            //이미지가 있을 경우만 삭제
            if (this.logoImg != "") this.deleteImg();

            //용량제한
            if (files.size > maxSize) {
                alert("파일용량 5MB을 초과하였습니다.");
                return false;
            }

            imgPath = inputBox.value.split("\\");
            this.logoName = imgPath[2];

            this.uploadLogoImg();
        }, //~onfileChange

        /* 프로필 사진 수정 업로드 */
        uploadLogoImg() {
            var data = new FormData();
            var file = this.$refs.logoImg.files[0];
            data.append('file', file);

            axios.post('http://localhost:7777/fileUpload/company/' + this.comId, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then(res => {
                    console.log(res);
                    this.logoImg = "http://localhost:7777/upload/company/" + res.data;
                    console.log(this.logoImg);
                })
                .catch(err => {
                    console.log(err);
                })
        }, //~uploadImg

        /*기존 로고 이미지 삭제 */
        deleteImg() {
            if (this.logoImg != "") {
                axios.delete("http://localhost:7777/filedelte/company/" + this.logoName)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    },
};