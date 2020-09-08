<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=91cbdca7243fe89cb44e5d61a5aaaf44"></script>
<template>
    <vue-daum-map
    :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:500px;height:400px;"/>
</template>
<script>
import VueDaumMap from 'vue-daum-map'
export default {
    name: "Map",
    data: () => ({
        appKey: '	91cbdca7243fe89cb44e5d61a5aaaf44', // 테스트용 appkey
        center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: [], // 추가로 불러올 라이브러리
        map: null // 지도 객체. 지도가 로드되면 할당됨.
    }),
    components: {
        VueDaumMap
    },
    methods: {
        // 지도가 로드 완료되면 load 이벤트 발생
        onLoad (map) {
            this.map = map
            var markerPosition  = new kakao.maps.LatLng(this.center.lat , this.center.lng); 
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        }
    }
}
</script>
