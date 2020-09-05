<template>
  <div class="app">
    <!-- 대표사진/공간도면/포트폴리오별 기본 경로 + DB에서 가지고 온 파일 이름 -->
    <img :src="mainRoute+'20200906000006378_1234@admin.com.jpg'"><br/>
    <img :src="cadRoute+'20200906000006392_1234@admin.com.jpg'"><br/>
    <img :src="portRoute+'20200906000006408_1234@admin.com.jpg'"><br/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      /* 이미지 경로 */
      mainRoute: 'http://localhost:7777/upload/main/',
      cadRoute: 'http://localhost:7777/upload/cad/',
      portRoute: 'http://localhost:7777/upload/port/'
    }
  }
}
</script>