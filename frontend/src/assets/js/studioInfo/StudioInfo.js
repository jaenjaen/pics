import axios from "axios"; //axios
import carousel from "vue-owl-carousel"; //캐러셀
import "materialize-css";
// import Chart from 'chart.js'
// import { Doughnut } from "vue-chartjs";
import ChartGender from "@/assets/js/studioInfo/ChartJs.js"
import Reservation from "@/components/studioInfo/Reservation.vue"

export default {
    name: "studio-info",
    components: { carousel, ChartGender, Reservation },
    props: {
        stuId: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            datacollection: null,
            loaded: false,

            // studio 관련 변수 (GET)
            customer: {},
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
        };
    },
    async mounted() {
        this.customer = JSON.parse(sessionStorage.getItem('customer'));


        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data

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
            .get("http://127.0.0.1:7777/studio/getBookmark/" + this.customer.custId + "/" + this.stuId)
            .then(response => (this.bookmarkCheck = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => (this.reviews = response.data))
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

        this.fillData();
        await this.getGenderData();
        ////////////////////////////// Chart & Graph //////////////////////////////

        // this.$nextTick(() => {
        //     var ctx = document.getElementById('doughnut-chart-area').getContext('2D');
        //     var config = {
        //         type: 'Doughnut',
        //         data: {
        //             datasets: [{
        //                 data: [20, 30],
        //                 backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
        //                 label: "Gender Ratio"
        //             }],
        //             labels: ["Female", "Male"]
        //         },
        //         options: {
        //             responsive: true,
        //             legend: {
        //                 position: "top"
        //             },
        //             title: {
        //                 display: true,
        //                 text: "Gender Ratio"
        //             },
        //             animation: {
        //                 animateScale: true,
        //                 animateRotate: true
        //             }
        //         }
        //     }

        //     new Chart(ctx, config);
        // })
    },
    // computed: {
    //     param: function() {
    //         return this.$route.params;
    //     }
    // },
    ////////////////////////////// Methods //////////////////////////////
    methods: {
        filltData() {
            this.datacollection = {
                    datasets: [{
                        data: [10, 10],
                        backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
                        label: "Gender Ratio"
                    }],
                    labels: ["Female", "Male"]
                },
                console.log("datacollection 지나서");

            this.total = this.result.length;
            this.female = 0;
            for (var i = 0; i < this.result.length; i++) {
                if (this.result[i].gender == "F") {
                    this.female++;
                }
            }
        },
        getGenderData() {
            axios
                .get("http://127.0.0.1:7777/studio/genderRatio/" + this.stuId)
                .then(response => {
                    this.result = response.data;
                    this.total = this.result.length;
                    this.female = 0;
                    // console.log("result : " + this.result + ", this.total : " + this.total)
                    // var female=0;
                    for (var i = 0; i < this.result.length; i++) {
                        if (this.result[i].gender == "F") {
                            //여자 수만큼 세기
                            this.female += 1;
                        }
                    }
                    this.fillData();
                    console.log("aaa1");
                    this.$set(this.datacollection.datasets[0].data, 0, this.female);
                    this.$set(this.datacollection.datasets[0].data, 1, this.total);
                    this.filltData()
                    console.log("aaa2");

                    // this.renderChart(this.datacollection, this.options);
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
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
                    .post("http://127.0.0.1:7777/bookmark/" + bookmark)
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
                alert(this.bookmarkCheck + "찜 목록에 등록했습니다.")
            }
        }, ////////////////////////////// Chart & Graph Methods //////////////////////////////
        // chartData: function() {
        //     var customer = this.customers;
        //     this.total = customer.length;
        //     this.female = 0;
        //     for (var i = 0; i < this.total; i++) {
        //         if (this.customers[i].gender == "F") {
        //             this.female++;
        //         }
        //     }
        //     this.$set(this.datacollection.datasets[0].data, 0, this.female);
        //     this.$set(this.datacollection.datasets[0].data, 1, this.total);
        // }
    }
};