import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import "materialize-css";
// import Chart from 'chart.js'
// import { Doughnut } from "vue-chartjs";
import ChartGender from "@/assets/js/studioInfo/ChartJs.js"
import Reservation from "@/components/studioInfo/Reservation.vue"
import VModal from 'vue-js-modal'

Vue.use(VModal);
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
            studios: [{}],
            tags: [{}],
            bookmarkCheck: 0, //북마크 id값 받은 변수
            reviews: [{}],
            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false,

            //이미지 split 변수
            mainImage: [],
            portImage: [],
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
            .get("http://127.0.0.1:7777/studio/accCustomer/" + this.stuId)
            .then(response => (this.accCustomer = response.data))
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



        // this.fillData;
        // await this.getGenderData();
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
    filters: {
        currency: function(value) { // 숫자를 금액 형식으로
            if (!isNaN(value)) return value.toLocaleString();
            else return 0;
        },
        parking: function(value) {
            if (value) return "주차 가능";
            else return "주차 불가";
        },
        sizeUnit(size) { //m^2 >> 평 단위
            return (size * 0.3025).toFixed(1);
        },
        emailHide(value) { //이메일 아이디 가리기
            var id = value.split("@");
            if (id.length < 5) {
                return id + "****님"
            } else {
                return id.slice(0, 4) + "****님"
            }
        }

    },

    ////////////////////////////// Methods //////////////////////////////
    methods: {
        // filltData() {
        //     this.datacollection = {
        //             datasets: [{
        //                 data: [10, 10],
        //                 backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
        //                 label: "Gender Ratio"
        //             }],
        //             labels: ["Female", "Male"]
        //         },
        //         console.log("datacollection 지나서");

        //     this.total = this.result.length;
        //     this.female = 0;
        //     for (var i = 0; i < this.result.length; i++) {
        //         if (this.result[i].gender == "F") {
        //             this.female++;
        //         }
        //     }
        // },
        // getGenderData() {
        //     axios
        //         .get("http://127.0.0.1:7777/studio/genderRatio/" + this.stuId)
        //         .then(response => {
        //             this.result = response.data;
        //             this.total = this.result.length;
        //             this.female = 0;
        //             // console.log("result : " + this.result + ", this.total : " + this.total)
        //             // var female=0;
        //             for (var i = 0; i < this.result.length; i++) {
        //                 if (this.result[i].gender == "F") {
        //                     //여자 수만큼 세기
        //                     this.female += 1;
        //                 }
        //             }
        //             this.fillData();
        //             console.log("aaa1");
        //             this.$set(this.datacollection.datasets[0].data, 0, this.female);
        //             this.$set(this.datacollection.datasets[0].data, 1, this.total);
        //             this.filltData()
        //             console.log("aaa2");

        //             // this.renderChart(this.datacollection, this.options);
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             this.errored = true;
        //         })
        //         .finally(() => {
        //             this.loading = false;
        //         });
        // },
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        bookmarkChange() {
            if (this.bookmarkCheck != 0) { //찜한적 있다면 찜 목록 해제 
                axios
                    .delete("http://127.0.0.1:7777/bookmark/" + this.bookmarkCheck)
                    .then(() => {
                        this.bookmarkCheck = 0;
                        this.$modal.show("delBook");
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            } else { //찜한적 없다면 찜 목록 등록
                let bookmark = {
                    studio: {
                        stuId: this.stuId
                    },
                    customer: {
                        custId: this.customer.custId
                    }
                };
                axios
                    .post("http://127.0.0.1:7777/bookmark/", bookmark)
                    .then(() => {
                        this.$modal.show("regBook");
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
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