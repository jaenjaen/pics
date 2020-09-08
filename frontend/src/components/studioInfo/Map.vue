<template>
 <div id="map"></div>
</template>
<script>
import VueDaumMap from 'vue-daum-map'
import loadScriptOnce from 'load-script-once';
  const EVENTS = [
    'center_changed',
    'zoom_start',
    'zoom_changed',
    'bounds_changed',
    'click',
    'dblclick',
    'rightclick',
    'mousemove',
    'dragstart',
    'drag',
    'dragend',
    'idle',
    'tilesloaded',
    'maptypeid_changed'
  ];

  //   const MapTypeId = {
  //   "ROADMAP": 1,
  //   "NORMAL": 1,
  //   "SKYVIEW": 2,
  //   "HYBRID": 3,
  //   "OVERLAY": 4,
  //   "ROADVIEW": 5,
  //   "TRAFFIC": 6,
  //   "TERRAIN": 7,
  //   "BICYCLE": 8,
  //   "BICYCLE_HYBRID": 9,
  //   "USE_DISTRICT": 10
  // };
  export default {
    name: "VueDaumMap",
    props: {
      // appKey: {
      //   type: String,
      //   required: true,
      // },
      libraries: {
        type: Array,
        default: () => []
      },
      center: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: 3
      },
      mapTypeId: {
        type: Number,
        default: 1
      },
      draggable: {
        type: Boolean,
        default: true
      },
      scrollwheel: {
        type: Boolean,
        default: false
      },
      disableDoubleClick: {
        type: Boolean,
        default: false
      },
      disableDoubleClickZoom: {
        type: Boolean,
        default: true
      },
      projectionId: {
        type: String,
        default: null
      },
    },
    data: () => ({
        // appKey: '0e41243b4bb80fef37c1383bd1bdcb7c', // 테스트용 appkey
        // center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
        // libraries:[],
        // level: 3, // 지도의 레벨(확대, 축소 정도),
        // mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        map: null // 지도 객체. 지도가 로드되면 할당됨.
    }),
    mounted () {
        loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0e41243b4bb80fef37c1383bd1bdcb7c&libraries=services,clusterer,drawing`)
        .then(() => {
          // console.log("mounted.then~!!");
          // daum.maps.load(() => {
          //   this.render();
          //   this.bindEvents();
          //   this.$emit('load', this.map);
          // });
          var container = document.getElementById('map'),
              options = {
                  center: new kakao.maps.LatLng(33.450701, 126.570667),
                  level: 3
              };
          
          var map = new kakao.maps.Map(container, options);

          kakao.maps.load(function() {
              // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
              var map = new kakao.maps.Map(node, options);
          });
        })
        .catch(err => {
          console.error(err);
           });
        },
      watch: {
        level () {
          if (!this.map) {
            return "Nothing Map Area";
          }
          this.map.setLevel(this.level);
        },
        center : {
          handler () {
            if (!this.map) {
              return;
            }
            this.map.setCenter(new daum.maps.LatLng(this.center.lat, this.center.lng));
          },
          deep: true
        }
      },
    methods: {
          onLoad (map) {
            this.map = map
        },
      render () {
        console.log("render.start~!!");
        const options = { //지도를 생성할 때 필요한 기본 옵션
          center: new daum.maps.LatLng(this.center.lat, this.center.lng), //지도의 중심좌표.
          level: this.level, //지도의 레벨(확대, 축소 정도)
          mapTypeId: VueDaumMap.MapTypeId.NORMAL, //지도 타입
          draggable: this.draggable,
          scrollwheel: this.scrollwheel,
          disableDoubleClick: this.disableDoubleClick,
          disableDoubleClickZoom: this.disableDoubleClickZoom,
          projectionId: this.projectionId,
          tileAnimation: this.tileAnimation,
          keyboardShortcuts: this.keyboardShortcuts
        };
        this.map = new daum.maps.Map(this.$el, options); //지도 생성 및 객체 리턴
        console.log("render this.map : "+this.map);
      },
      bindEvents () {
        const handlers = {
          bounds_changed: this.onChange,
          idle: this.onChange
        };
        for (let event of EVENTS) {
          this.bindEvent(event, handlers[event]);
        }
      },
      bindEvent (event, handler) {
        daum.maps.event.addListener(this.map, event, (...args) => {
          this.$emit(event, args);
          if (typeof handler === 'function') {
            handler();
          }
        });
      },
      onChange () {
        const level = this.map.getLevel();
        const latlng = this.map.getCenter();
        this.$emit('update:level', level);
        this.$emit('update:center', {
          lat: latlng.getLat(),
          lng: latlng.getLng()
        });
      }

    },
    // MapTypeId: this.MapTypeId
  }
</script>