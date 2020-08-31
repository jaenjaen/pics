import axios from "axios";
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';
// import Vuetify from 'vuetify/lib';
// import vmodal from 'vue-js-modal'


// 요일 변환을 위한 리스트
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];


export default {
    name: "Reservation",
    data() {
        return {
            // studio 관련 변수 (GET)
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
                    address: "",
                },
                tags: [{
                    tagId: 0,
                    tagName: ""
                }],
            },
            //기존 예약 관련 변수 (GET)
            // checkReservation: [],
            schedule: {
                repeatDate: [{
                    weekDate: "",
                    time: ""
                }],
                exceptionDate: [{
                    weekDate: '',
                    time: ''
                }],
                reservation: [{
                    custId: 3,
                    stuId: 10,
                    startDate: "",
                    endDate: "",
                    totalPrice: 0,
                    totalPeople: 0
                }]
            },
            customer: {}, //토큰받아오기
            //새로운 예약 관련 변수(POST)
            custId: 3,
            stuId: 10,
            start_date: "",
            end_date: "",
            total_people: 1,
            total_price: 0,
            start_time: 0,
            end_time: 0,
            difTime: 0,
            times: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
            today: new Date(),
            flag: 0,
            // 상태 체크 변수
            loading: true,
            errored: false,
            duplicatedCheck: '',

        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/studio/info/10')
            .then(response => {
                this.studios = response.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/customer/3')
            .then(response => {
                this.customer = response.data;
                // console.log(this.studios);
            })
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)

        axios
            .get("http://127.0.0.1:7777/studio/schedule/10")
            .then(response => {
                this.schedule = response.data
                console.log(this.schedule);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    filters: { // 숫자를 금액 형식으로
        currency: function(value) {
            if (!isNaN(value)) return value.toLocaleString();
            else return 0
        }
    },
    computed: {
        // 수정 필요
        // checkSchedule: function() { //예약 불가능한 날짜
        //     // 시간으로 변환한 날짜
        //     var startDayTime = (new Date(this.start_date + " " + this.start_time + ":00:00")).getTime();
        //     var endDayTime = (new Date(this.end_date + " " + this.end_time + ":00:00")).getTime();
        //     // 요일로 변환한 날짜
        //     var startDay = (new Date(this.start_date)).getDay();
        //     var endDay = (new Date(this.end_date)).getDay();
        //     var msg = "";
        //     if (this.start_date == "" | this.and_date == "" | this.start_time == "" | this.end_time == "")
        //         return msg;
        //     else {
        //         //방법 2. exeption에 포함 안 되는지 
        //         for (var k = 0; k < this.schedule.exceptionDate.length; k++) {
        //             //포함안되면 repeat가서 뒤지기
        //             console.log("새로 등록할 날짜 및 시간 : " + week[startDay] + "/" + startDayTime +
        //                 "/end : " + endDayTime + "/" + week[endDay]);
        //             console.log("Exc : " + new Date(this.schedule.exceptionDate[0].startDate).getTime() +
        //                 "|" + new Date(this.schedule.exceptionDate[0].endDate).getTime());
        //             if ((new Date(this.schedule.exceptionDate[k].endDate)).getTime() <= startDayTime |
        //                 (new Date(this.schedule.exceptionDate[k].startDate)).getTime() >= endDayTime) {
        //                 for (var j = 0; j < this.schedule.repeatDate.length; j++) {
        //                     if (this.schedule.repeatDate[j].weekDate == week[startDay]) { //일치하는 요일의 시작 시간 가져오기
        //                         console.log("시간 : " + parseInt(this.start_time) + week[startDay] + this.schedule.repeatDate[j].weekDate);
        //                         if (parseInt(this.start_time) >= parseInt(this.schedule.repeatDate[j].time.split('-')[0]) &
        //                             (parseInt(this.start_time) < parseInt(this.schedule.repeatDate[j].time.split('-')[1]))) {
        //                             msg = "";
        //                             return msg;
        //                         } else {
        //                             msg = "시작 시간이 영업 전 시간 입니다.";
        //                             return msg;
        //                         }
        //                     }
        //                     if (this.schedule.repeatDate[j].weekDate == week[endDay]) { //일치하는 요일의 종료 시간 가져오기
        //                         if (parseInt(this.end_time) > parseInt(this.schedule.repeatDate[j].time.split('-')[0]) &
        //                             (parseInt(this.end_time) <= parseInt(this.schedule.repeatDate[j].time.split('-')[1]))) {
        //                             msg = "";
        //                             return msg;
        //                         } else {
        //                             msg = "종료 시간이 영업 외 시간 입니다.";
        //                             return msg;
        //                         }
        //                     } else {
        //                         msg = "영업일이 아닙니다.";
        //                         return msg;
        //                     }

        //                 }
        //             } else {
        //                 msg = "이미 예약이 된 일정입니다.";
        //                 return msg;
        //             }
        //         }
        //     }
        // },


        checkSchedule: function() { //예약 불가능한 날짜
            // 시간으로 변환한 날짜
            var startDayTime = (new Date(this.start_date + " " + this.start_time + ":00:00")).getTime();
            var endDayTime = (new Date(this.end_date + " " + this.end_time + ":00:00")).getTime();
            // 요일로 변환한 날짜
            var startDay = (new Date(this.start_date)).getDay();
            var endDay = (new Date(this.end_date)).getDay();
            var msg = "";
            if (this.start_date == "" | this.and_date == "" | this.start_time == "" | this.end_time == "")
                return msg;
            else {
                //방법 2. exeption에 포함 안 되는지 
                for (var k = 0; k < this.schedule.exceptionDate.length; k++) {
                    //포함안되면 repeat가서 뒤지기
                    if ((new Date(this.schedule.exceptionDate[k].endDate)).getTime() <= startDayTime |
                        (new Date(this.schedule.exceptionDate[k].startDate)).getTime() >= endDayTime) {
                        for (var j = 0; j < this.schedule.repeatDate.length; j++) {
                            if (this.schedule.repeatDate[j].weekDate == week[startDay]) { //일치하는 요일의 시작 시간 가져오기
                                console.log("시간 : " + parseInt(this.start_time) + week[startDay] + this.schedule.repeatDate[j].weekDate);
                                if (parseInt(this.start_time) >= parseInt(this.schedule.repeatDate[j].time.split('-')[0]) &
                                    (parseInt(this.start_time) < parseInt(this.schedule.repeatDate[j].time.split('-')[1]))) {
                                    msg = "";
                                    return msg;
                                } else {
                                    msg = "시작 시간이 영업 전 시간 입니다.";
                                    return msg;
                                }
                            }
                            if (this.schedule.repeatDate[j].weekDate == week[endDay]) { //일치하는 요일의 종료 시간 가져오기
                                if (parseInt(this.end_time) > parseInt(this.schedule.repeatDate[j].time.split('-')[0]) &
                                    (parseInt(this.end_time) <= parseInt(this.schedule.repeatDate[j].time.split('-')[1]))) {
                                    msg = "";
                                    return msg;
                                } else {
                                    msg = "종료 시간이 영업 외 시간 입니다.";
                                    return msg;
                                }
                            } else {
                                msg = "영업일이 아닙니다.";
                                return msg;
                            }

                        }
                    } else {
                        msg = "이미 예약이 된 일정입니다.";
                        return msg;
                    }
                }
            }
        },
        totalPriceCalculate: function() {
            // 1. 일자 >> 시간대로 변경
            var startSplit = this.start_date.split("-");
            var endSplit = this.end_date.split("-");
            var startDate = (new Date(startSplit[0], startSplit[1], startSplit[2])).getTime();
            var endDate = (new Date(endSplit[0], endSplit[1], endSplit[2])).getTime();
            this.difTime = (endDate - startDate) / (60 * 60 * 1000);
            var startTime = parseInt(this.start_time);
            var endTime = parseInt(this.end_time);
            // console.log(this.startDate + "|" + endDate + "|" + startTime + "|" + endTime + "|" + Date.UTC());

            // 3. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후
            if (startDate < new Date()) {
                alert("대여 시작일은 현재 날짜 이후로 가능합니다.");
                this.start_date = ("");
                startTime = this.start_date;
            }
            if (this.difTime < 0) { // 시작일보다 종료일이 빠른 경우 
                alert("대여 종료일을 시작일 이후로 설정하세요.");
                this.end_date = this.start_date;
                endDate = startDate;
            } else if (this.difTime == 0) { //하루 예약이면 시작시간 < 종료시간
                if ((startTime * endTime > 0) & (startTime >= endTime)) {
                    alert("대여 종료시간은 시작시간 이후로 설정하세요.");
                    this.end_time = this.start_time + 1;
                    endTime = parseInt(this.start_time) + 1;
                }
            }
            //4. 시간대 반영
            var total_price = 0;
            if (startTime >= endTime)
                this.difTime -= (endTime - startTime);
            else this.difTime += (endTime - startTime);
            // 4. 총 요금        
            if (this.total_people > this.studios[0].studioFilter.defaultCapacity) { // 추가 인원 있는 경우
                total_price = //시간*(unitPrice + excharge*(최대 인원수)
                    this.difTime * (this.studios[0].studioFilter.unitPrice + this.studios[0].studioFilter.excharge *
                        (this.total_people - this.studios[0].studioFilter.defaultCapacity))
            } else { // 추가 인원 없는 경우
                total_price = this.difTime * (this.studios[0].studioFilter.unitPrice)
            }
            this.total_price = total_price;
            return total_price;
        }
    },
    methods: {
        deletePeople() {
            if (this.total_people > 1)
                this.total_people--;
            else
                alert("최소 1명 이상 선택해주세요.");
        },
        addPeople() {
            if (this.total_people <
                parseInt(this.studios[0].studioFilter.maxCapacity))
                this.total_people++;
            else
                alert("최대 인원을 초과했습니다.");
        },
        addReserve() {
            // 유저 Id 가져오기
            //2. 예약 중복 확인(일단 토큰에서 유저 id 가져왔다 치고) reservation 변수 설정
            if (this.total_people > 0 && this.checkSchedule == "") {
                this.newReservarion.stuId = 10, // 임의로 삽입
                    this.newReservarion.custId = 3, //토큰 연결 안되어서 임의로 삽입
                    this.newReservarion.startDate = this.start_date + " " + this.start_time,
                    this.newReservarion.endDate = this.end_date + " " + this.end_time,
                    this.newReservarion.totalPrice = this.total_price,
                    this.newReservarion.totalPeople = this.total_people

                axios
                    .post("http://127.0.0.1:7777/studio/reservation", this.newReservarion)
                    .then(response => {
                        console.log(response.data);
                        // alert(response.data + "건 예약이 완료되었습니다. 마이페이지에서 예약 내역을 확인하세요.")
                        // location.href = "#" //마이페이지 또는.. 현재 예약 페이지 reset
                    })
                    .catch(error => {
                        console.log(error + "post에서 에러");
                        this.errored = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }

    }
}