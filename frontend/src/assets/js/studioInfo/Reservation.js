import axios from "axios";
import Vue from 'vue';
import VueMaterial, {
    MdCard
} from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';


Vue.use(VueMaterial);
// 요일 변환을 위한 리스트
const week = ["fri", "sat", "sun", "mon", "tue", "wed", "thu"];

export default {
    name: "Reservation",
    component: [MdCard],
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
            difTime: 0,
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
                alert(date.getDay())
                return this.checkDisable(day) == 0
            },
            // //1) 초로 환산한 날짜
            startDayTime: 0,
            endDayTime: 0,
            // // 2) 요일로 변환한 날짜
            startDay: 0,
            endDay: 0,
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
        "stuIdData"
    ],

    created: function() {
        this.stuId = this.stuIdData;
    },
    async mounted() {
        this.customer = JSON.parse(sessionStorage.getItem('customer'));

        await axios
            .get("http://127.0.0.1:7777/studio/info/11") // + this.stuId)
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
            .get("http://127.0.0.1:7777/studio/schedule/11") // + this.stuId)
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
            if (!isNaN(value)) return value.toLocaleString();
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
            // 1. 날짜 변환
            // 일자 >> 시간대로 변경
            if (this.start_date != "" | this.end_date != "" | this.start_time != "" | this.end_time != "") {
                this.startDay = this.transWeekDay(this.start_date);
                this.endDay = this.transWeekDay(this.end_date);
                this.startDate = this.transTime(this.start_date);
                this.endDate = this.transTime(this.end_date);
                var todayTime = this.transTime(this.today.getFullYear() + "-" + (this.today.getMonth() + 1) + "-" + this.today.getDate());
                this.startDayTime = this.transTime(this.start_date, this.start_time);
                this.endDayTime = this.transTime(this.end_date, this.end_time);
                this.start_idx = this.repeatedDays.indexOf(week[this.startDay], 0);
                this.end_idx = this.repeatedDays.indexOf(week[this.endDay], 0);
                var startTime = parseInt(this.start_time);
                var endTime = parseInt(this.end_time);
                this.difTime = (this.endDayTime - this.startDayTime) / (1000 * 60 * 60);
            }
            // 3. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후
            // 영업일/비영업 일자 및 시간대 구분, Exception Date 확인
            if (this.start_date != "") {
                this.startTimes = this.setTime(this.startDay);
                if (this.startDate < todayTime) {
                    alert("대여 시작일을 오늘 이후로 선택하세요.");
                    this.start_date = this.today.getFullYear() + "-" + (this.today.getMonth() + 1) + "-" + this.today.getDate();
                }
            }
            if (this.end_date != "") {
                this.endTimes = this.setTime(this.endDay);
                if (this.startDate > this.endDate) {
                    alert("대여 종료일을 시작일 이후로 설정하세요.");
                    this.end_date = this.start_date;
                    this.endDate = this.startDate;
                }
            }
            if (startTime < 25 | endTime < 25) {
                if (startTime >= endTime & this.difTime == 0) { //하루 예약이면 시작시간 < 종료시간
                    alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                    this.end_time = this.start_time + 1;
                    console.log("this.startTimes[0] : " + this.startTimes[0] + ", endTime : " + endTime)
                    if (this.startTimes[0] == endTime) {
                        alert("대여 종료시간을 오픈 시간 이후로 설정하세요.");
                        this.end_time = "";
                    }
                    if (this.endTimes[-1] == startTime) {
                        alert("대여 종료시간을 오픈 시간 이후로 설정하세요. : " + this.endTimes[-1]);
                        this.start_time = "";
                    }
                }

            }
            if (this.start_date != "" & this.end_date != "" & this.start_time != 0 & this.end_time != 0) {
                if ((this.checkException() == 0) | (this.checkReservation() == 0)) {
                    alert("예약 불가능한 일정 입니다.");
                    this.start_time = "";
                    this.end_time = "";
                }
            }
            //4. 시간대 반영
            var total_price = 0;
            if (startTime >= endTime) this.difTime -= (endTime - startTime);
            else this.difTime += endTime - startTime;
            // 4. 총 요금
            if (this.total_people > this.studios[0].studioFilter.defaultCapacity) {
                // 추가 인원 있는 경우
                total_price = //시간*(unitPrice + excharge*(최대 인원수)
                    this.difTime *
                    (this.studios[0].studioFilter.unitPrice +
                        this.studios[0].studioFilter.excharge *
                        (this.total_people - this.studios[0].studioFilter.defaultCapacity));
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
            else this.msg = "최소 1명 이상 선택해야 합니다.";
        },
        addPeople() {
            if (
                this.total_people < parseInt(this.studios[0].studioFilter.maxCapacity)
            )
                this.total_people++;
            else this.msg = "최대 인원을 초과했습니다.";
        },
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
            if (this.total_price > 0 && this.msg == "") {
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
        closePop() {
            this.$modal.hide("success");
            this.$modal.hide("login-required");
        },
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
                        let t = 0;
                        for (let j = 0; j < (closeTime - openTime) + 1; j++) {
                            t = j + openTime
                            times.push(t);
                        }
                        return times;
                    } else continue
                }
            }
        },
        checkDisable(date) {
            alert("date : " + date)
            let disableWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            if (date != null) {
                if (this.repeatedDays.indexOf(disableWeek[date], 0) > -1) { //일치하는 요일의 
                    return 1;
                } else {
                    return 0;
                }
            }
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
                var exc_startDate = this.transTime(exc_startOnlyDate, exc_startOnlyTime);
                var exc_endDate = this.transTime(exc_endOnlyDate, exc_endOnlyTime);
                if ((exc_startDate <= this.startDayTime) | (exc_endDate >= this.endDayTime)) {
                    continue;
                } else {
                    return 0;
                }
            }
            return 1;
        },
        checkReservation() {
            for (var i = 0; i < this.reservationLength; i++) {
                //포함안되면 repeat가서 뒤지기
                //날짜 + 시간을 초로 환산 >> 등록하려는 시작일이 기존 예약의 종료시간보다 늦거나 
                // 등록하려는 종료일이 기존 예약의 시작시간보다 빠른 경우 기존 예약 및 ExceptionDate에 포함 X
                var res_startOnlyDate = (this.schedule.reservation[i].startDate).split(' ')[0];
                var res_startOnlyTime = (this.schedule.reservation[i].startDate).split(' ')[1];
                var res_endOnlyDate = (this.schedule.reservation[i].endDate).split(' ')[0];
                var res_endOnlyTime = (this.schedule.reservation[i].endDate).split(' ')[1];
                var res_startDate = this.transTime(res_startOnlyDate, res_startOnlyTime);
                var res_endDate = this.transTime(res_endOnlyDate, res_endOnlyTime);
                if ((res_startDate <= this.startDayTime) | (res_endDate >= this.endDayTime)) {
                    continue;
                } else {
                    return 0;
                }
            }
            return 1;
        }
    }

}