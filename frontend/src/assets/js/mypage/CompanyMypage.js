import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";
import Axios from "axios";

var session = JSON.parse(sessionStorage.getItem("company"));

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
        'calendar': Calendar
    },
    data() {
        return {
            comId: session.comId,
            studioList: [],
            studioFlag: true,

            /*calendar header */
            thisWeek: "",

            /*Calendar index*/
            calendarList: [{
                    id: '0',
                    name: 'Pics예약',
                    color: '#ffffff',
                    bgColor: '#9e5fff',
                    dragBgColor: '#9e5fff',
                    borderColor: '#9e5fff'
                },
                {
                    id: '1',
                    name: '예약불가능',
                    color: '#ffffff',
                    bgColor: '#00a9ff',
                    dragBgColor: '#00a9ff',
                    borderColor: '#00a9ff'
                }
            ],
            scheduleList,
            taskView: false,
            week: {
                showTimezoneCollapseButton: true,
                timezonesCollapsed: false
            },
            month: {
                visibleWeeksCount: 6,
                startDayOfWeek: 1
            },
            disableDblClick: true,
            isReadOnly: false,
            useCreationPopup: true,
            useDetailPopup: false,


        };
    },
    mounted() {
        /* 소유 스튜디오 불러오기 */
        Axios.get("http://localhost:7777/studio/" + this.comId)
            .then(res => {
                console.log(res.data);
                this.studioList = res.data;
                this.studioFlag = false;
            }).catch(err => {
                console.log(err);
            });
    },
    methods: {}
};