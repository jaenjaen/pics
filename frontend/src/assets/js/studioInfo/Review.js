import axios from "axios"; //axios
import Vue from 'vue'
import VueMaterial, { MdCard } from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "materialize-css"


Vue.use(VueMaterial)

export default {
    name: "Review",
    props: [
        "stuIdData"
    ],
    component: [MdCard],
    data: function() {
        return {
            stuId: 0,
            studios: [{}],

            // 상태 체크 변수
            loading: true,
            errored: false,

            // 리뷰 페이징 변수
            reviews: [{
                reviewId: 0,
                customer: {},
                studio: {},
                resId: 0,
                score: 0,
                content: "",
                img: "",
                regDate: "",
                answer: ""
            }], // 전체 리뷰 데이터
            uncoveredReview: {}, // 화면에 노출되는 리뷰 데이터
            allReviewLength: 0, // 전체 리뷰 데이터 수
            cntReviews: 3, // 화면에 노출할 리뷰 데이터 수 (초기 세팅 = 3)
            dataFull: false, // 전체 데이터보다 많은 데이터 호출 여부
        };
    },
    created: function() {
        this.stuId = this.stuIdData;
    },
    async mounted() { //async mount로 비동기 처리
        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        await axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        await axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => {
                this.reviews = response.data;
                if (this.reviews.length > this.cntReviews) {
                    let temp = []
                    for (var i = 0; i < this.cntReviews; i++) {
                        console.log("this.reviews : " + this.reviews[i] + this.cntReviews)
                        temp.push(this.reviews[i]);
                    }
                    this.uncoveredReview = temp
                    this.allReviewLength = (this.reviews).length
                } else {
                    this.uncoveredReview = this.reviews
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
    filters: {
        emailHide(value) { //이메일 아이디 가리기
            var id = value.split("@")[0];
            if (id.length < 5) {
                return id + "****님"
            } else {
                return id.slice(0, 4) + "****님"
            }
        },
    },

    ////////////////////////////// Methods //////////////////////////////
    methods: {
        /* 문의 영역 끝 */
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        appendReviews() {
            // 전체 리뷰 개수보다 노출되는 리뷰 개수가 작은 경우
            if (this.cntReviews < this.allReviewLength) {
                this.cntReviews += 3; // 노출 리뷰 개수 3개 증가
                let temp = []
                for (var i = 0; i < this.cntReviews; i++) {
                    temp.push(this.reviews[i]); // 전체 리뷰에서 노출 리뷰 개수만큼 데이터 추출하여 temp에 저장
                }
                this.uncoveredReview = temp; // 전체 리뷰 개수와 노출되는 리뷰 개수가 같으면
                // review 객체에 data 배열 업데이트
            } else {
                this.dataFull = true; // dataFull 객체를 true 상태로 변경
                alert('마지막 리뷰입니다.'); // 모든 데이터 출력 알림
            }
        }
    }
}