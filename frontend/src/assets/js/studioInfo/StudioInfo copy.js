import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import "materialize-css";
import VModal from 'vue-js-modal'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Reservation from "@/components/studioInfo/Reservation.vue"
// import Doughnut from "@/assets/js/studioInfo/GenderChart.js"

// import Map from "@/components/studioInfo/Map.vue"

Vue.use(VueMaterial)
Vue.use(VueMaterial)
Vue.use(VModal);

export default {
    name: "studio-info",
    components: { carousel, Reservation }, //, Doughnut
    props: {
        stuId: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
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

            //이미지 split 변수
            mainImgList: [],
            portImgList: [],

            // Chart & Graph 변수
            datacollection: null,
        };
    },

    async mounted() { //async mount로 비동기 처리
        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        this.customer = JSON.parse(sessionStorage.getItem('customer'));
        console.log("this.stuId : " + this.stuId);
        axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data;
                //메인 이미지 split
                this.mainImgList = (this.studios[0].mainImg).split(',');
                this.portImgList = (this.studios[0].portImg).split(',');
                console.log("this.portImgList : " + this.portImgList);
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
        console.log("this.tags : " + this.tags);
        axios
            .get("http://127.0.0.1:7777/studio/accCustomer/" + this.stuId)
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.accCustomer : " + this.accCustomer);
        axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.reviews[0].reviewId : " + this.reviews[0].reviewId);
        if (this.customer != undefined) {
            axios
                .get("http://127.0.0.1:7777/studio/getBookmark/" + this.customer.custId + "/" + this.stuId)
                .then(response => (this.bookmarkCheck = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("this.bookmarkCheck : " + this.bookmarkCheck);
        }
        this.fillData;
        // await this.getGenderData();
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
        },
    },
    ////////////////////////////// Methods //////////////////////////////
    methods: {
        fillData() {
            this.datacollection = {
                labels: ["Female", "Male"],
                datasets: [{
                    label: "Gender Ratio",
                    backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
                    data: this.getGenderData()
                }],
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        position: "top"
                    },
                    title: {
                        display: true,
                        text: "Gender Ratio"
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
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
                    return [this.female, this.total];
                    // console.log("aaa1");
                    // this.$set(this.datacollection.datasets[0].data, 0, this.female);
                    // this.$set(this.datacollection.datasets[0].data, 1, this.total);
                    // this.filltData()
                    // console.log("aaa2");
                })
        },
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        bookmarkChange() {
            if (this.customer != undefined) {
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
            } else {
                this.$modal.show("login-required");
            }
        },
        isEmpty(value) {
            if (value == "" || value == null || value == undefined || (value != null &&
                    typeof value == "object" && !Object.keys(value).length)) {
                return true
            } else return false
        },
        closePop() {
            this.$modal.hide("delBook");
            this.$modal.hide("regBook");
            this.$modal.hide("login-required");
        }



        ////////////////////////////// Chart & Graph Methods //////////////////////////////
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