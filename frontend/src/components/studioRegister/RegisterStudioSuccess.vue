<template>
  <div class="app">
      <img src="pics/src/main/webapp/upload/default/preview.png">
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            path: {
                main: '',
                cad: '',
                port: '',
                default: ''
            }
        }
    }, 
    created() {
        axios.get('http://127.0.0.1:7777/getPath/main')
            .then((response) => {
                console.log('대표사진 경로 가져오기 성공');
                console.log(response.data);
                this.path.main = response.data;
            })
            .catch(() => {
                console.log('대표사진 경로 가져오기 실패');
            })
        
        axios.get('http://127.0.0.1:7777/getPath/cad')
            .then((response) => {
                console.log('공간도면 경로 가져오기 성공');
                console.log(response.data);
                this.path.cad = response.data;
            })
            .catch(() => {
                console.log('공간도면 경로 가져오기 실패');
            })

        axios.get('http://127.0.0.1:7777/getPath/port')
            .then((response) => {
                console.log('포트폴리오 경로 가져오기 성공');
                console.log(response.data);
                this.path.port = response.data;
            })
            .catch(() => {
                console.log('포트폴리오 경로 가져오기 실패');
            })

        axios.get('http://127.0.0.1:7777/getPath/default')
            .then((response) => {
                console.log('디폴트 경로 가져오기 성공');
                console.log(response.data);
                this.path.default = response.data;
            })
            .catch(() => {
                console.log('디폴트 경로 가져오기 실패');
            })
    }
}
</script>