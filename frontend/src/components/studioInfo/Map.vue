<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=91cbdca7243fe89cb44e5d61a5aaaf44&libraries=services,clusterer,drawing"></script>
<template>
<div id="container">
    <!-- 로드뷰 영역 입니다 -->
    <!--
        <vue-daum-map
            id="roadview" 
            :appKey="appKey"
            :center.sync="center"
            :level.sync="level"
            :mapTypeId="mapTypeId"
            :libraries="libraries"
            @load="onLoad"
            style="width:100%;height:500px;">
            </vue-daum-map>
        <div id="close" title="로드뷰닫기" onclick="closeRoadview()"><span class="img"></span></div>
     -->
    <!-- 지도를 표시할 div 입니다 -->
    
        <vue-daum-map
            :appKey="appKey"
            :center.sync="center"
            :level.sync="level"
            :mapTypeId="mapTypeId"
            :libraries="libraries"
            @load="onLoad"
            style="width:100%;height:500px;">
            </vue-daum-map>
        <div id="roadviewControl" onclick="setRoadviewRoad()"></div>
    
 </div>
    
</template>
<script>
import VueDaumMap from 'vue-daum-map'
// import axios from "axios";

export default {
    name: "Map",
    data: () => ({
        studios:[{}],
        appKey: '	91cbdca7243fe89cb44e5d61a5aaaf44', // 테스트용 appkey
        center: {lat:0, lng:0}, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: ["services","clusterer","drawing"], // 추가로 불러올 라이브러리
        map: null // 지도 객체. 지도가 로드되면 할당됨.
    }),
    components: {
        VueDaumMap
    },
    methods: {
    // 지도가 로드 완료되면 load 이벤트 발생
      onLoad (map) {
      // 1. 지도 생성
        this.map = map

      // 2. 마커를 생성
      var markerPosition  = new kakao.maps.LatLng(this.center.lat , this.center.lng); 
      var marker = new kakao.maps.Marker({
          position: markerPosition,
          draggable: true
      });
      
      marker.setMap(map);  // 지도 위에 마커 표시
      // 3. 주소-좌표 변환 객체를 생성
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch('서울특별시 마포구 서교동 월드컵북로4길 13', //this.studios[0].studioFilter.address
      function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({// 받은 위치를 마커로 표시
            map: map,
            position: coords
        });
      map.setCenter(coords);// 지도의 중심을 결과값으로 이동
          }
        })
      },
    //   maptypeid_changed(map){
    //     this.mapTypeId=VueDaumMap.MapTypeId.ROADVIEW;
	// 	map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW); 

	// 	// 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
	// 	map.setZoomable(false);   

	// 	//로드뷰를 표시할 div
	// 	var roadviewContainer = document.getElementById('roadview'); 

	// 	// 로드뷰 위치
	// 	var rvPosition = new kakao.maps.LatLng(37.56613, 126.97837);

	// 	//로드뷰 객체를 생성한다
	// 	var roadview = new kakao.maps.Roadview(roadviewContainer, {
	// 		panoId : 1050215190, // 로드뷰 시작 지역의 고유 아이디 값
	// 		panoX : 126.97837, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값
	// 		panoY : 37.56613, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값
	// 		pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
	// 		tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
	// 		zoom: -1 // 로드뷰 줌 초기값
	// 	}); 

    //   }
    },
    mounted() {
    //   axios
    //         .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
    //         .then(response => {
    //             this.studios = response.data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.errored = true;
    //         })
    //         .finally(() => (this.loading = false));
    },
}
</script>
