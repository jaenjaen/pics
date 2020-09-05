import StudioList from "@/components/search/StudioList.vue";
// import axios from "axios";
// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// Vue 시작
export default {
    name: "studio-list",
    props: ["categoryId"],
    components: {
        StudioList
    },
    data() {
        return {
            // Studio 검색 필터변수
            filters: {
                categoryId: this.categoryId,
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
            // Collapse 변수
            visible: true,
        };
    },
    mounted() {
        this.$refs.cataSelect.value = this.filters.categoryId; // 필터 창의 카테고리에 해당 값 표시
        // 카테고리 설정해서 이동했으면 바로 리스트 창으로
        if (this.filters.categoryId > 0) {
            this.setFilter();
        }
        //로그인 세션 정보 받기
        this.login();
    },
    methods: {
        // 카테고리 설정 메소드
        setCategory() {
            this.filters.categoryId = this.$refs.cataSelect.value;
        },
        // 인수 증감 메소드
        modifyCapa(value) {
            if (value == 1) { //증가 시
                this.filters.capacity += 1;
            } else { //감소 시
                if (this.filters.capacity > 0) this.filters.capacity -= 1; // 0초과하면 감소하기 for 음수 방지
            }
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

            //필터를 설정하면 page랑 리스트 초기화
            this.$refs.studioList.studios = [];
            this.filters.page = 0;

            // 필터 지정 후 자식 컴포넌트의 검색메소드 실행
            this.$refs.studioList.infiniteHandler();
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
        // 아래부터는 임시 메소드
        login() {
            let customer = {
                custId: 3,
            }
            sessionStorage.setItem('customer', JSON.stringify(customer));
            var sessionTemp = sessionStorage.getItem('customer');
            this.filters.session = JSON.parse(sessionTemp).custId;
        },
        logout() {
            sessionStorage.removeItem('cust');
            this.filters.session = -1;
        },
        test() {
            this.$router.push("/uploadImg")
        }
    }
};