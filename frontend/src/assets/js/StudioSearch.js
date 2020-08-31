import axios from "axios";
import Vue from "vue";
import { BCollapse } from "bootstrap-vue";
import { VBToggle } from "bootstrap-vue";
import InfiniteLoading from 'vue-infinite-loading';
Vue.directive("b-toggle", VBToggle);
Vue.component("b-collapse", BCollapse);

// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// 카테고리 변한을 위한 리스트
// Vue 시작
export default {
    components: {
        InfiniteLoading,
    },
    name: "studio-list",
    data() {
        return {
            // Axios 전체 리스트 변수
            studios: [],

            // Axios 필터변수
            categoryId: "",
            weekDate: "",
            selectedDate: "",
            addr1: "",
            addr2: "",
            minSize: "",
            maxSize: "",
            minUnitPrice: "",
            maxUnitPrice: "",
            capacity: 0,
            searchContent: "",
            searchTag: "",
            order: "",
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
                capacity: "",
                searchContent: "",
                searchTag: "",
                orderCon: "",
                page: 1
            },
            //로그인 session 변수
            session: 3,

            //별점
            score: 0,

            //무한스크롤링 관련 변수
            page: 1,

            // 기본 변수
            loading: true,
            errored: false
        };
    },
    mounted() {
        // 페이지 오자마자 전체 리스트 뿌리기
        this.searchAllStudios();
        // M.AutoInit();
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
        },
        shortenDesc: function(value) {
            if (value.length > 52) return value.substring(0, 51) + "...";
            return value;
        }
    },
    methods: {
        // Studio 전체 불러오기
        searchAllStudios() {
            axios
                .post("http://127.0.0.1:7777/studio/search/filter", this.filters)
                .then(response => {
                    this.studios = response.data;
                    this.categoryId = "";
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        },
        setCategory() {
            this.categoryId = this.$refs.cataSelect.value;
        },
        // 필터 값 넣고 검색
        setFilter() {
            // 날짜가 입력이 되면 요일 리턴
            if (this.selectedDate.length > 0) {
                this.weekDate = week[new Date(this.selectedDate).getDay()];
            }
            // #을 입력하면 해시태그 검색으로 전환
            if (this.searchContent.indexOf("#") == 0) {
                this.searchTag = this.searchContent;
                this.searchContent = "";
            }
            // 필터 객체
            let filters = {
                categoryId: this.categoryId,
                weekDate: this.weekDate,
                selectedDate: this.selectedDate,
                address1: this.addr1,
                address2: this.addr2,
                minSize: this.minSize,
                maxSize: this.maxSize,
                minUnitPrice: this.minUnitPrice,
                maxUnitPrice: this.maxUnitPrice,
                capacity: this.capacity,
                searchContent: this.searchContent,
                searchTag: this.searchTag,
                orderCon: this.order,
                page: this.page
            };
            this.infiniteHandler(filters);
        },
        // 검색 메소드
        infiniteHandler($state, filters) {
            axios
                .post("http://127.0.0.1:7777/studio/search/filter", filters)
                .then(response => {
                    if (response.data.length) {
                        alert(response.data.length);
                        this.page += 1;
                        this.studios = response.data;
                        this.searchContent = "";
                        this.searchTag = "";
                        $state.loaded();
                        this.closeCol(0);
                    } else {
                        alert("com");
                        $state.complete();
                    }
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
        // showStudioInfo(stuId) {
        //   this.$router.push("/TempStudio/" + stuId);
        // },
        // 이미지 경로
        getImgUrl(url) {
            return require("@/assets/img/studio/" + url);
        },
        // 검색 필터 삭제
        initFilter(value) {
            if (value == 1) {
                this.selectedDate = "";
                this.weekDate = "";
            } else {
                this.selectedDate = "";
                this.weekDate = "";
                this.addr1 = "";
                this.addr2 = "";
                this.minSize = "";
                this.maxSize = "";
                this.capacity = "";
                this.minUnitPrice = "";
                this.maxUnitPrice = "";
            }
            this.setFilter();
        },
        //collapse 닫기
        closeCol(value) {
            // let elem = this.$refs.collapsible;
            // let instance = M.Collapsible.getInstance(elem);
            // instance.close(value);
            // elem.close(value);
            alert(value);
        },
        setBookMark($event) {
            let bookmark = {
                studio: {
                    stuId: $event.target.value
                },
                customer: {
                    custId: this.session
                }
            };
            axios.post("http://127.0.0.1:7777/bookmark", bookmark).then(response => {
                alert(response.data);
            });
        }
    }
};