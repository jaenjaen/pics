import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import VModal from 'vue-js-modal'
// import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

import Reservation from "@/components/studioInfo/Reservation.vue"
// import Doughnut from "@/assets/js/studioInfo/GenderChart.js"
import Doughnut from "@/assets/js/studioInfo/GenderChart.js"

// import Map from "@/components/studioInfo/Map.vue"

Vue.use(VueMaterial)
Vue.use(VueMaterial)
Vue.use(VModal);

export default {
    name: "studio-info",
    components: { carousel, Reservation, Doughnut },
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
            studios: [{
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
            }],
            tags: [{
                tagId: 0,
                tagName: ""
            }],
            isBooked: false, //북마크 id값 받았는지 나타내는 변수
            reviews: [{}],
            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false,

            //이미지 split 변수
            mainImgList: [],
            portImgList: [],

            // Chart & Graph 변수
            female: 2,
            total: 1,
            datacollection: {
                labels: ['Female', 'Male'],
                datasets: [{
                    label: "Gender Ratio",
                    backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
                    data: [0, 0]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Gender Ratio"
                },
                animation: {
                    animateScale: true
                }
                // }
            }
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
                .get("http://127.0.0.1:7777/bookmark/custId/" + this.customer.custId + "/stuId/" + this.stuId)
                .then(response => {
                    this.isBooked = Number(response.data.bookId);
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("this.isBooked : " + this.isBooked);
        }
        console.log("ccc");
        axios
            .get("http://127.0.0.1:7777/studio/genderRatio/10")
            .then(response => {
                this.genderRation = response.data;
                var genderRation = this.genderRation;
                this.total = genderRation.length;
                // var female=0;
                for (var i = 0; i < this.total; i++) {
                    if (this.customers[i].gender == "F") {
                        //여자 수만큼 세기
                        this.female += 1;
                    }
                }
            })
        this.fillData();
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
            console.log(this.female, this.total);
            this.$set(this.datacollection.datasets[0].data, 0, this.female);
            this.$set(this.datacollection.datasets[0].data, 1, this.total);
            console.log(this.datacollection.datasets[0].data + ": Last");
        },
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
        //             return [this.female, this.total];
        //             // console.log("aaa1");
        //             // this.$set(this.datacollection.datasets[0].data, 0, this.female);
        //             // this.$set(this.datacollection.datasets[0].data, 1, this.total);
        //             // this.filltData()
        //             // console.log("aaa2");
        //         })
        // },
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
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
                    $event.target.src = require("@/assets/img/util/heart.svg")
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
                    $event.target.src = require("@/assets/img/util/fullheart.svg");
                }
            } catch (error) {
                console.error(error);
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