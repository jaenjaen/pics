import axios from "axios";
import vueMultiSelect from "vue-multi-select"; //https://vue-multi-select.tuturu.io/
import "vue-multi-select/dist/lib/vue-multi-select.css";

export default {
    components: { vueMultiSelect },
    data() {
        return {
            /* Back으로 보낼 studio 데이터 */
            studio: {
                categoryId: "",
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: "",
                studioFilter: {
                    size: "",
                    options: null,
                    parking: "",
                    unitPrice: "",
                    defaultCapacity: "",
                    excharge: "",
                    address: "",
                    maxCapacity: ""
                },
                schedule: {
                    repeatDate: [{
                        weekDate: "",
                        time: ""
                    }]
                },
                tag: [{
                    tagName: ""
                }]
            },

            /* 운영시간 */
            timePerDay: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            week: [{
                mon: "",
                tue: "",
                wed: "",
                thu: "",
                fri: "",
                sat: "",
                sun: ""
            }],
            checkBox1: true,
            checkBox2: true,
            checkBox3: true,
            checkBox4: true,
            checkBox5: true,
            checkBox6: true,
            checkBox7: true,

            /* 장비 및 옵션 */
            btnLabel: option_save => `장비 및 옵션 (${option_save.length})`,
            option_save: [],
            option_list: [{
                name: "장비 및 옵션",
                list: [
                    { name: "카메라" },
                    { name: "조명" },
                    { name: "반사판" },
                    { name: "포토그래퍼" }
                ]
            }],
            option_filters: [{
                nameAll: "전체선택",
                nameNotAll: "전체해제",
                func() {
                    return true;
                }
            }],
            option_flags: {
                multi: true,
                groups: true
            },

            /* 태그 개수 - 1개 이상 입력 */
            tagCount: 0,

            /* 동의 체크 개수 - 3개 모두 동의 */
            agreeCount: 0
        };
    },
    methods: {
        //선택 취소할 수 있게 해야 함...
        selectDay(day) {
            let thisCheck = document.getElementById(day); //선택한 요일 checkbox 객체
            let checkDay = document.getElementsByName("day"); //전체 요일 checkbox 객체
            let checkDayCount = 0; //체크된 요일 개수
            let allDay = document.getElementsByClassName("daySelect"); //요일별 시간리스트들

            /* 선택한 요일의 개수 세고, 모든 요일을 체크했으면 전체선택에 체크 표시 */
            for (let i = 0; i < checkDay.length; i++) {
                if (checkDay[i].checked) checkDayCount++;
            }
            if (checkDayCount == 7) {
                document.getElementById('no').checked = true;
            }

            let dayAll = document.getElementById("dayAll"); //전체선택 영역
            let dayNo = document.getElementById("dayNo"); //전체해제 영역

            /* 전체선택을 체크했을 때 */
            if (day == "all") {
                for (let i = 0; i < allDay.length; i++) {
                    allDay[i].style.display = "inline-block";
                    checkDay[i].checked = true;
                }
                dayAll.setAttribute('style', 'display:none');
                dayNo.setAttribute('style', 'display:inline-block');
            }

            /* 전체해제를 체크했을 때 */
            else if (day == "no") {
                for (let i = 0; i < allDay.length; i++) {
                    allDay[i].style.display = "none";
                    checkDay[i].checked = false;
                }
                dayAll.setAttribute('style', 'display:inline-block');
                dayNo.setAttribute('style', 'display:none');
            }

            /* 요일을 체크했을 때 */
            else {
                let whatDay = document.getElementById(day);
                thisCheck = document.getElementById(day.substring(0, 3));
                if (thisCheck.checked) { //요일 체크시 보임
                    whatDay.style.display = "inline-block";
                } else { //요일 체크 해제시 숨김
                    whatDay.style.display = "none";
                }
            }
        },
        selectAllTime(command, dayTime, visibleArea, unvisibleArea, checkFlag) {
            /* 특정 요일의 하루 시간 전체 체크, 체크 해제 */
            var thisTime = document.getElementById(dayTime);
            var thisVisible = document.getElementById(visibleArea);
            var thisUnvisible = document.getElementById(unvisibleArea);
            var flag = document.getElementById(checkFlag);
            if (command == 'select') {
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = true;
                }
                flag.checked = true;
            }
            if (command == 'deselect') {
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = false;
                }
                flag.checked = false;
            }
            thisVisible.setAttribute('style', 'display:block');
            thisUnvisible.setAttribute('style', 'display:none');
        },
        selectTime(day) {
            /* 요일 공통 알고리즘 */
            let time_list = "";
            let start = -1; //시작시간
            let front = 0;
            let temp_list = document.getElementById(day);
            for (let i = 0; i < temp_list.length; i++) {
                if (this.timePerDay[i] == 0) { //선택하지 않은 상태
                    this.timePerDay[i] = 1;
                }
                if (this.timePerDay[i] == 1) { //선택한 상태
                    this.timePerDay[i] = 0;
                }
            }

            for (let i = 0; i < temp_list.length; i++) {
                if (temp_list[i].selected) {
                    start = i; //시작 인덱스 할당
                    front = i; //앞 인덱스 할당
                    time_list = start + "-";
                    break;
                }
            }
            //다시 생각해서 짜기...
            for (let i = front + 1; i < temp_list.length; i++) {
                if (!temp_list[i].selected) continue; //선택되지 않은 건 제낌
                if (i - front == 1) {
                    //연속적으로 이어지는 시간대일 경우
                    front = i;
                }
                if (i - front > 1) {
                    //이어지지 않은 시간일 경우
                    start = -1;
                    front = i;
                }
            }

            /* 요일별 바인딩 */
            switch (day) {
                case "mon":
                    this.week.mon = time_list;
                    break;
                case "tue":
                    this.week.tue = time_list;
                    break;
                case "wed":
                    this.week.wed = time_list;
                    break;
                case "thu":
                    this.week.thu = time_list;
                    break;
                case "fri":
                    this.week.frii = time_list;
                    break;
                case "sat":
                    this.week.sat = time_list;
                    break;
                case "sun":
                    this.week.sun = time_list;
                    break;
            }
        },
        checkParkFlag(flag) {
            if (flag == "yes") {
                //주차 가능(주차대수 입력 영역 보임)
                document
                    .getElementById("parkAmount")
                    .setAttribute("style", "display: block;");
            }
            if (flag == "no") {
                // 주차 불가
                document
                    .getElementById("parkAmount")
                    .setAttribute("style", "display: none;");
            }
        },
        controlModal(cmd, modalId) {
            //Modal 띄우고 끄기
            let modal = document.getElementById(modalId);
            if (cmd == "showModalAgree") {
                modal.style.display = "block";
            }
            if (cmd == "hideModalAgree") {
                modal.style.display = "none";
            }
        },
        controlAgree(control) {
            let agrees = document.getElementsByName("checkAgree[]");
            let allAgree = document.getElementById("allCheckAgree");
            if (control == "allCheck") {
                //전체동의 선택시 모두 선택
                for (let i = 0; i < agrees.length; i++) {
                    agrees[i].checked = allAgree.checked;
                }
                this.agreeCount = 3;
            }
            if (control == "partCheck") {
                this.agreeCount = 0;
                for (let i = 0; i < agrees.length; i++) {
                    if (agrees[i].checked == true) {
                        this.agreeCount++;
                    }
                    if (agrees[i].checked == false) {
                        //부분동의를 하나라도 선택 해제시 전체동의 또한 선택 해제
                        allAgree.checked = false;
                        break;
                    }
                }
                if (this.agreeCount == 3) {
                    //부분동의를 모두 선택시 전체동의 또한 선택
                    allAgree.checked = true;
                }
            }
        },
        addStudio() {
            /* 선택된 옵션을 문자열로 변환하여 바인딩 */
            this.option_save = [];
            var optionName = document.getElementsByName("optionName");
            for (let i = 0; i < optionName.length; i++) {
                var optionCheck = document.getElementsByName("optionCheck");
                if (optionCheck[i].checked) {
                    this.option_save.push(optionName[i].innerHTML);
                }
            }
            this.studio.studioFilter.options = this.option_save.join(",");
            alert(this.studio.studioFilter.options);

            /* 입력된 태그들을 하나의 string으로 만들고 tag 데이터에 바인딩 */
            let tags = document.getElementsByName("tag");
            let taglist = "";
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].value == "") continue;
                taglist += tags[i].value + "#";
                this.tagCount++;
            }
            this.tag = taglist;

            /* 태그 1개 이상 입력 */
            if (this.tagCount < 1) {
                alert("태그를 1개 이상 입력하세요.");
                return false;
            }

            /* 주차가능 체크시 주차대수 입력 필수 */
            var parkAble = document.getElementsByName("parkFlag")[1].checked;
            var parking = document.getElementById("parking").value;
            if (parkAble == true) {
                if (parking == "") {
                    alert("주차 가능 대수를 입력하세요.");
                    this.$refs.parking.focus();
                    return false;
                }
                if (parking < 1) {
                    alert("주차는 1대 이상부터 가능합니다.");
                    this.$refs.parking.focus();
                    return false;
                }
            }

            /* 서비스에 모두 동의해야 등록 */
            let agrees = document.getElementsByName("checkAgree[]");
            this.agreeCount = 0;
            for (let i = 0; i < agrees.length; i++) {
                if (agrees[i].checked) this.agreeCount++;
            }
            if (this.agreeCount < 3) {
                alert("서비스에 모두 동의하셔야 등록 가능합니다.");
                return false;
            }

            /* 스튜디오 등록 */
            axios.post("http://127.0.0.1:7777/studio", this.studio).then(
                function(response) {
                    console.log(response.data);
                    alert(`등록되셨습니다.`);
                    location.href = "./test.html";
                },
                function() {
                    console.log("failed");
                }
            );
        }
    }
};