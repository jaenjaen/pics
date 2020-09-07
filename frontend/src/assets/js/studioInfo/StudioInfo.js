import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import VModal from 'vue-js-modal'
import VueMaterial from 'vue-material'
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
            bookmarkCheck: 0, //북마크 id값 받은 변수

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
                .get("http://127.0.0.1:7777/studio/getBookmark/" + this.customer.custId + "/" + this.stuId)
                .then(response => (this.bookmarkCheck = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("this.bookmarkCheck : " + this.bookmarkCheck);
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
        // imgUrl(imgName) {
        //     return require("@/assets/img/studio/" + imgName);
        // },
        bookmarkChange() {
            if (this.customer != undefined) {
                if (this.bookmarkCheck != 0) { //찜한적 있다면 찜 목록 해제 
                    axios
                        .delete("http://127.0.0.1:7777/bookmark/" + this.bookmarkCheck)
                        .then(() => {
                            this.bookmarkCheck = 0;
                            this.$modal.show("delBook");
                        })
                        .catch(error => {
                            console.log(error);
                            this.errored = true;
                        })
                        .finally(() => (this.loading = false));
                } else { //찜한적 없다면 찜 목록 등록
                    let bookmark = {
                        studio: {
                            stuId: this.stuId
                        },
                        customer: {
                            custId: this.customer.custId
                        }
                    };
                    axios
                        .post("http://127.0.0.1:7777/bookmark/", bookmark)
                        .then(() => {
                            this.$modal.show("regBook");
                        })
                        .catch(error => {
                            console.log(error);
                            this.errored = true;
                        })
                        .finally(() => (this.loading = false));
                }
            } else {
                this.$modal.show("login-required");
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