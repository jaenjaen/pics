<template>
  <div class="app">
    <input type=file id="portFile1" name="files[11]" class="files"> 
    <button @click="uploadFile">전송</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{

        }
    }, methods: {
        uploadFile(){
            let formData = new FormData();
            var file = document.querySelector('.files');
            formData.append("files", file.files[0]);
            console.log(file.files[0]);
            axios.post('http://127.0.0.1:7777/imageUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(function(response) {
                    console.log(response.data);
                    console.log('성공');
                })
                .catch(function() {
                    console.log('실패');
                });
        }
    },
}
</script>