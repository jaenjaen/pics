import axios from "axios";
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "materialize-css"
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
            start_time: "",
            end_time: "",
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
            exceptionLength: 0,
            repeatedLength: 0,
            repeated: {},
            today: new Date(),
            repeatedDate: [],

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
                    this.repeatedDate.push(this.repeated[i].weekDate);
                }
                // let repeat_date = [];
                // for (var i = 0; i < (this.schedule.repeatDate).length; i++) {
                //     repeat_date.push(this.schedule.repeatDate[i].weekDate)
                // }
                // let diff = ((this.getMaxDate).getTime - (this.today).getTime) / (1000 * 60 * 60)
                // for (var j = 0; j < 31; j++) { // weekDate를 돌면서
                //     if (repeat_date.indexOf(week[(this.today.getDate() + j).getDay], 0) < 0) { // week에 없으면
                // console.log("j : " + j + ", week[i] : " + week[j])
                //         this.disabledDates.push(j)
                //     }
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
        totalPriceCalculate: function() {
            // 1. 일자 >> 시간대로 변경
            var startSplit = (this.start_date).split("-");
            var endSplit = (this.end_date).split("-");
            var startDate = (new Date(startSplit[0], startSplit[1], startSplit[2])).getTime();
            var endDate = (new Date(endSplit[0], endSplit[1], endSplit[2])).getTime();
            this.difTime = (endDate - startDate) / (60 * 60 * 1000);
            var startTime = parseInt(this.start_time);
            var endTime = parseInt(this.end_time);
            // console.log(" totalPrice Area ) this.startDate : " + startDate + "|" + " endDate : " + endDate + "|+startTime " + startTime + "| endTime : " + endTime + "| Date.UTC() :" + Date.UTC());
            // console.log("this.today : " + this.today + "new Date() : " + (this.today).getTime())

            // 3. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후
            if (this.today.getTime() >= startDate) {
                alert("대여 시작일은 현재 날짜 이후로 가능합니다.");
                this.start_date = new Date();
                startTime = this.start_date;
            }
            if (this.difTime < 0) {
                // 시작일보다 종료일이 빠른 경우
                alert("대여 종료일을 시작일 이후로 설정하세요.");
                this.end_date = this.start_date;
                endDate = startDate;
            }
            if (this.difTime == 0) {
                //하루 예약이면 시작시간 < 종료시간
                if ((startTime * endTime > 0) & (startTime >= endTime)) {
                    alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                    this.end_time = this.start_time + 1;
                    endTime = parseInt(this.start_time) + 1;
                }
            }
            //4. 시간대 반영
            if (startTime >= endTime) this.difTime -= endTime - startTime;
            else this.difTime += endTime - startTime;

            // 5. 총 요금
            var totalPrice = 0;
            var studioFilter = this.studios[0].studioFilter;
            if (this.total_people > studioFilter.defaultCapacity) { // 추가 인원 있는 경우
                totalPrice = //시간*(unitPrice + excharge*(최대 인원수)
                    this.difTime * (studioFilter.unitPrice + studioFilter.excharge * (this.total_people - studioFilter.defaultCapacity));
            } else {
                // 추가 인원 없는 경우
                totalPrice = this.difTime * studioFilter.unitPrice;
            }
            return totalPrice;
        },
        checkSchedule: function() { //예약 불가능한 날짜
            // =================================== 로직 변수 설정 =================================== 
            // 날짜를 시간으로 변환하여 비교 
            let startDayTime = this.transTime(this.start_date, parseInt(this.start_time));
            let endDayTime = this.transTime(this.end_date, parseInt(this.end_time));
            // console.log("startDayTime : " + startDayTime + ", endDayTime : " + endDayTime);
            console.log("this.start_time : " + this.start_time + ", this.end_time : " + this.end_time);
            // 요일로 변환한 날짜
            let startDay = this.transDay(this.start_date);
            let endDay = this.transDay(this.start_date);
            let msg = "일정을 입력해주세요";
            let start_idx = this.repeatedDate.indexOf(week[startDay], 0);
            let end_idx = this.repeatedDate.indexOf(week[endDay], 0);

            // =================================== 로직 START~!! =================================== 
            if (this.start_date == "" | this.end_date == "" | this.start_time == "" | this.end_time == "")
                return msg;
            else {
                //1. exeption에 포함 안 되는지 확인
                console.log("새로 등록할 날짜 및 시간 ) | endDay : " + endDay + "startDay :" + startDay);
                for (let k = 0; k < this.exceptionLength; k++) {
                    if ((new Date(this.schedule.exceptionDate[k].endDate)).getTime <= startDayTime |
                        (new Date(this.schedule.exceptionDate[k].startDate)).getTime >= endDayTime) {
                        //포함안되면 repeat가서 뒤지기
                        if (this.repeatedDate.indexOf(week[startDay], 0) > -1) { //일치하는 요일의 시작 시간 가져오기
                            if (parseInt(this.start_time) >= parseInt(this.repeated[start_idx].time.split('-')[0]) &
                                (parseInt(this.start_time) < parseInt(this.repeated[end_idx].time.split('-')[1]))) {
                                console.log("bbbb")
                                if (this.repeatedDate.indexOf(week[endDay], 0) > -1) { //일치하는 요일의 종료 시간 가져오기
                                    console.log("cccc")
                                    if (parseInt(this.end_time) > parseInt(this.repeated[start_idx].time.split('-')[0]) &
                                        (parseInt(this.end_time) <= parseInt(this.repeated[end_idx].time.split('-')[1]))) {
                                        console.log("dddd")
                                        msg = "등록 가능한 일정입니다.";
                                        return msg;
                                    } else {
                                        msg = "종료 시간이 영업 외 시간 입니다.";
                                        this.end_time = this.repeated[end_idx].time.split('-')[1];
                                        return msg;
                                    }
                                }
                                msg = "종료일이 영업일이 아닙니다.";
                                this.end_date = "";
                                return msg;
                            } else {
                                msg = "시작 시간이 영업 외 시간 입니다.";
                                this.start_time = this.repeated[start_idx].time.split('-')[0];
                                return msg;
                            }
                        } else {
                            msg = "시작일이 영업일이 아닙니다.";
                            this.start_date = "";
                            return msg;
                        }
                    }

                }
                msg = "이미 예약이 된 일정입니다.";
                return msg;
            }
        }
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
            if (this.total_price > 0 && this.checkSchedule == "") {
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
            let resultDate = (new Date(date));
            // console.log(resultDate + " : resultDate");
            resultDate.setHours(resultDate.getHours() + time);
            console.log(resultDate);
            return resultDate.getTime();
        },
        transDay(date) {
            let splitDate = date.split('-');
            let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getDay();
            console.log(resultDate + " : resultDate transDay");
            return resultDate;
        },
    }
};

