<template>
  <div class="app">
    <input type=file id="mainFile0" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile1" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile2" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile3" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile4" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile5" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile6" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile7" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile8" name="mainFiles" class="mainFiles"><br/>
    <input type=file id="mainFile9" name="mainFiles" class="mainFiles"><br/>
    <button @click="uploadMainImg">전송</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            studio: {
                categoryId: "",
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: "",
                studioFilter: {
                    size: "",
                    options: null,
                    parking: "",
                    unitPrice: "",
                    defaultCapacity: "",
                    excharge: "",
                    address: "",
                    maxCapacity: ""
                },
                schedule: {
                    repeatDate: []
                },
                tag: []
            }
        }
    }, methods: {
        uploadMainImg() {
            let formData = new FormData();
            let files = document.getElementsByName('mainFiles');
            let count = 0;
            for (let i = 0; i < files.length; i++) {
                if(typeof(files[i].files[0])=="undefined"){
                    count++;
                    continue;
                }
                formData.append("files", files[i].files[0]);
                console.log("파일 정보 : " + files[i].files[0]);
            }
            if(count==10){
                alert("대표 사진을 1장 이상 입력하세요.");
                return false;
            }
            axios.post('http://127.0.0.1:7777/filesUpload/main', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    console.log('성공');
                    console.log('파일명 : ' + response.data);
                    this.studio.mainImg = response.data; //공간도면 파일명 데이터 바인딩
                })
                .catch(() => {
                    console.log('실패');
                })
        }
    }
}
</script>