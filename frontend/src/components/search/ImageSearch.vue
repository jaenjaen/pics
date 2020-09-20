<template>
    <div class="uploadArea">
        <input type=file id="cadFile" name="cadFile" class="cadFile" 
        @change="handleImgFileSelect('cadFile', 'cadImg', 'cadFileBtn', $event)" style='display: none;'> 
        <i class="material-icons" id="cadImg" onclick='document.getElementById("cadFile").click()'>add_a_photo</i>
        <button type="button" id="cadFileBtn" class="uploadResetBtn" 
        @click="resetUploadImg('cadFile', 'cadImg', 'cadFileBtn', 'cad')">삭제</button>
    </div>
</template>

<script scoped>
import axios from "axios";
export default {
    name: "uploadImg",
    data () {
        return {
            predicted:"",
            recommanded: "",
            // 이미지
            cad: 'http://localhost:7777/upload/default/cad.png',
        }
    },
    mounted() {

    },
    methods : {
        uploadImg(e) {
            let image = e.target.files[0];
            alert(image);
            let formData = new FormData();
            formData.append("image", image);
            alert(formData)
            axios
                .post('http://127.0.0.1:5000/imageSearch',formData)
                .then((response) => {
                    alert(response.data);
                })
                .catch(() => {
                    console.log('실패');
                })
                .finally(() => {
                    
                });
        },
        /* 파일 업로드 화면단 처리 */
        handleImgFileSelect(fileId, imgId, btnId, e) {
            var thisFileId = document.getElementById(fileId);
            var thisImgId = document.getElementById(imgId);
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);

            if (thisFileId.value != "") {
                filesArr.forEach(function(f) {
                        /* 확장자 제한 */
                        if (!f.type.match("image.*")) {
                            alert("확장자는 이미지 확장자만 가능합니다.");
                            thisFileId.value = "";
                            return false;
                        }

                        /* 용량 제한 */
                        var fileSize = thisFileId.files[0].size;
                        var maxSize = 5 * 1024 * 1000;
                        if (fileSize > maxSize) {
                            alert("파일용량 5MB을 초과했습니다.");
                            thisFileId.value = "";
                            return false;
                        }

                        /* 업로드 이미지 미리보기 */
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            thisImgId.setAttribute("src", e.target.result);
                        }
                        reader.readAsDataURL(f);

                        /* 파일 업로드 리셋 버튼 보이기 */
                        var uploadBtn = document.getElementById(btnId);
                        uploadBtn.setAttribute("style", "display: inline-block");

                    }) //forEach
            } //if
            this.uploadImg(e);
        },

        /* 업로드 이미지 삭제 */
        resetUploadImg(fileId, imgId, btnId, img) {
            alert("업로드한 이미지를 삭제합니다.");

            /* 파일 업로드된 파일을 삭제해서 리셋시킴 */
            document.getElementById(fileId).value = '';

            /* 파일 업로드 디폴트 이미지로 바꿈 */
            var thisImgId = document.getElementById(imgId);
            if (img === 'main') {
                thisImgId.setAttribute("src", this.main);
            } else if (img === 'cad') {
                thisImgId.setAttribute("src", this.cad);
            } else if (img === 'port') {
                thisImgId.setAttribute("src", this.port);
            }


            /* 파일 업로드 리셋 버튼 숨김 */
            var thisBtnId = document.getElementById(btnId);
            thisBtnId.setAttribute("style", "display: none");
        },
    }
}
</script>

<style scoped>
.uploadResetBtn {
            position: absolute;
            top: 87%;
            left: 50%;
            width: 110%;
            height: 30%;
            transform: translate(-50%, -50%);
            text-align: center;
            background: transparent;
            background: #aaa;
            color: #000000;
            opacity: 0.70;
            font-weight: bold;
            font-size: 12px;
            border: none;
            border-radius: 0;
            padding: 0px 0px;
            display: none;
        }
</style>