//////////////// ~~~~~ 예약 일정 체크 Method 시작 ~~~~~ ////////////////
// 1. exception 
// : 예약할 때 같이 넣어서 ExcpetionDate만 확인해도 예약 가능/불가능 체크 ok       
// checkException(startDayTime, endDayTime) {
//     console.log("checkException if 전 입니다 :" + startDayTime + ", exceptiondate" + this.schedule.exceptionDate[0]);
//     for (var i = 0; i < this.schedule.exceptionDate.length; i++) {
//         //포함안되면 repeat가서 뒤지기
//         //날짜 + 시간을 초로 환산 >> 등록하려는 시작일이 기존 예약의 종료시간보다 늦거나 
//         // 등록하려는 종료일이 기존 예약의 시작시간보다 빠른 경우 기존 예약 및 ExceptionDate에 포함 X
//         if ((new Date(this.schedule.exceptionDate[i].endDate).getTime <= startDayTime) |
//             (new Date(this.schedule.exceptionDate[i].startDate).getTime >= endDayTime)) {
//             console.log("checkException if 입니다. exception 일정이 없습니다.");
//             continue;
//         } else {
//             return 1;
//         }
//     }
//     return 0;
//     // For문을 빠져나왔다면 flag=0. 즉, 예약 불가능이 아니다 >> RepeatDate에서 영업일인지 체크        
// },
// //2. 
// checkOpentDate(startDay, start_idx) {
//     //var weekday = this.schedule.repeatDate.weekDate;
//     for (var i = 0; i < this.schedule.repeatDate.length; i++) {
//         console.log("checkOpentDate if 전 입니다 :" + (week[startDay]) + ", weekday" + this.schedule.repeatDate.weekDate);
//         if (this.schedule.repeatDate[i].weekDate == week[startDay]) { //시작일이 요일 리스트에 있다면 영업 ㅇㅋ
//             start_idx = i;
//             return start_idx;
//         }
//     }
//     this.start_date = "";
//     return 0;
// },
// checkCloseDate(endDay, end_idx) {
//     //var weekday = this.schedule.repeatDate.weekDate
//     for (var i = 0; i < this.schedule.repeatDate.length; i++) {
//         console.log("checkCloseDate if 전 입니다 :" + (week[endDay]) + ", weekday" + this.schedule.repeatDate.weekDate.length);
//         if (this.schedule.repeatDate[i].weekDate == week[endDay]) { //종료일이 요일 리스트에 있다면 영업 ㅇㅋ
//             end_idx = i;
//             return end_idx;
//         }
//     }
//     return 0;
// },
// checkOpenTime(start_idx) {
//     if ((parseInt(this.start_time) >= parseInt(this.schedule.repeatDate[start_idx].time.split("-")[0])) &
//         (parseInt(this.start_time) < parseInt(this.schedule.repeatDate[start_idx].time.split("-")[1]))) {
//         console.log("checkOpenTime if 입니다 :" + this.start_time + ", 시작시간" + this.schedule.repeatDate[start_idx].time.split("-")[0]);
//         return 1;
//     } else { // 선택한 시작시간이 영업시간대가 아니면, 해당 요일의 오픈 시간 삽입
//         this.start_time = parseInt(this.schedule.repeatDate[start_idx].time.split("-")[0]);
//         return 0;
//     }
// },
// checkCloseTime(end_idx) {
//     if ((parseInt(this.end_time) >= parseInt(this.schedule.repeatDate[end_idx].time.split("-")[0])) &
//         (parseInt(this.end_time) < parseInt(this.schedule.repeatDate[end_idx].time.split("-")[1]))) {
//         console.log("checkCloseTime if 입니다 :" + this.end_time + ", 시작시간" + this.schedule.repeatDate[end_idx].time.split("-")[1]);
//         return 1;
//     } else {
//         this.end_time = parseInt(this.schedule.repeatDate[end_idx].time.split("-")[1]);
//         return 0;
//     }
// }