import StudioList from "@/components/search/StudioList.vue";
// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// Vue 시작
export default {
    name: "studio-list",
    components: {
        StudioList
    },
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

            // 기본 변수
            loading: true,
            errored: false
        };
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

            //필터를 설정하면 collapse 문 닫기
            this.visible = false;

            //로딩 시작
            this.doSearch = true;

            // 필터 객체
            this.searchList();
            // setTimeout(() => { this.isDone = false; }, 2000)
        },
        // 검색 메소드(전체 & 필터)
        searchList() {
            sessionStorage.setItem('filters', JSON.stringify(this.filters));
            this.visible = false;
            this.$router.push("/studioList")
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
            this.searchList();
        },
        login() {
            let cust = {
                custId: 3,
            }
            sessionStorage.setItem('cust', JSON.stringify(cust));
            var sessionTemp = sessionStorage.getItem('cust');
            this.filters.session = JSON.parse(sessionTemp).custId;
            alert("로그인함");
        },
        logout() {
            sessionStorage.removeItem('cust');
            this.filters.session = -1;
        }
    }
};