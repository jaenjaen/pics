import axios from "axios";
var customer = JSON.parse(sessionStorage.getItem("customer"));

export default {
    name: "CustomerEdit",
    data() {
        return {
            custId: -1,
            nickname: "",
            imgSrc: "",
            imgName: "프로필 사진 이미지",
            tel: "",
            job: "",
            max: 13,
        }
    },
    mounted() {
        console.log(customer);
        this.custId = customer.custId;
        this.imgSrc = customer.imgSrc;
        this.nickname = customer.nickname;
        this.tel = customer.tel;
        this.job = customer.job;
    },
    methods: {
        customerEdit: function() {
            axios
                .put('http://localhost:7777/customer', {
                    custId: this.custId,
                    imgSrc: this.imgSrc,
                    nickname: this.nickname,
                    tel: this.tel,
                    job: this.job
                })
                .then(res => {
                    //console.log(res);
                    if (res != null) {
                        customer.custId = this.custId;
                        customer.imgSrc = this.imgSrc;
                        customer.nickname = this.nickname;
                        customer.tel = this.tel;
                        customer.job = this.job;
                        sessionStorage.setItem("customer", JSON.stringify(customer));
                        alert("정보가 수정되었습니다.");
                        location.href = "/mypage";
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },

        /* 전화번호 - 넣기 */
        insertDash() {
            if (this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel + "-"
        },

        /* 탈퇴 */
        signout: function() {
            axios.delete("http://localhost:7777/customer/" + this.custId)
                .then(res => {
                    if (res != null) {
                        alert("회원탈퇴 되었습니다.");
                        sessionStorage.removeItem("customer");
                        location.href = "/";
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }, //~signout

        /*이미지 업로드 관리 */
        onFileChange(fileId, e) {
            var files = e.target.files || e.dataTransfer.files;
            var inputBox = document.getElementById(fileId);
            var maxSize = 5 * 1024 * 1000;
            var imgPath = [];

            //이미지가 있을 경우만 삭제
            if (this.imgSrc != "") this.deleteImg();

            //용량제한
            if (files.size > maxSize) {
                alert("파일용량 5MB을 초과하였습니다.");
                return false;
            }

            imgPath = inputBox.value.split("\\");
            this.imgName = imgPath[2];

            this.uploadLogoImg();
        }, //~onfileChange

        /* 프로필 사진 수정 업로드 */
        uploadLogoImg() {
            var data = new FormData();
            var file = this.$refs.profileImg.files[0];
            data.append('file', file);

            axios.post('http://localhost:7777/fileUpload/customer/' + this.custId, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    console.log(res);
                    this.imgSrc = "http://localhost:7777/upload/customer/" + res.data;
                    console.log(this.imgSrc);
                })
                .catch(err => {
                    console.log(err);
                })
        }, //~uploadImg

        /*기존 로고 이미지 삭제 */
        deleteImg() {
            if (this.imgSrc != "") {
                axios.delete("http://localhost:7777/filedelte/customer/" + this.imgName)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        } //~deleteImg
    }
}