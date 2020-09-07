<template> 
<div id="map"></div> 
</template>

<script>
export default {
    mounted() { window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); },
    methods: {
        initMap() {
            var container = document.getElementById('map');
            var options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 };
            var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다. 
            var marker = new kakao.maps.Marker({ position: map.getCenter() });
            marker.setMap(map);
        },
        addScript() {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=91cbdca7243fe89cb44e5d61a5aaaf44';
            document.head.appendChild(script);
        }
    }
}
</script>
