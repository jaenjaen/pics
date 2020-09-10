<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=91cbdca7243fe89cb44e5d61a5aaaf44&libraries=services,clusterer,drawing"></script>
<template>
    <div id="map">   
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:100%;height:250px;"/>
    <button id="roadView" @click="roadView()">로드뷰</button>
    </div>
</template>
<script>
import VueDaumMap from "vue-daum-map";
import axios from "axios"; //axios

export default {
    name: "Map",
    data: () => ({
        appKey: '	91cbdca7243fe89cb44e5d61a5aaaf44', // 테스트용 appkey
        center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: ["services","clusterer","drawing"], // 추가로 불러올 라이브러리
        map: null // 지도 객체. 지도가 로드되면 할당됨.
    }),
    components: {
        VueDaumMap,axios
    },
    methods: {
        onLoad (map) {// 지도가 로드 완료되면 load 이벤트 발생
            this.map = map
            var markerPosition  = new kakao.maps.LatLng(this.center.lat , this.center.lng); 
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition,
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        
            // 3. 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch('서울특별시 마포구 서교동 월드컵북로4길 13', //studios[0].studioFilter.address
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
        },roadView(){
            window.open("https://map.kakao.com/link/roadview/37.5571792,126.919226"); //+this.center.lat+this.center.lng;
        }
    },
    mounted() {  
        axios
        .get("http://127.0.0.1:7777/studio/info/10")// + this.stuId)
        .then(response => {
            this.studios = response.data;
        })
        .catch(error => {
            console.log(error);
            this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
        
}

</script>
<style scoped>
#map{
    align-content: center;
}
#roadView {
    display: block;
    float: right;
    margin: 10px auto;
    font-size: 1.3em;
    background-color: white;
    color: #029BE0;
    border: 1.5px solid lightgray;
    padding: 5px 7px 5px 7px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
}

#roadView:hover {
    background-color: #029BE0;
    border: none;
    color: #fff;
}
</style>>