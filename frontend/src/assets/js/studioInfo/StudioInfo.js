import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import VModal from 'vue-js-modal'
// import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

import Reservation from "@/components/studioInfo/Reservation.vue"
import Bar from "@/assets/js/studioInfo/TimeChart.js";
// import Bar from "@/assets/js/studioInfo/DayChart.js";
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "materialize-css"

// import Map from "@/components/studioInfo/Map.vue"

Vue.use(VueMaterial)
Vue.use(VModal);

export default {
    name: "studio-info",
    components: { carousel, Reservation, Bar },
    props: {
        stuId: {
            type: String,
            default: ''
        },
    },
    event: 'studios',
    data: function() {
        return {
            // studio 관련 변수 (GET)
            customer: {},
            studios: [{
                categoryId: 0,
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: 0,
                studioFilter: {
                    size: 0,
                    options: null,
                    parking: 0,
                    unitPrice: 0,
                    defaultCapacity: 0,
                    excharge: 0,
                    address: "",
                    maxCapacity: 0
                },
                company: {
                    comId: 0,
                    name: "",
                    address: ""
                }
            }],
            tags: [{
                tagId: 0,
                tagName: ""
            }],
            isBooked: false, //북마크 id값 받았는지 나타내는 변수

            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false,

            //이미지 split 변수
            mainImgList: [],
            portImgList: [],

            // Chart
            datacollection: null,
            options: null,

            // 리뷰 페이징 변수
            reviews: [{}], // 전체 리뷰 데이터
            visibleReview: {}, // 화면에 노출되는 리뷰 데이터
            totalReviewsLength: 0, // 전체 리뷰 데이터 수
            cntReviews: 3, // 화면에 노출할 리뷰 데이터 수 (초기 세팅 = 3)
            dataFull: false, // 전체 데이터보다 많은 데이터 호출 여부

        };
    },

    async mounted() { //async mount로 비동기 처리
        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        this.customer = JSON.parse(sessionStorage.getItem('customer'));
        console.log("this.stuId : " + this.stuId);
        axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data;
                console.log(this.studios);
                // this.$emit('studios', this.studios);
                //메인 이미지 split
                let mainImgSplit = (this.studios[0].mainImg).split(',');
                let portImgSplit = (this.studios[0].mainImg).split(',')
                for (let i = 0; i < 10; i++) {
                    this.mainImgList.push(mainImgSplit[i]);
                }
                for (let i = 0; i < 4; i++) {
                    this.portImgList.push(portImgSplit[i]);
                }
                console.log("this.portImgList : " + this.portImgList);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

        axios
            .get("http://127.0.0.1:7777/studio/tags/" + this.stuId)
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.tags : " + this.tags);
        axios
            .get("http://127.0.0.1:7777/studio/accCustomer/" + this.stuId)
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.accCustomer : " + this.accCustomer);
        axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => {
                this.reviews = response.data;

                let temp = []
                for (var i = 0; i < this.cntReviews; i++) {
                    temp.push(this.reviews[i])
                }
                this.visibleReview = temp
                this.cntReviews = (this.reviews).length
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.reviews[0].reviewId : " + this.reviews[0].reviewId);
        if (this.customer != undefined) {
            axios
                .get("http://127.0.0.1:7777/bookmark/custId/" + this.customer.custId + "/stuId/" + this.stuId)
                .then(response => {
                    this.isBooked = Number(response.data.bookId);
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("this.isBooked : " + this.isBooked);
        }
    },
    filters: {
        currency: function(value) { // 숫자를 금액 형식으로
            if (!isNaN(value)) return value.toLocaleString();
            else return 0;
        },
        parking: function(value) {
            if (value) return "주차 가능";
            else return "주차 불가";
        },
        sizeUnit(size) { //m^2 >> 평 단위
            return (size * 0.3025).toFixed(1);
        },
        emailHide(value) { //이메일 아이디 가리기
            var id = value.split("@");
            if (id.length < 5) {
                return id + "****님"
            } else {
                return id.slice(0, 4) + "****님"
            }
        },
    },
    ////////////////////////////// Methods //////////////////////////////
    methods: {
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        // 찜 추가/제거 // axios 여러번 쓰기 때문에 async ~ await로 에러 제거
        async setBookMark() {
            try {
                const bookmark = await axios.get("http://127.0.0.1:7777/bookmark/custId/" + this.customer.custId + "/stuId/" + this.stuId)
                if (bookmark.data) { //찜목록에 있다면
                    await axios.delete("http://127.0.0.1:7777/bookmark/" + bookmark.data.bookId);
                    // alert(deleteStatus.data); // 에러 페이지용
                    this.$modal.show("delBook");
                    this.isBooked = false;
                    //$event.target.src = require("@/assets/img/util/heart.svg")
                } else { // 찜목록에 없다면
                    let regBookmark = {
                        studio: {
                            stuId: this.stuId
                        },
                        customer: {
                            custId: this.customer.custId
                        }
                    };
                    await axios.post("http://127.0.0.1:7777/bookmark", regBookmark);
                    // alert(insertStatus.data); // 에러 페이지용
                    this.$modal.show("regBook");
                    this.isBooked = true;
                    //$event.target.src = require("@/assets/img/util/fullheart.svg");
                }
            } catch (error) {
                console.error(error);
            }
        },
        isEmpty(value) {
            if (value == "" || value == null || value == undefined || (value != null &&
                    typeof value == "object" && !Object.keys(value).length)) {
                return true
            } else return false
        },
        closePop() {
            this.$modal.hide("delBook");
            this.$modal.hide("regBook");
            this.$modal.hide("login-required");
        },
        appendReviews() {
            // 전체 리뷰 개수보다 노출되는 리뷰 개수가 작은 경우
            if (this.cntReviews < this.totalReviewsLength) {
                this.cntReviews += 3 // 노출 리뷰 개수 3개 증가
                let temp = []
                for (var i = 0; i < this.cntReviews; i++) {
                    temp.push(this.reviews[i]) // 전체 리뷰에서 노출 리뷰 개수만큼 데이터 추출하여 temp에 저장
                }
                this.visibleReview = temp // 전체 리뷰 개수와 노출되는 리뷰 개수가 같으면
                    // news 객체에 data 배열 업데이트

            } else {
                this.dataFull = true // dataFull 객체를 true 상태로 변경
                alert('List items are fully loaded!') // 모든 데이터 출력 알림
            }
        }
    }
};