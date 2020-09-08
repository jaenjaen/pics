<template>
  <div id="map" style="width:80%;height:400px;"></div>
</template>

<script>
import loadScriptOnce from 'load-script-once';
import VueDaumMap from 'vue-daum-map';

export default{
  data(){

  },
  mounted() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 
  },
}

 
</script>
<style scoped>
</style>