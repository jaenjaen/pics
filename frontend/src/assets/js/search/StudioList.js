import axios from "axios";
import Vue from "vue";
import { BCollapse } from "bootstrap-vue";
import { VBToggle } from "bootstrap-vue";
import VModal from 'vue-js-modal'

Vue.use(VModal);
Vue.directive("b-toggle", VBToggle);
Vue.component("b-collapse", BCollapse);

// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// 카테고리 변한을 위한 리스트
// Vue 시작
export default {
    name: "studio-list",
    data() {
        return {
            // Axios 전체 리스트 변수
            studios: [],

            // Axios 필터변수
            filters: {
                categoryId: "",
                weekDate: "",
                selectedDate: "",
                address1: "",
                address2: "",
                minSize: "",
                maxSize: "",
                minUnitPrice: "",
                maxUnitPrice: "",
                capacity: 0,
                searchContent: "",
                searchTag: "",
                orderCon: "",
                page: 0,

                //로그인 session 변수, 기본값은 -1
                session: -1,

            },
            //별점
            score: 0,

            //collapse 변수
            visible: false,

            //무한스크롤링 변수
            isDone: true, // 무한스크롤링 끝냄 & 스크롤바가 내려가서 무한 검색하는 것 방지 & 검색이 완료되면 동글뱅이 멈춘다
            doSearch: false, //true면 loading 중, false면 끝

            //bookmark 변수
            doBookMark: true,

            // 기본 변수
            loading: true,
            errored: false
        };
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    mounted() {
        this.filters = JSON.parse(sessionStorage.getItem('filters'));
        this.login();
        this.infiniteHandler();
    },
    filters: {
        // 돈에 , 붙여주는 필터
        currency: function(value) {
            let num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        },
        demical: function(value) {
            let num = new Number(value);
            if (num == 0) return 0;
            return num.toFixed(1);
        },
        category: function(value) {
            let str = value.split("시");
            return str[0];
        }
    },
    methods: {
        // 카테고리 설정 메소드
        setCategory() {
            this.filters.categoryId = this.$refs.cataSelect.value;
        },
        // 필터 값 넣고 검색
        setFilter() {
            // 날짜가 입력이 되면 요일 리턴
            if (this.filters.selectedDate.length > 0) {
                this.weekDate = week[new Date(this.filters.selectedDate).getDay()];
            }
            // #을 입력하면 해시태그 검색으로 전환
            if (this.filters.searchContent.indexOf("#") == 0) {
                this.filters.searchTag = this.filters.searchContent;
                this.filters.searchContent = "";
            }
            // 필터를 새로 설정했으므로 페이지와 기존 리스트 0처리
            this.filters.page = 0;
            this.studios = [];

            //필터를 설정하면 collapse 문 닫기
            this.visible = false;

            //로딩 시작
            this.doSearch = true;

            // 필터 객체
            this.search();
            // setTimeout(() => { this.isDone = false; }, 2000)
        },
        //스크롤 이벤트 : 스크롤 바가 맨 밑에 있을 때
        handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                this.isDone == false
            ) {
                this.search();
                this.isDone = true; // 검색 여러 번 방지
            }
        },
        // 검색 메소드(전체 & 필터)
        search() {
            axios
                .post("http://127.0.0.1:7777/studio/search/filter", this.filters)
                .then(response => {
                    this.doSearch = true; //호출 시 동글뱅이 시작
                    setTimeout(() => {
                        if (response.data) {
                            this.studios = this.studios.concat(response.data);
                            if (response.data.length < 5) {
                                this.isDone = true;
                                this.doSearch = false; //동글뱅이 끝(각 호출 끝마다)
                            }
                            this.filters.page += 5;
                            this.isDone = false; // 다시 검색하도록 방지 풂
                            this.doSearch = false;
                        } else {
                            this.isDone = true; // 아무것도 없으면 무한스크롤링 끝낸다
                            this.doSearch = false;
                        }
                    }, 1000);
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
        // 검색 필터 삭제
        initFilter(value) {
            if (value == 1) {
                this.filters.selectedDate = "";
                this.filters.weekDate = "";
            } else {
                this.filters.selectedDate = "";
                this.filters.weekDate = "";
                this.filters.addr1 = "";
                this.filters.addr2 = "";
                this.filters.minSize = "";
                this.filters.maxSize = "";
                this.filters.capacity = 0;
                this.filters.minUnitPrice = "";
                this.filters.maxUnitPrice = "";
                this.filters.page = 0;
            }
            this.infiniteHandler();
        },
        // 찜 추가
        regBookMark(stuId, $event) {
            this.doBookMark = false;
            let bookmark = {
                studio: {
                    stuId: stuId
                },
                customer: {
                    custId: this.filters.session
                }
            };
            axios
                .post("http://127.0.0.1:7777/bookmark", bookmark)
                .then(() => {
                    this.$modal.show("regBook");
                    $event.target.src = require("@/assets/img/util/fullheart.svg");
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        //찜 제거
        delBookMark(bookId, $event) {
            this.doBookMark = false;
            axios
                .delete("http://127.0.0.1:7777/bookmark/" + bookId)
                .then(() => {
                    this.$modal.show("delBook");
                    $event.target.src = require("@/assets/img/util/heart.svg");
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        // 팝창 제거 기능
        closePop() {
            this.$modal.hide("delBook");
            this.$modal.hide("regBook");
        },
        login() {
            let cust = {
                custId: 3,
            }
            sessionStorage.setItem('cust', JSON.stringify(cust));
            var sessionTemp = sessionStorage.getItem('cust');
            this.filters.session = JSON.parse(sessionTemp).custId;
            alert("로그인 ID: " + 3);
        },
        logout() {
            sessionStorage.removeItem('cust');
            this.filters.session = -1;
            alert("로그아웃");
        }
    }
};