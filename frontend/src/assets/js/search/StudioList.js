import axios from "axios";
import Vue from "vue";
import {
    BCollapse
} from "bootstrap-vue";
import {
    VBToggle
} from "bootstrap-vue";
import VModal from 'vue-js-modal'

Vue.use(VModal);
Vue.directive("b-toggle", VBToggle);
Vue.component("b-collapse", BCollapse);

// 카테고리 변한을 위한 리스트
// Vue 시작
export default {
    name: "studio-list",
    props: ["filters"],
    data() {
        return {
            // Axios 전체 리스트 변수
            studios: [],

            //별점
            score: 0,

            //무한스크롤링 변수
            isDone: true, // 무한스크롤링 끝냄 & 스크롤바가 내려가서 무한 검색하는 것 방지
            doSearch: false, //true면 loading 중, false면 끝

            //bookmark 변수
            doBookMark: true, //찜 클릭 시, 상세페이지로 못 넘어가게 하는 변수
            isBooked: [], // 반복적으로 찜 등록/해제를 가능하게 해주는 변수

            // 기본 변수
            errored: false,
            loading: this.loading
        };
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    mounted() {

    },
    filters: {
        // 돈에 , 붙여주는 필터
        currency: function(value) {
            let num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        },
        //평점에 0.0 식으로 표시하는 필터
        demical: function(value) {
            let num = new Number(value);
            if (num == 0) return 0;
            return num.toFixed(1);
        },
        //지역 표기 시 "시" 빼기
        category: function(value) {
            let str = value.split("시");
            return str[0];
        }
    },
    methods: {
        //스크롤 이벤트 : 스크롤 바가 맨 밑에 있을 때
        handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                this.isDone == false
            ) {
                this.infiniteHandler();
                this.isDone = true; // 검색 여러 번 방지
            }
        },
        // 검색 메소드(전체 & 필터)
        infiniteHandler() {
            this.loading = true;
            this.isDone = true;
            axios
                .post("http://127.0.0.1:7777/studio/search/filter", this.filters)
                .then(response => {
                    this.doSearch = true; //호출 시 동글뱅이 시작
                    setTimeout(() => {
                        if (response.data) {
                            this.studios = this.studios.concat(response.data);
                            // 찜 여부를 확인하기 위한 반복문(있으면 true)
                            response.data.forEach(element => {
                                if (element.bookmark == null) this.isBooked.push(false);
                                else this.isBooked.push(true);
                            });
                            if (response.data.length < 5) {
                                this.isDone = true;
                                this.doSearch = false; //동글뱅이 끝(각 서치마다)
                            } else {
                                this.filters.page += 5;
                                this.isDone = false; // 다시 검색하도록 방지 풂
                                this.doSearch = false;
                            }
                        } else {
                            this.isDone = true; // 아무것도 없으면 무한스크롤링 끝낸다
                            this.doSearch = false;
                        }
                    }, 1000);
                    this.$parent.isImage = false;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 상세페이지로 이동
        showStudioInfo(stuId) {
            if (this.doBookMark) {
                this.$router.push("/studioInfo/" + stuId);
            }
            this.doBookMark = true;
        },
        // 이미지 경로
        getImgUrl(url) {
            return require("@/assets/img/studio/" + url);
        },
        // 찜 추가/제거 // axios 여러번 쓰기 때문에 async ~ await로 에러 제거
        async setBookMark(index, stuId, $event) {
            try {
                this.doBookMark = false;
                const bookmark = await axios.get("http://54.180.25.91:7777/bookmark/custId/" + this.filters.session + "/stuId/" + stuId)
                if (bookmark.data) { //찜목록에 있다면
                    await axios.delete("http://54.180.25.91:7777/bookmark/" + bookmark.data.bookId);
                    // alert(deleteStatus.data); // 에러 페이지용
                    this.$modal.show("delBook");
                    this.isBooked[index] = false;
                    $event.target.src = require("@/assets/img/util/heart.svg")
                } else { // 찜목록에 없다면
                    let regBookmark = {
                        studio: {
                            stuId: stuId
                        },
                        customer: {
                            custId: this.filters.session
                        }
                    };
                    await axios.post("http://54.180.25.91:7777/bookmark", regBookmark);
                    // alert(insertStatus.data); // 에러 페이지용
                    this.$modal.show("regBook");
                    this.isBooked[index] = true;
                    $event.target.src = require("@/assets/img/util/fullheart.svg");
                }
            } catch (error) {
                console.error(error);
            }
        },
        // 팝업창 제거 기능
        closePop() {
            this.$modal.hide("delBook");
            this.$modal.hide("regBook");
        },
    }
};