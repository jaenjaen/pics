import axios from "axios"; //axios
import Vue from 'vue'

/* css, 템플릿 라이브러리 */
import carousel from "vue-owl-carousel"; //캐러셀
import VModal from 'vue-js-modal'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "materialize-css"
import Clipboard from 'v-clipboard'

/* 연결된 컴포넌트 */
import Chat from "@/components/chat/Chat.vue"; //문의
import Map from "@/components/studioInfo/Map.vue"
import Reservation from "@/components/studioInfo/Reservation.vue"
import TimeChart from "@/assets/js/studioInfo/TimeChart.js";
import DayChart from "@/assets/js/studioInfo/DayChart.js";
import OtherStudio from "@/components/studioInfo/OtherStudio.vue"
import Review from "@/components/studioInfo/Review.vue"

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
        OtherStudio,
        Review
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
                    console.log("this.mainImgList : " + this.mainImgList)
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
            .then(response => {
                if (response.data < 1) {
                    this.accCustomer = 0;
                } else {
                    this.accCustomer = response.data;
                }

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
        substring: function(value) {
            if (value.length > 23) {
                return value.substring(0, 20) + "...";
            }
            return value;
        }
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
        showChatModal: function() {
            if (this.customer === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                this.$refs.chat.setChatSubscribe('on'); //채팅 구독 여부 on
                this.$refs.chat.setChat(this.stuId, this.customer.custId);
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
                this.moveToScrollBottom();
            }
        },
        hideChatModal: function() {
            this.$refs.chat.setChatSubscribe('off'); //채팅 구독 여부 off
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
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
        profilUrl(profil) {
            return require("@/assets/img/company_image/" + profil);
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

        // 링크 공유 관련 메서드
        clipboardSuccessHandler() {
            this.$modal.show("copy-link-success");
        },

        clipboardErrorHandler() {
            this.$modal.show("copy-link-error");
        }
    }
}