import axios from "axios"; //axios
import carousel from "vue-owl-carousel"; //캐러셀
import "materialize-css";

export default {
    name: "studio-info",
    components: { carousel },
    data: function() {
        return {
            // studio 관련 변수 (GET)
            studios: {
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
                    parking: "",
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
            },
            tags: [{
                tagId: 0,
                tagName: ""
            }],

            bookmarkCheck: 0, //북마크 id값 받은 변수
            reviews: [{}],
            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false,

            //Chart & Graph 데이터
            datacollection: null
        };
    },
    mounted() {
        axios
            .get("http://127.0.0.1:7777/studio/info/10")
            .then(response => (this.studios = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/tags/10")
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/getBookmark/3/10")
            .then(response => (this.bookmarkCheck = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/reviews/10")
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/accCustomer/10")
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        this.fillData()
    },
    methods: {
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        bookmarkChange() {
            if (this.bookmarkCheck != 0) { //찜한적 있다면 찜 목록 해제 
                axios
                    .delete("http://127.0.0.1:7777/bookmark/" + this.bookmarkCheck)
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
                this.bookmarkCheck = 0;
                alert("찜 목록에서 삭제했습니다.")
            } else { //찜한적 없다면 찜 목록 등록
                alert("찜 목록에 등록했습니다.")
                let bookmark = {
                    studio: {
                        stuId: this.stuId
                    },
                    customer: {
                        custId: this.filters.session
                    }
                };

                axios
                    .post("http://127.0.0.1:7777/bookmark", bookmark)
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
                alert(this.bookmarkCheck + "찜 목록에 등록했습니다.")
                axios //새로 등록한 북마크id 부여
                    .get("http://127.0.0.1:7777/studio/getBookmark/3/10")
                    .then(response => {
                        this.bookmarkCheck = response.data

                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
        },
        fillData() {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }]
            }
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
        // creatChart(chartId, chartData) {
        //     const ctx = document.getElementById(charId)
        //     const genderChart = new Chart(ctx, {
        //         type: chartData.type,
        //         data: chartData.data,
        //         options: chartData.options,
        //     });
        // },

        // kakaoShare() {
        //     Kakao.init('91cbdca7243fe89cb44e5d61a5aaaf44');
        //     Kakao.Link.sendDefault({
        //         objectType: 'feed',
        //         content: {
        //             title: this.title,
        //             link: {
        //                 mobileWebUrl: this.url,
        //                 webUrl: this.url
        //             }
        //         }
        // })

    }
};