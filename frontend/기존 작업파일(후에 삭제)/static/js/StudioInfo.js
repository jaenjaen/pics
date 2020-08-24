var information_area = new Vue({
    el: "#app ",
    data() {
        return {
            infos: [],
            stuid: 0,
            loading: true,
            errored: false,
            bookmark: 0,
            reviews: [],
            tags: [],
            inavailabeDate: [],
            availabeDate: []
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/getStudioInfo/10')
            .then(response => (this.infos = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/checkBookmark/3/10')
            .then(response => (this.bookmark = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getStudioReviews/10')
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getTags/10')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getSchedules/10')
            .then(response => (this.schedule = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })

    },
    methods: {
        reservation_floating() {},
        map() {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };
            // 지도를 표시할 div와지도 옵션으로  지도를 생성
            var map = new kakao.maps.Map(mapContainer, mapOption);
            // 마커가 표시될 위치
            var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            // 마커를 생성
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });
            // 마커를 지도 위에 표시
            marker.setMap(map);
        }
    }
})

var currentPosition = parseInt($("#reservation-floating-banner").css("top")) - 350;
$(window).scroll(function() {
    var position = $(window).scrollTop();
    $("#reservation-floating-banner").stop().animate({
        "top": `${position + currentPosition}px`
    }, 0);
});