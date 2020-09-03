import axios from "axios";
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial)

// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default {
    name: "Reservation",
    // props: {
    //     stuId: {
    //         type: String,
    //         default: ''
    //     }
    // },
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
            start_time: 0,
            end_time: 0,
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
            maxDate: new Date((this.today).getYear(), (this.today).getMonth + 1, (this.today).getDate),
            disabledDates: [],
            closedDates: [],
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
                console.log(this.schedule);
                let repeat_date = [];
                for (var i = 0; i < (this.schedule.repeatDate).length; i++) {
                    repeat_date.push(this.schedule.repeatDate[i].weekDate)
                }
                let diff = ((this.getMaxDate).getTime - (this.today).getTime) / (1000 * 60 * 60)
                for (var j = 0; j < diff; j++) { // weekDate를 돌면서
                    if (repeat_date.indexOf(week[(this.today.getDate() + j).getDay], 0) < 0) { // week에 없으면
                        console.log("j : " + j + ", week[i] : " + week[j])
                        this.disabledDates.push(j)
                    }
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
        // 숫자를 금액 형식으로
        currency: function(value) {
            if (!isNaN(value)) return value.toLocaleString();
            else return 0;
        }
    },
    computed: {
        // 수정 필요
        checkSchedule: function() { //예약 불가능한 날짜
            // 시간으로 변환한 날짜
            var startDayTime = (new Date(this.start_date + " " + this.start_time + ":00:00")).getTime;
            var endDayTime = (new Date(this.end_date + " " + this.end_time + ":00:00")).getTime;
            // 요일로 변환한 날짜
            var startDay = (new Date(this.start_date)).getDay();
            var endDay = (new Date(this.end_date)).getDay();
            var msg = "";

            // repeatDate로 가능 불가능 구분

            if (this.start_date == "" | this.and_date == "" | this.start_time == "" | this.end_time == "")
                return msg;
            else {
                //방법 2. exeption에 포함 안 되는지
                for (var k = 0; k < this.schedule.exceptionDate.length; k++) {
                    //포함안되면 repeat가서 뒤지기
                    console.log("새로 등록할 날짜 및 시간 : " + week[startDay] + "/" + startDayTime +
                        "/end : " + endDayTime + "/" + week[endDay]);
                    console.log("Exc : " + new Date(this.schedule.exceptionDate[0].startDate).getTime +
                        "|" + new Date(this.schedule.exceptionDate[0].endDate).getTime);
                    if ((new Date(this.schedule.exceptionDate[k].endDate)).getTime <= startDayTime |
                        (new Date(this.schedule.exceptionDate[k].startDate)).getTime >= endDayTime) {
                        for (var i = 0; i < this.schedule.repeatDate.length; i++) {
                            if (this.schedule.repeatDate[i].weekDate == week[startDay]) { //일치하는 요일의 시작 시간 가져오기
                                console.log("시간 : " + parseInt(this.start_time) + week[startDay] + this.schedule.repeatDate[i].weekDate);
                                if (parseInt(this.start_time) >= parseInt(this.schedule.repeatDate[i].time.split('-')[0]) &
                                    (parseInt(this.start_time) < parseInt(this.schedule.repeatDate[i].time.split('-')[1]))) {
                                    for (var j = 0; j < this.schedule.repeatDate.length; j++) {
                                        if (this.schedule.repeatDate[j].weekDate == week[endDay]) { //일치하는 요일의 종료 시간 가져오기
                                            if (parseInt(this.end_time) > parseInt(this.schedule.repeatDate[j].time.split('-')[0]) &
                                                (parseInt(this.end_time) <= parseInt(this.schedule.repeatDate[j].time.split('-')[1]))) {
                                                msg = "";
                                                return msg;
                                            } else {
                                                msg = "종료 시간이 영업 외 시간 입니다.";
                                                this.end_time = "";
                                                return msg;
                                            }
                                        }
                                    }
                                    msg = "종료일이 영업일이 아닙니다.";
                                    this.end_date = "";
                                    return msg;
                                } else {
                                    msg = "시작 시간이 영업 외 시간 입니다.";
                                    this.start_time = "";
                                    return msg;
                                }
                            }
                        }
                        msg = "시작일이 영업일이 아닙니다.";
                        this.start_date = "";
                        return msg;
                    } else {
                        msg = "이미 예약이 된 일정입니다.";
                        this.start_date = "";
                        this.start_time = "";
                        this.end_date = "";
                        this.end_time = "";
                        return msg;
                    }
                }
            }
        },
        // 1. 먼저 날짜랑 시간 쪼개서 변수 생성. 이 안에서 메서드 4개 호출
        // checkSchedule: function() {
        //     // 시간으로 변환한 날짜
        //     var startDayTime = new Date(
        //         this.start_date + " " + this.start_time + ":00:00").getTime;
        //     var endDayTime = new Date(
        //         this.end_date + " " + this.end_time + ":00:00"
        //     ).getTime;

        //     // 요일로 변환한 날짜
        //     var startDay = new Date(this.start_date).getDay();
        //     var endDay = new Date(this.end_date).getDay();
        //     var msg = ""; // 출력 메세지
        //     var start_idx = 0;
        //     var end_idx = 0;
        //     console.log("startDay : " + endDay + " | endDay : " + endDay + " | startDayTime : " + startDayTime + "| endDayTime : " + endDayTime);
        //     console.log("this.start_date : " + this.start_date + " | this.end_date : " + this.end_date);
        //     if ((this.start_date == "") | (this.and_date == "") | (this.start_time == "") | (this.end_time == ""))
        //         return msg;
        //     //   else { //날짜 시간 모두 입력했다면...시작..! 
        //     if (this.checkException(startDayTime, endDayTime) == 1) { //1이라면 
        //         msg = "예약이 불가능한 일정입니다.";
        //         this.start_date = "";
        //         this.end_date = "";
        //         return msg;
        //     } else {
        //         if (this.checkOpentDate(startDay, start_idx) == 0 && this.checkCloseDate(endDay, end_idx) == 0) {
        //             //시작과 종료일 모두  영업일이 아님
        //             msg = "예약 시작일과 종료일은 모두 비 영업일 입니다."
        //             return msg
        //         } else if (this.checkOpentDate(startDay, start_idx) == 0 && this.checkCloseDate(endDay, end_idx) != 0) {
        //             //종료일이 영업일이 아님
        //             msg = "예약 종료일은 영업일이 아닙니다."
        //             return msg
        //         } else if (this.checkOpentDate(startDay, start_idx) != 0 && this.checkCloseDate(endDay, end_idx) == 0) {
        //             //시작일이 영업일이 아님
        //             msg = "예약 시작일은 영업일이 아닙니다."
        //             return msg
        //         } else { // 둘다 영업일인 경우 영업 시간 체크
        //             // 영업 시간 체크
        //             if (this.checkOpenTime(start_idx) != 0 && this.checkCloseTime(end_idx) != 0) {
        //                 //시작과 종료시간 모두  영업일이 아님
        //                 msg = "예약 가능합니다."
        //                 return msg
        //             } else if (this.checkOpenTime(start_idx) == 0 && this.checkCloseTime(end_idx) != 0) {
        //                 //종료일이 영업시간이 아님
        //                 msg = "예약 종료시간은 영업시간이 아닙니다."
        //                 return msg
        //             } else if (this.checkOpenTime(start_idx) != 0 && this.checkCloseTime(end_idx) == 0) {
        //                 //시작일이 영업일이 아님
        //                 msg = "예약 시작시간은 영업시간이 아닙니다."
        //                 return msg
        //             } else {
        //                 msg = "예약 시작시간은 영업시간이 아닙니다."
        //                 this.start_date = "";
        //                 return msg
        //             }
        //         }
        //     }
        //     //}
        // },
        totalPriceCalculate: function() {
            // 1. 일자 >> 시간대로 변경
            var startSplit = this.start_date.split("-");
            var endSplit = this.end_date.split("-");
            var startDate = new Date(
                startSplit[0],
                startSplit[1],
                startSplit[2]
            ).getTime;
            var endDate = new Date(endSplit[0], endSplit[1], endSplit[2]).getTime;
            this.difTime = (endDate - startDate) / (60 * 60 * 1000);
            var startTime = parseInt(this.start_time);
            var endTime = parseInt(this.end_time);
            // console.log(this.startDate + "|" + endDate + "|" + startTime + "|" + endTime + "|" + Date.UTC());

            // 3. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후
            if (startDate < new Date()) {
                alert("대여 시작일은 현재 날짜 이후로 가능합니다.");
                this.start_date = "";
                startTime = this.start_date;
            }
            if (this.difTime < 0) {
                // 시작일보다 종료일이 빠른 경우
                alert("대여 종료일을 시작일 이후로 설정하세요.");
                this.end_date = this.start_date;
                endDate = startDate;
            } else if (this.difTime == 0) {
                //하루 예약이면 시작시간 < 종료시간
                if ((startTime * endTime > 0) & (startTime >= endTime)) {
                    alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                    this.end_time = this.start_time + 1;
                    endTime = parseInt(this.start_time) + 1;
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
    }
};