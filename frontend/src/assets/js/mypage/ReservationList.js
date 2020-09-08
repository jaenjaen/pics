import axios from "axios";
import VueMonthlyPicker from 'vue-monthly-picker'
import StarRating from 'vue-star-rating';

let today = new Date();
let monthList = [4, 6, 9, 11];

export default {
    name: "ReservationList",
    components: {
        VueMonthlyPicker,
        StarRating
    },
    data() {
        return {
            custId: JSON.parse(sessionStorage.getItem("customer")).custId,
            month: today + "",
            resvList: [],
            emptyFlag: false,
            content: "",
            rating: 0,
            studioName: "",
            stuId: 0,
            resId: 0,
            filename: "이미지 업로드",
            max: 100,
        };
    },
    mounted() {
        if (sessionStorage.getItem("customer") == null) {
            alert("로그인 후 접근 가능합니다.");
            location.href = "http://localhost:9999/customerlogin";
        }
        axios
            .get("http://localhost:7777/customer/reservation/expired/" + this.custId)
            .then(res => {
                console.log(res.data);
                this.resvList = res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        changeMonth() {
            var yyyy = new Date(this.month).getFullYear();
            var mm = new Date(this.month).getMonth() + 1;
            var startDate = yyyy + "-" + mm + "-" + 1;
            var endDate = "";
            if (mm == 2) endDate = yyyy + "-" + mm + "-" + 28;
            else if (monthList.indexOf(mm) >= 0) endDate = yyyy + "-" + mm + "-" + 30;
            else endDate = yyyy + "-" + mm + "-" + 31;
            console.log(startDate + " and " + endDate);
            axios
                .get("http://localhost:7777/customer/reservation/expired/" + this.custId + "/" + startDate + "/" + endDate)
                .then(res => {
                    this.resvList = res.data;
                    this.emptyFlag = false;
                    //console.log(res.data);
                    if (res.data == "") this.emptyFlag = true;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        beforeMonth() {
            var startDate = "";
            var endDate = "";
            var mm = 12;
            //console.log(this.month);//2020-6
            if (this.month == today + "") {
                if (today.getMonth() == 0) {
                    today = new Date((today.getFullYear() - 1) + "-" + 12 + "-" + today.getDate());
                    //console.log(today);
                } else mm = today.getMonth()

                this.month = today.getFullYear() + "-" + mm + "-" + today.getDate();
                startDate = today.getFullYear() + "-" + mm + "-" + 1;
                if (today.getMonth() == 2) endDate = today.getFullYear() + "-" + mm + "-" + 28;
                else if (monthList.indexOf(today.getMonth()) >= 0) endDate = today.getFullYear() + "-" + today.getMonth() + "-" + 30;
                else endDate = today.getFullYear() + "-" + today.getMonth() + "-" + 31;
            } else {
                var tmpDate = new Date(this.month);
                if (tmpDate.getMonth() == 0) {
                    tmpDate = new Date((tmpDate.getFullYear() - 1) + "-" + 12 + "-" + tmpDate.getDate());
                } else mm = tmpDate.getMonth();

                this.month = tmpDate.getFullYear() + "-" + mm + "-" + tmpDate.getDate();
                startDate = tmpDate.getFullYear() + "-" + mm + "-" + 1;
                if (tmpDate.getMonth() == 2) endDate = tmpDate.getFullYear() + "-" + mm + "-" + 28;
                else if (monthList.indexOf(tmpDate.getMonth()) >= 0) endDate = tmpDate.getFullYear() + "-" + mm + "-" + 30;
                else endDate = tmpDate.getFullYear() + "-" + mm + "-" + 31;
                console.log(startDate + "," + endDate);
            }
            axios.get("http://localhost:7777/customer/reservation/expired/" + this.custId + "/" + startDate + "/" + endDate)
                .then(res => {
                    this.resvList = res.data;
                    this.emptyFlag = false;
                    console.log(res.data);
                    if (res.data == "") this.emptyFlag = true;
                })
                .catch(err => {
                    console.log(err);
                });
        }, //~beforeMonth
        afterMonth() {
            var startDate = "";
            var endDate = "";
            var mm = 1;
            //console.log(this.month);//2020-6
            if (this.month == today + "") {
                if (today.getMonth() == 11) {
                    today = new Date((today.getFullYear() + 1) + "-" + 1 + "-" + today.getDate());
                    console.log(today);
                } else mm = today.getMonth() + 2

                this.month = today.getFullYear() + "-" + mm + "-" + today.getDate();
                startDate = today.getFullYear() + "-" + mm + "-" + 1;

                if (today.getMonth() == 2) endDate = today.getFullYear() + "-" + mm + "-" + 28;
                else if (monthList.indexOf(today.getMonth()) >= 0) endDate = today.getFullYear() + "-" + mm + "-" + 30;
                else endDate = today.getFullYear() + "-" + mm + "-" + 31;
            } else {
                var tmpDate = new Date(this.month);
                if (tmpDate.getMonth() == 11) {
                    tmpDate = new Date((tmpDate.getFullYear() + 1) + "-" + 1 + "-" + tmpDate.getDate());
                    console.log(tmpDate);
                } else mm = tmpDate.getMonth() + 2
                this.month = tmpDate.getFullYear() + "-" + mm + "-" + tmpDate.getDate();

                startDate = tmpDate.getFullYear() + "-" + mm + "-" + 1;

                if (today.getMonth() + 1 == 2) endDate = tmpDate.getFullYear() + "-" + mm + "-" + 28;
                else if (monthList.indexOf(today.getMonth() + 1) >= 0) endDate = tmpDate.getFullYear() + "-" + mm + "-" + 30;
                else endDate = tmpDate.getFullYear() + "-" + mm + "-" + 31;
            }
            axios.get("http://localhost:7777/customer/reservation/expired/" + this.custId + "/" + startDate + "/" + endDate)
                .then(res => {
                    this.resvList = res.data;
                    this.emptyFlag = false;
                    //console.log(res.data);
                    if (res.data == "") this.emptyFlag = true;
                })
                .catch(err => {
                    console.log(err);
                });

        }, //~aftermonth
        showModal: function(resId, studioName, stuId) {
            this.stuId = stuId;
            this.resId = resId;
            axios.get("http://localhost:7777/review/check/" + resId)
                .then(res => {
                    if (res.data < 1) {
                        this.$modal.show("reviewModal");
                        this.studioName = studioName;
                    } else alert("이미 작성한 리뷰입니다.");
                })
                .catch(err => {
                    console.log(err);
                })
        }, //~showModal
        writingReview: function() {
            axios.post("http://localhost:7777/review", {
                customer: {
                    custId: this.custId
                },
                studio: {
                    stuId: this.stuId
                },
                resId: this.resId,
                score: this.rating,
                content: this.content,
                img: ""
            }).then(res => {
                console.log(res.data);
                alert("리뷰 작성이 완료되었습니다.");
                location.reload();
            }).catch(err => {
                console.log(err);
            })
        }
    }
}