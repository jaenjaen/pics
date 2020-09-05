import axios from "axios";
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial)

// 요일 변환을 위한 리스트
const week = ["fri", "sat", "sun", "mon", "tue", "wed", "thu"];

export default {
    name: "Reservation",
    Props: {
        "md-disabled-dates": [],
        "md-model-type": String,
        "md-immediately": true,
        "v-model": String
    },
    data() {
        return {
            // 기존 정보 변수 (GET)
            studios: [{}],
            schedule: {},
            customer: {},
            stuId: 10,
            //새로운 예약 관련 변수 (POST)
            start_date: "",
            end_date: "",
            total_people: 1,
            total_price: 0,
            start_time: 25,
            end_time: 25,
            difTime: 0,
            times: [
                "00",
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23"
            ],
            //예약 로직 관련 변수
            today: new Date(),
            exceptionLength: 0,
            repeatedLength: 0,
            repeated: {},
            repeatedDays: [],
            // //1) 초로 환산한 날짜
            startDayTime: 0,
            endDayTime: 0,
            // // 2) 요일로 변환한 날짜
            startDay: "",
            endDay: "",
            // //3) 그 외
            msg: "",
            // 상태 체크 변수
            loading: true,
            errored: false,
        };
    },
    mounted() {

        axios
            .get("http://127.0.0.1:7777/studio/info/10") // + this.stuId)
            .then(response => {
                this.studios = response.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        axios
            .get("http://127.0.0.1:7777/studio/schedule/10") //+ this.stuId)
            .then(response => {
                this.schedule = response.data;
                this.exceptionLength = (this.schedule.exceptionDate).length;
                this.repeatedLength = (this.schedule.repeatDate).length;
                this.repeated = this.schedule.repeatDate;
                this.repeatedDays = [];
                for (let i = 0; i < this.repeatedLength; i++) {
                    this.repeatedDays.push(this.repeated[i].weekDate);
                }
                // let repeat_date = [];
                // for (var i = 0; i < (this.schedule.repeatDate).length; i++) {
                //     repeat_date.push(this.schedule.repeatDate[i].weekDate)
                // }

            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    filters: {
        // 숫자를 금액 형식으로
        currency: function(value) {
            if (!isNaN(value)) return value.toLocaleString();
            else return 0;
        }
    },
    computed: {
        dateFormat: {
            get() {
                return this.$material.locale.dateFormat
            },
            set(val) {
                this.$material.locale.dateFormat = val
            }
        },
        totalPriceCalculate: function() {
            // 1. 일자 >> 시간대로 변경
            var startDay = this.transDate(this.start_date);
            var endDay = this.transDate(this.end_date);
            this.startDayTime = this.transTime(this.start_date, this.start_time);
            this.endDayTime = this.transTime(this.end_date, this.end_time);
            this.start_idx = this.repeatedDays.indexOf(week[this.startDay], 0);
            this.end_idx = this.repeatedDays.indexOf(week[this.endDay], 0);
            var startTime = parseInt(this.start_time);
            var endTime = parseInt(this.end_time);
            this.difTime = (this.endDayTime - this.startDayTime) / (1000 * 60 * 60);


            // 3. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후

            if (this.start_date != "" | this.end_date != "") {
                if (this.start_date != "" && this.checkOpenDate() == 0) {
                    this.start_date = "";
                    this.msg = "시작일이 비영업일 입니다.";
                    alert(this.msg);
                }
                if (this.end_date != "" && this.checkCloseDate() == 0) {
                    this.end_date = "";
                    this.msg = "종료일이 영업일이 아닙니다.";
                    alert(this.msg);
                }
                if (this.startDayTime < new Date() && this.start_date != "") {
                    this.start_date = this.today;
                    startTime = this.start_date;
                    this.msg = "대여 시작일은 현재 날짜 이후로 가능합니다.";
                    alert(this.msg);

                }
                if (startDay > endDay && this.end_date != "") {
                    alert("대여 종료일을 시작일 이후로 설정하세요.");
                    this.end_date = this.start_date;
                    this.endDayTime = this.startDayTime;
                }
            }
            if (this.start_time < 25 | this.end_time < 25) {
                if (this.checkOpenTime(startTime) != 1 & this.start_time < 25) {
                    this.msg = "시작 시간이 영업 외 시간 입니다.";
                    alert(this.msg);
                    this.start_time = "";
                }
                if (this.checkCloseTime(endTime) != 1 && this.end_time < 25) {
                    this.msg = "종료 시간이 영업 외 시간 입니다.";
                    alert(this.msg);
                    this.end_time = "";
                }
                if (this.difTime == 0) {
                    //하루 예약이면 시작시간 < 종료시간
                    if ((startTime * endTime > 0) & (startTime >= endTime)) {
                        alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                        this.end_time = this.start_time + 1;
                        endTime = parseInt(this.start_time) + 1;
                    }
                }
            }
            if (this.start_date != "" & this.end_date != "" & this.start_time != 0 & this.end_time != 0) {
                if (this.checkException() == 0) {
                    alert("예약 불가능한 일정 입니다.");
                    this.start_time = "";
                    this.end_time = "";
                }
            }

            //4. 시간대 반영
            var total_price = 0;
            if (startTime >= endTime) this.difTime -= endTime - startTime;
            else this.difTime += endTime - startTime;
            // 4. 총 요금
            if (this.total_people > this.studios[0].studioFilter.defaultCapacity) {
                // 추가 인원 있는 경우
                total_price = //시간*(unitPrice + excharge*(최대 인원수)
                    this.difTime *
                    (this.studios[0].studioFilter.unitPrice +
                        this.studios[0].studioFilter.excharge *
                        (this.total_people -
                            this.studios[0].studioFilter.defaultCapacity));
            } else {
                // 추가 인원 없는 경우
                total_price = this.difTime * this.studios[0].studioFilter.unitPrice;
            }
            this.total_price = total_price;
            return total_price;
        },
    },
    methods: {
        deletePeople() {
            if (this.total_people > 1) this.total_people--;
            else alert("최소 1명 이상 선택해주세요.");
        },
        addPeople() {
            if (
                this.total_people < parseInt(this.studios[0].studioFilter.maxCapacity)
            )
                this.total_people++;
            else alert("최대 인원을 초과했습니다.");
        },
        addReserve() {
            // 유저 Id 가져오기
            this.customer = JSON.parse(sessionStorage.getItem('customer'));
            if (this.customer == undefined) this.$modal.show("login-required");
            else {
                axios
                    .get("http://127.0.0.1:7777/customer/" + this.customer.custId)
                    .then(response => {
                        this.customer = response.data;
                        // console.log(this.studios);
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
            //2. 예약 정보 확인 reservation 변수 설정
            if (this.total_price > 0 && this.msg == "") {
                let reservation = {
                    stuId: 10, //this.stuId,
                    custId: this.customer.custId,
                    customer: this.customer,
                    startDate: this.start_date + " " + this.start_time,
                    endDate: this.end_date + " " + this.end_time,
                    totalPrice: this.total_price,
                    totalPeople: this.total_people
                };
                axios
                    .post("http://127.0.0.1:7777/studio/reservation", reservation)
                    .then(response => {
                        console.log(response.data);
                        this.$modal.show("success");
                    })
                    .catch(error => {
                        console.log(error + "post에서 에러");
                        this.errored = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        closePop() {
            this.$modal.hide("success");
            this.$modal.hide("login-required");
        },
        transTime(date, time) {
            if (date != null & time != null) {
                let resultDate = (new Date(date));
                // console.log(resultDate + " : resultDate");
                resultDate.setHours(resultDate.getHours() + parseInt(time));
                return resultDate.getTime();
            }
        },
        transDate(date) {
            if (date != null) {
                let splitDate = date.split('-');
                let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getTime();
                return resultDate;
            }
        },
        transDay(date) {
            if (date != null) {
                let splitDate = date.split('-');
                let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getDay();
                return resultDate;
            }
        },
        checkOpenDate() {
            this.startDay = this.transDay(this.start_date);
            if (this.repeatedDays.indexOf(week[this.startDay], 0) > -1) { //일치하는 요일의 종료 시간 가져오기
                return 1;
            } else {
                return 0;
            }
        },
        checkOpenTime() {
            for (let i = 0; i < this.repeatedLength; i++) {
                console.log("openopen Time " + parseInt(this.repeated[i].time.split('-')[0]) + ", 내가 선택 " + this.start_time);
                console.log("openend Time " + parseInt(this.repeated[i].time.split('-')[1]) + ", 내가 선택 " + this.end_time);
                if (this.repeated[i].weekDate == week[this.startDay]) {
                    if ((parseInt(this.start_time) >= parseInt(this.repeated[i].time.split('-')[0])) &
                        (parseInt(this.start_time) < parseInt(this.repeated[i].time.split('-')[1]))) {
                        return 1;
                    }
                }
            }
            return 0;
        },
        checkCloseDate() {
            this.endDay = this.transDay(this.end_date);
            if (this.repeatedDays.indexOf(week[this.endDay], 0) > -1) { //일치하는 요일의 종료 시간 가져오기
                console.log("week[this.endDay] : " + week[this.endDay] + "| this.repeatedDays" + this.repeatedDays)
                return 1;
            } else {
                return 0;
            }
        },
        checkCloseTime() {
            console.log(this.end_time);
            for (let i = 0; i < this.repeatedLength; i++) {
                console.log("end open Time " + this.repeated[i].weekDate + parseInt(this.repeated[i].time.split('-')[0]) + ", 내가 선택 " + this.start_time);
                console.log("end open Time " + parseInt(this.repeated[i].time.split('-')[1]) + ", 내가 선택 " + this.end_time);
                if (this.repeated[i].weekDate == week[this.endDay]) {
                    // console.log("parseInt(this.end_time) > parseInt(this.repeated[i].time.split('-')[0]) : " +
                    //     parseInt(this.end_time) + "|" + parseInt(this.repeated[i].time.split('-')[0]))
                    if ((parseInt(this.end_time) > parseInt(this.repeated[i].time.split('-')[0])) &
                        (parseInt(this.end_time) <= parseInt(this.repeated[i].time.split('-')[1]))) {
                        return 1;
                    }
                }
            }
            return 0;
        },
        checkException() {
            for (var i = 0; i < this.exceptionLength; i++) {
                //포함안되면 repeat가서 뒤지기
                //날짜 + 시간을 초로 환산 >> 등록하려는 시작일이 기존 예약의 종료시간보다 늦거나 
                // 등록하려는 종료일이 기존 예약의 시작시간보다 빠른 경우 기존 예약 및 ExceptionDate에 포함 X
                var exc_startOnlyDate = (this.schedule.exceptionDate[i].startDate).split(' ')[0];
                var exc_startOnlyTime = (this.schedule.exceptionDate[i].startDate).split(' ')[1];
                var exc_endOnlyDate = (this.schedule.exceptionDate[i].endDate).split(' ')[0];
                var exc_endOnlyTime = (this.schedule.exceptionDate[i].endDate).split(' ')[1];
                console.log("여기~~~!!!!" + (this.schedule.exceptionDate[i].startDate).split(' ')[0]);
                var exc_startDate = this.transTime(exc_startOnlyDate, exc_startOnlyTime);
                var exc_endDate = this.transTime(exc_endOnlyDate, exc_endOnlyTime);
                if ((exc_startDate <= this.startDayTime) | (exc_endDate >= this.endDayTime)) {
                    console.log("if 예외 일자" + exc_startDate + "|" + this.startDayTime);
                    continue;
                } else {
                    console.log("elese 예외 일자" + (new Date(this.schedule.exceptionDate[i].endDate).getTime + "|" + this.startDayTime));
                    return 0;
                }
            }
            return 1;
        }
    }
}