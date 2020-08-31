import axios from "axios";
import Vue from "vue";
import vueMultiSelect from "vue-multi-select"; //https://vue-multi-select.tuturu.io/
import "vue-multi-select/dist/lib/vue-multi-select.css";
import { ToggleButton } from 'vue-js-toggle-button' //https://www.npmjs.com/package/vue-js-toggle-button
import { VueDaumPostcode } from "vue-daum-postcode";

Vue.component('ToggleButton', ToggleButton)

export default {
    components: { vueMultiSelect, VueDaumPostcode },
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
                        weekDate: "월",
                        time: ""
                    }, {
                        weekDate: "화",
                        time: ""
                    }, {
                        weekDate: "수",
                        time: ""
                    }, {
                        weekDate: "목",
                        time: ""
                    }, {
                        weekDate: "금",
                        time: ""
                    }, {
                        weekDate: "토",
                        time: ""
                    }, {
                        weekDate: "일",
                        time: ""
                    }]
                },
                tag: [{
                    tagName: ""
                }]
            },
            /* 주소 API */
            addressResult: {
                postcode: "",
                postcode1: "",
                postcode2: "",
                postcodeSeq: "",
                zonecode: "",
                address: "",
                addressEnglish: "",
                addressType: "",
                bcode: "",
                bname: "",
                bname1: "",
                bname2: "",
                sido: "",
                sigungu: "",
                sigunguCode: "",
                userLanguageType: "",
                query: "",
                buildingName: "",
                buildingCode: "",
                apartment: "",
                jibunAddress: "",
                jibunAddressEnglish: "",
                roadAddress: "",
                roadAddressEnglish: "",
                autoRoadAddress: "",
                autoRoadAddressEnglish: "",
                autoJibunAddress: "",
                autoJibunAddressEnglish: "",
                userSelectedType: "",
                noSelected: "",
                hname: "",
                roadnameCode: "",
                roadname: ""
            },
            addressDetail: "",
            /* 면적 */
            sizeInput: "",
            sizeUnit: true,
            /* 운영시간 */
            week: {
                mon: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                tue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                wed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                thu: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                fri: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                sat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                sun: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            /* 장비 및 옵션 */
            btnLabel: option_save => `${option_save.length}개 선택`,
            option_save: [],
            option_list: [{
                name: "선택",
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
        /* 파일 업로드 화면단 처리 */
        handleImgFileSelect(fileId, imgId, e) {
            var thisFileId = document.getElementById(fileId);
            var thisImgId = document.getElementById(imgId);
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);

            if (thisFileId.value != "") {
                filesArr.forEach(function(f) {
                        /* 확장자 제한 */
                        if (!f.type.match("image.*")) {
                            alert("확장자는 이미지 확장자만 가능합니다.");
                            thisFileId.value = "";
                            return false;
                        }

                        /* 용량 제한 */
                        var fileSize = thisFileId.files[0].size;
                        var maxSize = 5 * 1024 * 1000;
                        if (fileSize > maxSize) {
                            alert("파일용량 5MB을 초과했습니다.");
                            thisFileId.value = "";
                            return false;
                        }

                        /* 업로드 이미지 미리보기 */
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            thisImgId.setAttribute("src", e.target.result);
                        }
                        reader.readAsDataURL(f);
                    }) //forEach
            } //if
        },

        /* 주소 API를 통해 주소 찾기, 닫기 */
        controlAddress(cmd) {
            let api = document.getElementById("addressAPI");
            let address2 = document.getElementById("address2");
            let searchAddr = document.getElementById("searchAddr");
            let closeAddr = document.getElementById("closeAddr");
            if (cmd == "showAddress") {
                api.style.display = "block";
                address2.style.display = "none";
                address2.value = "";
                closeAddr.style.display = "block";
                searchAddr.style.display = "none";
            }
            if (cmd == "hideAddress") {
                if (this.addressResult.address == '') {
                    alert("주소를 선택하세요");
                    return false;
                }
                api.style.display = "none";
                address2.style.display = "block";
                address2.focus();
                searchAddr.style.display = "block";
                closeAddr.style.display = "none";
            }
        },

        /* 평과 제곱미터를 서로 전환하고, DB에는 제곱미터로 보냄 */
        changeSizeUnit(value) {
            if (value == true) { //평->제곱미터
                this.sizeUnit = false;
                if (this.sizeInput == "") {
                    return false;
                }
                this.sizeInput = (this.sizeInput * 3.305785).toFixed(2);
                this.studio.studioFilter.size = this.sizeInput; //DB에 보낼 제곱미터
            }
            if (value == false) { //제곱미터->평
                this.sizeUnit = true;
                if (this.sizeInput == "") {
                    return false;
                }
                this.studio.studioFilter.size = this.sizeInput; //DB에 보낼 제곱미터
                this.sizeInput = (this.sizeInput * 0.3025).toFixed(2);
            }
        },

        /* 요일을 클릭하면 해당 요일의 시간표가 화면에 뜨게 함 */
        selectDay(day) {
            let thisCheck = document.getElementById(day); //선택한 요일 checkbox 객체
            let checkDay = document.getElementsByName("day"); //전체 요일 checkbox 객체
            let checkDayCount = 0; //체크된 요일 개수
            let allDay = document.getElementsByClassName("daySelect"); //요일별 시간리스트들

            /* 선택한 요일의 개수 세고, 모든 요일을 체크했으면 전체선택에 체크 표시 */
            for (let i = 0; i < checkDay.length; i++) {
                if (checkDay[i].checked) checkDayCount++;
            }

            let dayAll = document.getElementById("dayAll"); //전체선택 영역
            let dayNo = document.getElementById("dayNo"); //전체해제 영역

            /* 전체선택을 체크했을 때 모든 요일을 체크하고 체크한 요일 개수 7 할당 */
            if (day == "all") {
                for (let i = 0; i < allDay.length; i++) {
                    allDay[i].style.display = "inline-block";
                    checkDay[i].checked = true;
                }
            }

            /* 전체해제를 선택했을 때 모든 요일을 해제하고 전체체크가 보이게 함 */
            else if (day == "no") {
                //전체해제 선택시 모든 요일 선택해제
                for (let i = 0; i < allDay.length; i++) {
                    allDay[i].style.display = "none";
                    checkDay[i].checked = false;
                }

                //모든 요일의 해당 시간표 전체 체크해제
                let dayTime = document.getElementsByName("dayTime");
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 24; j++) {
                        dayTime[i][j].selected = false;
                    }
                }

                //모든 요일의 데이터 바인딩 초기화
                for (let i = 0; i < 7; i++) {
                    this.studio.schedule.repeatDate[i].time = '';
                }

                dayNo.setAttribute('style', 'display:none');
                dayAll.setAttribute('style', 'display:inline-block');
                document.getElementById('all').checked = false;
                return;
            }

            /* 요일을 체크했을 때 */
            else {
                let whatDay = document.getElementById(day);
                let dayName = day.substring(0, 3);
                thisCheck = document.getElementById(dayName);
                if (thisCheck.checked) { /* 요일 선택시 */
                    whatDay.style.display = "inline-block"; //해당 요일 시간표 보임
                } else { /* 요일 선택해제시 */
                    //해당 요일 시간표 전체 체크 해제 및 숨김
                    let dayTime = document.getElementById(dayName + 'Time');
                    for (let i = 0; i < dayTime.length; i++) {
                        dayTime[i].selected = false;
                    }
                    whatDay.style.display = "none";

                    //해당 요일 데이터 바인딩 초기화
                    let dayArr = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                    for (let i = 0; i < 7; i++) {
                        if (dayName == dayArr[i]) {
                            this.studio.schedule.repeatDate[i].time = '';
                        }
                    }
                }
                dayNo.setAttribute('style', 'display:none');
                dayAll.setAttribute('style', 'display:inline-block');
                document.getElementById('all').checked = false;
            }

            /* 요일을 모두 선택했거나 전체선택 클릭시 전체해제가 보이게 함 */
            if (checkDayCount == 7 || day == 'all') {
                dayAll.setAttribute('style', 'display:none');
                dayNo.setAttribute('style', 'display:inline-block');
                document.getElementById('no').checked = true;
            }
        },

        /* 특정 요일의 하루 시간 전체 체크, 체크 해제 */
        selectAllTime(command, dayTime, visibleArea, unvisibleArea, checkFlag) {
            var thisTime = document.getElementById(dayTime);
            var thisVisible = document.getElementById(visibleArea);
            var thisUnvisible = document.getElementById(unvisibleArea);
            var flag = document.getElementById(checkFlag);
            if (command == 'select') { //하루 시간 전체선택
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = true;
                }
                flag.checked = true;
            }
            if (command == 'deselect') { //하루 시간 전체해제
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = false;
                }
                flag.checked = false;
            }
            thisVisible.setAttribute('style', 'display:block');
            thisUnvisible.setAttribute('style', 'display:none');
        },

        /* 선택한 시간 정리 */
        selectTime(day) {
            let thisDay = day.substring(0, 3);
            let thisDayTime = document.getElementById(day);

            let first = -1;
            let start = -1;
            let end = -1;

            let temp = '';

            switch (thisDay) {
                case 'mon': //월요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[0].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.mon[i] = 1;
                        } else {
                            this.week.mon[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.mon[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[0].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.mon[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.mon[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[0].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.mon[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[0].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[0].time;
                    this.studio.schedule.repeatDate[0].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'tue': //화요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[1].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.tue[i] = 1;
                        } else {
                            this.week.tue[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.tue[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[1].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.tue[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.tue[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[1].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.tue[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[1].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[1].time;
                    this.studio.schedule.repeatDate[1].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'wed': //수요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[2].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.wed[i] = 1;
                        } else {
                            this.week.wed[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.wed[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[2].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.wed[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.wed[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[2].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.wed[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[2].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[2].time;
                    this.studio.schedule.repeatDate[2].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'thu': //목요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[3].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.thu[i] = 1;
                        } else {
                            this.week.thu[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.thu[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[3].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.thu[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.thu[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[3].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.thu[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[3].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[3].time;
                    this.studio.schedule.repeatDate[3].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'fri': //금요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[4].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.fri[i] = 1;
                        } else {
                            this.week.fri[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.fri[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[4].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.fri[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.fri[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[4].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.fri[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[4].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[4].time;
                    this.studio.schedule.repeatDate[4].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'sat': //토요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[5].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.sat[i] = 1;
                        } else {
                            this.week.sat[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.sat[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[5].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.sat[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.sat[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[5].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.sat[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[5].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[5].time;
                    this.studio.schedule.repeatDate[5].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;

                case 'sun': //일요일
                    /* 운영시간 데이터 초기화 */
                    this.studio.schedule.repeatDate[6].time = '';

                    /* 해당 요일의 선택한 시간을 배열에 바인딩 */
                    for (let i = 0; i < thisDayTime.length; i++) {
                        if (thisDayTime[i].selected) {
                            this.week.sun[i] = 1;
                        } else {
                            this.week.sun[i] = 0;
                        }
                    }

                    /* 배열에서 처음으로 선택한 인덱스를 저장함 */
                    for (let i = 0; i < 24; i++) {
                        if (this.week.sun[i] == 1) {
                            first = i;
                            start = i;
                            end = i + 1;
                            break;
                        }
                    }

                    /* 운영시간을 처리하여 data에 바인딩 */
                    if (first == 23) {
                        this.studio.schedule.repeatDate[6].time += start + "-" + end + ",";
                    } else if (first > -1) {
                        for (let i = first + 1; i < 24; i++) {
                            if (first == -1 && this.week.sun[i] == 1) {
                                //새로 시작하는 인덱스인데 선택했을 경우
                                first = i;
                                start = i;
                                end = i + 1;
                            }
                            if (first != -1 && this.week.sun[i] == 1) {
                                //이어지는 인덱스인데 선택했을 경우
                                end = i + 1;
                                if (i == 23) { //마지막 인덱스일 경우
                                    this.studio.schedule.repeatDate[6].time += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.sun[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                this.studio.schedule.repeatDate[6].time += start + "-" + end + ",";
                            }
                        }
                    }
                    temp = this.studio.schedule.repeatDate[6].time;
                    this.studio.schedule.repeatDate[6].time = temp.slice(0, temp.length - 1); //가장 끝에 있는 ,를 제거함.
                    break;
            }
        },

        /* 주차 가능, 주차 불가 체크에 따른 화면 표기 */
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

        /* 동의 Modal 보이기, 닫기 */
        controlModal(cmd, modalId) {
            let modal = document.getElementById(modalId);
            if (cmd == "showModalAgree") {
                modal.style.display = "block";
            }
            if (cmd == "hideModalAgree") {
                modal.style.display = "none";
            }
        },

        /* 부분동의 체크, 전체동의 체크 처리 */
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

        /* 스튜디오 등록 */
        addStudio() {
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

            /* 주소 입력을 확인하고, 입력한 주소들을 연결하여 바인딩 */
            if (this.addressResult.address == '') {
                alert("주소를 선택하세요");
                return false;
            } else if (this.addressDetail == '') {
                alert("상세주소를 입력하세요");
                return false;
            } else {
                this.studio.studioFilter.address = this.addressResult.address + " " + this.addressDetail;
            }

            /* 운영 시간 입력 필수 */
            let dayTimeFlag = 0;
            for (let i = 0; i < 7; i++) {
                if (this.studio.schedule.repeatDate[i].time == '') {
                    dayTimeFlag++;
                }
            }
            if (dayTimeFlag == 7) {
                alert("운영 시간을 입력하세요");
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
}