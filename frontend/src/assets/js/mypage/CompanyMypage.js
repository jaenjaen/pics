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

/* calendar tag */
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

var scheduleList = [{
        id: '1',
        calendarId: '0',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-09-14T22:30:00+09:00',
        end: '2020-09-15T02:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-09-16T17:30:00+09:00',
        end: '2020-09-17T17:31:00+09:00'
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
            scheduleList,
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
            alert(this.selectedId);
        },

        /* 지난주로 */
        prevWeek: function() {
            this.$refs.studioCalendar.invoke('prev');
            this.changeFormat(this.$refs.studioCalendar.invoke('getDateRangeStart'), this.$refs.studioCalendar.invoke('getDateRangeEnd'));
            //alert(this.$refs.studioCalendar.invoke('getDate').toDate()); check date
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
    }
};