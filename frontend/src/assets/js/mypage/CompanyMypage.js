import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";
import Axios from "axios";
import moment from 'moment';

var session = JSON.parse(sessionStorage.getItem("company"));

/* setting week*/
moment.locale('ko'); //set Korean Time

/* calendar tag DONT FIXING IT*/
let calendarList = [{
        id: '0',
        name: 'Pics예약',
        color: '#ffffff',
        bgColor: '#00a9ff',
        dragBgColor: '#00a9ff',
        borderColor: '#00a9ff'
    },
    {
        id: '1',
        name: '예약불가능',
        color: '#ffffff',
        bgColor: '#757575',
        dragBgColor: '#757575',
        borderColor: '#757575'
    }
]

export default {
    name: "CompanyMypage",
    components: {
        MypageNametag,
        MypageGap,
        Inquiry,
        'calendar': Calendar,
        moment
    },
    data() {
        return {
            comId: session.comId,
            studioList: [],
            studioFlag: true,
            selectedId: "",

            /*calendar header */
            startWeek: moment().startOf('week').format('L'),
            endWeek: moment().endOf('week').format('L'),

            /*Calendar index*/
            calendarList,
            scheduleList: [],

            /* for modal */
            styles: "border-left: 10px solid #00a9ff",
            calendarId: "1",

            /* Detail */
            userName: "",
            reservationDate: "",
            reservationCategory: "",
            category: {
                width: '20px',
                height: '20px',
                backgroundColor: ""
            }

        };
    },
    mounted() {
        /* 소유 스튜디오 불러오기 */
        Axios.get("http://localhost:7777/studio/" + this.comId)
            .then(res => {
                this.studioList = res.data;
                this.studioFlag = false;
            }).catch(err => {
                console.log(err);
            });
    },
    methods: {
        getStudioReservation: function() {
            //초기화 안하면 쌓임
            this.scheduleList = [];

            Axios.get("http://localhost:7777/company/schedule/" + this.selectedId)
                .then(res => {
                    // console.log(res.data);
                    var data = res.data;

                    /* Exception Date Setting */
                    for (var i = 0; i < data.exceptionDate.length; i++) {
                        this.scheduleList.push({
                            id: data.exceptionDate[i].exceptionId,
                            calendarId: '1',
                            title: data.exceptionDate[i].exceptionTitle,
                            category: 'time',
                            dueDateClass: '',
                            start: Date.parse(data.exceptionDate[i].startDate),
                            end: Date.parse(data.exceptionDate[i].endDate)
                        });
                    }

                    /* Reservation Setting */
                    for (var j = 0; j < data.reservation.length; j++) {
                        this.scheduleList.push({
                            id: data.reservation[j].resId,
                            calendarId: '0',
                            title: data.reservation[j].customer.nickname,
                            category: 'time',
                            dueDateClass: '',
                            start: Date.parse(data.reservation[j].startDate),
                            end: Date.parse(data.reservation[j].endDate),
                            body: data.reservation[j].custId,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

        /* 지난주로 */
        prevWeek: function() {
            this.$refs.studioCalendar.invoke('prev');
            this.changeFormat(this.$refs.studioCalendar.invoke('getDateRangeStart'), this.$refs.studioCalendar.invoke('getDateRangeEnd'));
            //alert(this.$refs.studioCalendar.invoke('getDate').toDate()); check dateexception_title
        },

        /* 이번주로 */
        moveToday: function() {
            this.$refs.studioCalendar.invoke('today');
            this.changeFormat(this.$refs.studioCalendar.invoke('getDateRangeStart'), this.$refs.studioCalendar.invoke('getDateRangeEnd'));
        },

        /* 다음주로 */
        nextWeek: function() {
            this.$refs.studioCalendar.invoke('next');
            this.changeFormat(this.$refs.studioCalendar.invoke('getDateRangeStart'), this.$refs.studioCalendar.invoke('getDateRangeEnd'));
        },

        /* 날짜 변환용 */
        changeFormat: function(start, end) {
            this.startWeek = moment(start.toUTCString()).format('L');
            this.endWeek = moment(end.toUTCString()).format('L');

        },

        /* Custom Creation Modal */
        onBeforeCreateSchedule: function(e) {
            this.$modal.show("creationModal");
            console.log(e);

        },

        /*Custom Detail Modal */
        onClickSchedule: function(e) {
            this.$modal.show("detailModal");
            console.log(e);
            this.userName = e.schedule.title;
            this.reservationDate = e.schedule.start + "~" + e.schedule.end;
            this.reservationCategory = "";
        }
    }
};