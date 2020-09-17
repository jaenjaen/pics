import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import VModal from 'vue-js-modal'
import VueMaterial from 'vue-material'
import Reservation from "@/components/studioInfo/Reservation.vue"
import TimeChart from "@/assets/js/studioInfo/TimeChart.js";
import DayChart from "@/assets/js/studioInfo/DayChart.js";
import Map from "@/components/studioInfo/Map.vue"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "materialize-css"
import Chat from "@/components/chat/Chat.vue"; //문의
import Clipboard from 'v-clipboard'
import OtherStudio from "@/components/studioInfo/OtherStudio"

Vue.use(Clipboard)
Vue.use(VueMaterial)
Vue.use(VModal);

export default {
    name: "studio-info",
    components: {
        carousel,
        Reservation,
        TimeChart,
        DayChart,
        Map,
        Chat,
        OtherStudio
    },
    event: 'studios',
    data: function() {
        return {
            // studio 관련 변수 (GET)
            customer: {},
            stuId: this.$route.params.stuId,
            studios: [{
                categoryId: 0,
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: 0,
                avgScore: 0,
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
            uncoveredReview: {}, // 화면에 노출되는 리뷰 데이터
            allReviewLength: 0, // 전체 리뷰 데이터 수
            cntReviews: 3, // 화면에 노출할 리뷰 데이터 수 (초기 세팅 = 3)
            dataFull: false, // 전체 데이터보다 많은 데이터 호출 여부
        };
    },
    async mounted() { //async mount로 비동기 처리
        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        this.customer = JSON.parse(sessionStorage.getItem('customer'));
        axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data;
                // 메인 이미지 split
                if (this.studios[0].mainImg.match(",")) {
                    let mainImgSplit = (this.studios[0].mainImg).split(',');
                    for (let i = 0; i < Object.keys(mainImgSplit).length; i++) {
                        this.mainImgList.push(mainImgSplit[i]);
                    }
                } else {
                    this.mainImgList.push(this.studios[0].mainImg)
                }

                // 포폴 이미지 자르기 
                if (this.studios[0].portImg.match(",")) {
                    let portImgSplit = (this.studios[0].portImg).split(',');
                    for (let i = 0; i < Object.keys(portImgSplit).length; i++) {
                        this.portImgList.push(portImgSplit[i]);
                    }
                } else {
                    this.portImgList.push(this.studios[0].portImg)
                }
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
        axios
            .get("http://127.0.0.1:7777/studio/accCustomer/" + this.stuId)
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        await axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => {
                this.reviews = response.data;
                let temp = []
                for (var i = 0; i < this.cntReviews; i++) {
                    temp.push(this.reviews[i]);
                }
                this.uncoveredReview = temp
                this.allReviewLength = (this.reviews).length
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
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
        }
    },
    filters: {
        currency: function(value) {
            let num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        },
        parking: function(value) {
            if (value) return "주차 가능";
            else return "주차 불가";
        },
        sizeUnit(size) { // m^2 : 평 단위
            return (size * 0.3025).toFixed(1);
        },
        sizePoint(value) {
            return value.toFixed(2);
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
    computed: {
        getUrl: function() {
            var link = (document.location.href).split("#");
            return link[0];
        }
    },
    ////////////////////////////// Methods //////////////////////////////
    methods: {
        /* 문의 영역 시작 */
        showChatMoal: function() {
            if (this.customer === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                this.$refs.chat.setChat(this.stuId, this.customer.custId);
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
                this.moveToScrollBottom();
            }
        },
        hideChatModal: function() {
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
            window.location.reload(); //새로고침
        },
        /* 스크롤을 최하단으로 옮김 */
        moveToScrollBottom() {
            setTimeout(function() {
                var length = document.getElementById('chatContent').scrollHeight;
                document.getElementById('chatContent').scrollTop = length;
            }, 100);
        },
        /* 문의 영역 끝 */
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        profilUrl(profile) {
            return require("@/assets/img/company_image/" + profile);
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
                    // $event.target.src = require("@/assets/img/util/heart.svg")
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
                    // $event.target.src = require("@/assets/img/util/fullheart.svg");
                }
            } catch (error) {
                console.error(error);
            }
        },
        closePop() {
            this.$modal.hide("delBook");
            this.$modal.hide("regBook");
            this.$modal.hide("login-required");
            this.$modal.hide("copy-link-success");
            this.$modal.hide("copy-link-error");
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
        },
        // 지도 관련 메서드
        roadView() {
            window.open("https://map.kakao.com/link/roadview/37.5571792,126.919226"); //+ this.center.lat + this.center.lng;
        },
        onLoad(map) {
            this.map = map
        },
        // 링크 공유 관련 메서드
        clipboardSuccessHandler() {
            this.$modal.show("copy-link-success");
        },

        clipboardErrorHandler() {
            this.$modal.show("copy-link-error");
        }
    }
}