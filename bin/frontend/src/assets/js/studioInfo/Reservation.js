import axios from "axios";
import Vue from 'vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);
// 요일 변환을 위한 리스트
const week = ["fri", "sat", "sun", "mon", "tue", "wed", "thu"];

export default {
    name: "Reservation",
    data() {
        return {
            stuId: 0,
            // 기존 정보 변수 (GET)
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
                    parking: 0,
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
            schedule: {},
            customer: {},
            //새로운 예약 관련 변수 (POST)
            start_date: "",
            end_date: "",
            total_people: 1,
            total_price: 0,
            start_time: 25,
            end_time: 25,
            startTimes: [],
            endTimes: [],
            //예약 로직 관련 변수
            today: new Date(),
            exceptionLength: 0,
            repeatedLength: 0,
            reservationLength: 0,
            repeated: {},
            repeatedDays: [],
            disabledDates: date => {
                const day = date.getDay()
                return this.checkDisable(day) == 0
            },
            // //1) 초로 환산한 날짜
            startDayTime: 0,
            endDayTime: 0,
            // // 2) 요일로 변환한 날짜
            startDay: 0,
            endDay: 0,
            ///3) 
            startDate: 0,
            endDate: 0,
            // //3) 그 외
            msg: "",
            // 상태 체크 변수
            loading: true,
            errored: false,
        };
    },
    props: [
        "md-disabled-dates",
        "md-model-type",
        "md-immediately",
        "v-model",
        "md-disabled-dates",
        "stuIdData"
    ],

    created: function() {
        this.stuId = this.stuIdData;
    },
    async mounted() {
        this.customer = JSON.parse(sessionStorage.getItem('customer'));

        await axios
            .get("http://127.0.0.1:7777/studio/info/10") //+ this.stuId)
            .then(response => {
                this.studios = response.data;
                console.log(this.studios);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        await axios
            .get("http://127.0.0.1:7777/studio/schedule/10") //+ this.stuId)
            .then(response => {
                this.schedule = response.data;
                var exceptionDate = (response.data.exceptionDate);
                var repeatDate = (response.data.repeatDate);
                var reservation = (response.data.reservation);
                this.exceptionLength = exceptionDate.length;
                this.repeatedLength = repeatDate.length;
                this.reservationLength = reservation.length;
                this.repeated = this.schedule.repeatDate;
                for (let i = 0; i < this.repeatedLength; i++) {
                    this.repeatedDays.push(this.repeated[i].weekday);
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
    filters: {
        currency: function(value) {
            if (!isNaN(value) & (value > 0)) return value.toLocaleString();
            else return 0;
        },
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
            this.msg = "";
            // 1. 날짜 연산을 위한 변수 선언 : 초/시/일/요일/월/연 단위로 변환
            if (this.start_date != "" | this.end_date != "" | this.start_time < 25 | this.end_time < 25) {
                this.startDay = this.transWeekDay(this.start_date); //시작일의 요일(숫자)
                this.endDay = this.transWeekDay(this.end_date); //종료일의 요일(숫자)
                this.startDate = this.transTime(this.start_date); //시작일자 초로 환산
                this.endDate = this.transTime(this.end_date); //종료일자 초로 환산
                var todayTime = this.transTime(
                    this.today.getFullYear() + "-" +
                    (this.today.getMonth() + 1) + "-" +
                    this.today.getDate()); //오늘날짜 초로 환산
                this.startDayTime = this.transTime(this.start_date, this.start_time); //시작일+ 시작시간 초로 환산
                this.endDayTime = this.transTime(this.end_date, this.end_time); //종료일+ 종료시간 초로 환산
                var startTime = parseInt(this.start_time); //숫자
                var endTime = parseInt(this.end_time);

            }
            // 2. 개별 항목 체크
            // 2-1) 날짜 조건
            if (this.start_date != "") {
                this.startTimes = this.setTime(this.startDay);
                if (this.startDate < todayTime) {
                    alert("대여 시작일을 오늘 이후로 선택하세요.");
                    this.start_date =
                        this.today.getFullYear() +
                        "-" + (this.today.getMonth() + 1) +
                        "-" + this.today.getDate();
                }
            }
            if (this.end_date != "") {
                this.endTimes = this.setTime(this.endDay);
                if (this.startDate > this.endDate) {
                    alert("대여 종료일을 시작일 이후로 설정하세요.");
                    this.end_date = "";

                }
            }
            // 2-2) 시간 조건
            if (this.start_date != "" &
                this.start_date == this.end_date &
                startTime < 24) {
                if (startTime >= endTime) { //하루 예약이면 시작시간 < 종료시간
                    alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                    this.end_time = 25;
                }
            }
            if ((startTime < 24) &
                this.start_date != "" &
                this.end_date != "" &
                this.startTimes[this.startTimes.length - 1] == startTime) {
                alert("대여 시작시간을 종료 시간 전으로 설정하세요. ");
                this.start_time = 25;
            }
            if ((endTime < 24) & this.end_date != "" & (this.endTimes[0] == endTime) & (this.end_date != "")) {
                alert("대여 종료시간을 오픈 시간 이후로 설정하세요.");
                this.end_time = 25;
            }
            // 3. 새로운 예약 일정이 기존 Reservation 및 Exception Date 일정과 겹치는지 확인
            if (this.start_date != "" & this.end_date != "" & this.start_time < 24 & this.end_time < 24) {
                if ((this.checkException() == 0) | (this.checkReservation() == 0)) {
                    this.start_date = "";
                    this.end_date = "";
                    this.start_time = "";
                    this.end_time = "";
                    alert("예약 불가능한 일정 입니다.");
                }
            }
            //4. 시간대 반영한 요금 계산
            var total_price = 0;
            var difDate = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24); //일자 차이
            // 4-1) 예약 일자 사이에 날짜별 영업 시간 구하기(for문)
            var cntTime = 0;
            if (this.start_date != "" & this.end_date != "" & this.start_time < 24 & this.end_time < 24) {
                if (difDate == 0) { //1일 예약
                    cntTime = (endTime - startTime)
                } else { //연일 예약
                    for (let i = 0; i <= difDate; i++) {
                        var next = new Date(this.startDate + (i * 1000 * 60 * 60 * 24));
                        var nextDay = this.transWeekDay(
                            next.getFullYear() +
                            "-" + (next.getMonth() - 1) +
                            "-" + next.getDate());
                        let j = this.repeatedDays.indexOf(week[nextDay], 0)
                        let openTime = parseInt((this.repeated[j]).time.split('-')[0]);
                        let closeTime = parseInt((this.repeated[j]).time.split('-')[1]);

                        if (i == 0) { //시작일 : 마감시간-시작시간
                            cntTime += (closeTime - parseInt(startTime));
                        } else if (i == (difDate)) { //종료일: 종료시간-오픈시간
                            cntTime += (parseInt(endTime) - openTime);
                        } else { // 그 사이날짜 : if 영업일 >> 마감시간-오픈시간
                            if (this.repeatedDays.indexOf(week[nextDay], 0) > -1) {
                                cntTime += (closeTime - openTime)
                            }
                        }
                    }
                }
            }
            //5. 인원수 반영한 요금 계산
            if (this.total_people > this.studios[0].studioFilter.defaultCapacity) {
                // 추가 인원 있는 경우
                total_price = //시간*(unitPrice + excharge*(최대 인원수)
                    cntTime * (this.studios[0].studioFilter.unitPrice +
                        this.studios[0].studioFilter.excharge *
                        (this.total_people - this.studios[0].studioFilter.defaultCapacity));
            } else {
                // 추가 인원 없는 경우
                total_price = cntTime * this.studios[0].studioFilter.unitPrice;
            }
            // 6. 총 요금은 모든 항목 입력 후 출력
            if (this.start_date != "" & this.end_date != "" & this.start_time < 24 & this.end_time < 24) {
                this.total_price = total_price;
                return total_price;
            }
        },
    },
    methods: {
        // 인원수 조정 함수
        deletePeople() {
            if (this.total_people > 1) this.total_people--;
            else this.msg = "최소 1명 이상 선택해야 합니다.";
        },
        addPeople() {
            if (
                this.total_people < parseInt(this.studios[0].studioFilter.maxCapacity)
            )
                this.total_people++;
            else this.msg = "최대 인원을 초과했습니다.";
        },

        // 날짜 환산 및 불가능 일자/시간 체크 함수
        transTime(date, time) {
            if (time != null & date != null) {
                let splitDate = date.split('-');
                let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2]));
                let resultDateTime = resultDate.getTime() + parseInt(time) * (1000 * 60 * 60);
                return resultDateTime;
            } else if (date != null) {
                let splitDate = date.toString().split('-');
                let resultDateTime = (new Date(splitDate[0], splitDate[1], splitDate[2])).getTime();
                return resultDateTime;
            }
        },
        transWeekDay(date) {
            if (date != null) {
                let splitDate = date.split('-');
                let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getDay();
                return resultDate;
            }
        },
        checkCloseDate(date) {
            if (date != null) {
                if (this.repeatedDays.indexOf(week[date], 0) > -1) { //일치하는 요일의 
                    return 1;
                } else {
                    return 0;
                }
            }
        },
        setTime(date) {
            if (date != null) {
                for (let i = 0; i < this.repeatedLength; i++) {
                    if (this.repeated[i].weekday == week[parseInt(date)]) {
                        let openTime = parseInt(this.repeated[i].time.split('-')[0]);
                        let closeTime = parseInt(this.repeated[i].time.split('-')[1]);
                        let times = []
                            // let t = 0;
                        for (let j = openTime; j < closeTime + 1; j++) {
                            // t = j + openTime
                            times.push(j);
                        }
                        return times;
                    } else continue
                }
            }
        },
        checkDisable(date) {
            let tempWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            if (date != null) {
                if (this.repeatedDays.indexOf(tempWeek[date], 0) > -1) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },
        checkReservation() {
            if (this.startDayTime != "" & this.endDayTime != "") {
                for (var i = 0; i < this.reservationLength; i++) {
                    var res_startOnlyDate = (this.schedule.reservation[i].startDate).split(' ')[0]; //시작 날짜 분리
                    var res_startOnlyTime = (this.schedule.reservation[i].startDate).split(' ')[1]; //시작 시간 분리
                    var res_endOnlyDate = (this.schedule.reservation[i].endDate).split(' ')[0]; //종료 날짜 분리
                    var res_endOnlyTime = (this.schedule.reservation[i].endDate).split(' ')[1]; //종료 시간 분리
                    var res_startDate = this.transTime(res_startOnlyDate, res_startOnlyTime); //시작 일자+시간 초단위 환산
                    var res_endDate = this.transTime(res_endOnlyDate, res_endOnlyTime); //종료 일자+시간 초단위 환산
                    // startDayTime : 새로운 예약 시작 날짜 + 시간의 초단위 환산, endDayTime : 새로운 예약 종료 날짜 + 시간의 초단위 환산
                    if ((this.startDayTime <= res_startDate & res_startDate < this.endDayTime) |
                        (this.startDayTime < res_endDate & res_endDate <= this.endDayTime)) {
                        console.log("else : res_startDate" + res_startDate + "res_endDate : " + res_endDate)
                        return 0;
                    } else {
                        console.log("else : res_startDate" + res_startDate + "res_endDate : " + res_endDate)
                        continue;
                    }
                }
                return 1;
            }
        },
        checkException() {
            if (this.startDayTime != "" & this.endDayTime != "") {
                for (var i = 0; i < this.exceptionLength; i++) {
                    var exc_startOnlyDate = (this.schedule.exceptionDate[i].startDate).split(' ')[0];
                    var exc_startOnlyTime = (this.schedule.exceptionDate[i].startDate).split(' ')[1];
                    var exc_endOnlyDate = (this.schedule.exceptionDate[i].endDate).split(' ')[0];
                    var exc_endOnlyTime = (this.schedule.exceptionDate[i].endDate).split(' ')[1];
                    var exc_startDate = this.transTime(exc_startOnlyDate, exc_startOnlyTime);
                    var exc_endDate = this.transTime(exc_endOnlyDate, exc_endOnlyTime);
                    if ((this.startDayTime <= exc_startDate & exc_startDate < this.endDayTime) |
                        (this.startDayTime < exc_endDate & exc_endDate <= this.endDayTime)) {
                        return 0;
                    } else {

                        continue;
                    }
                }
                return 1;
            }
        },

        // 예약 등록 로직
        async addReserve() {
            // 유저 Id 가져오기
            this.customer = JSON.parse(sessionStorage.getItem('customer'));
            if (this.customer == undefined) this.$modal.show("login-required");
            else {
                await axios
                    .get("http://127.0.0.1:7777/customer/" + this.customer.custId)
                    .then(response => {
                        this.customer = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
            //2. 예약 정보 확인 reservation 변수 설정
            if (this.total_price > 0 & this.start_date != "" & this.end_date != "" & this.start_time < 24 & this.end_time < 24) {
                let reservation = {
                    stuId: this.stuIdData,
                    custId: this.customer.custId,
                    customer: this.customer,
                    startDate: this.start_date + " " + this.start_time,
                    endDate: this.end_date + " " + this.end_time,
                    totalPrice: this.total_price,
                    totalPeople: this.total_people
                };
                await axios
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
        // 모달창 닫기
        closePop() {
            this.$modal.hide("success");
            this.$modal.hide("login-required");
        },
    }

}