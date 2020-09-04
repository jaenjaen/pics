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
                comId: "",
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
                    repeatDate: []
                },
                tag: []
            },

            /* 디폴트 이미지 */
            required: require('@/assets/img/upload/required.png'),
            preview: require('@/assets/img/upload/preview.png'),
            port: require('@/assets/img/upload/port.png'),

            /* 카테고리 */
            category: [],

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

            /* 지상/지하 */
            floorUnit: true,

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
                    { name: "삼각대" },
                    { name: "철제박스" },
                    { name: "스피커" },
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
    created() {
        /* 기업고객일 경우에만 스튜디오 등록 화면 볼 수 있고, 
               아닌 경우에는 기업고객 로그인 페이지로 이동 */
        var company = JSON.parse(sessionStorage.getItem("company"));
        if (company === null) {
            alert("기업고객으로 로그인하세요.");
            location.href = "/companyLogin"
        } else {
            this.studio.comId = company.comId;
            console.log("comId : " + this.studio.comId); //뽑아낸 comId
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:7777/category')
            .then((response) => {
                this.category = JSON.parse(JSON.stringify(response.data));
            })
            .catch(() => {
                console.log('카테고리 가져오기 실패');
            })
    },
    methods: {
        /* 스튜디오 소개, 이용 수칙 글자수 체크 및 입력 제한 */
        checkLength() {
            var changeArea = document.getElementsByName('changeArea');
            var countLength = document.getElementsByName('countLength');
            for (let i = 0; i < countLength.length; i++) {
                let value = countLength[i].value;
                let length = countLength[i].value.length;
                if (i == 0) { //스튜디오 소개
                    if (length > 500) {
                        document.getElementsByName('countLength')[i].value = value.substring(0, 500);
                        return false;
                    } else {
                        changeArea[i].innerHTML = length;
                    }
                } else if (i == 1) { //이용 수칙
                    if (length > 400) {
                        document.getElementsByName('countLength')[i].value = value.substring(0, 400);
                        return false;
                    } else {
                        changeArea[i].innerHTML = length;
                    }
                }
            }
        },

        /* 파일 업로드 화면단 처리 */
        handleImgFileSelect(fileId, imgId, btnId, e) {
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

                        /* 파일 업로드 리셋 버튼 보이기 */
                        var uploadBtn = document.getElementById(btnId);
                        uploadBtn.setAttribute("style", "display: inline-block");

                    }) //forEach
            } //if
        },

        /* 업로드 이미지 삭제 */
        resetUploadImg(fileId, imgId, btnId, img) {
            alert("업로드한 이미지를 삭제합니다.");

            /* 파일 업로드된 파일을 삭제해서 리셋시킴 */
            document.getElementById(fileId).value = '';

            /* 파일 업로드 디폴트 이미지로 바꿈 */
            var thisImgId = document.getElementById(imgId);
            if (img === 'preview') {
                thisImgId.setAttribute("src", require('@/assets/img/upload/preview.png'));
            } else if (img === 'port') {
                thisImgId.setAttribute("src", require('@/assets/img/upload/port.png'));
            }


            /* 파일 업로드 리셋 버튼 숨김 */
            var thisBtnId = document.getElementById(btnId);
            thisBtnId.setAttribute("style", "display: none");
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
        /* 층수 - 지상과 지하로 전환하고, DB에는 지하일 경우 음수로 보냄 */
        changeFloor() {
            if (this.floorUnit == true) { //지상
                this.floorUnit = false;
            } else if (this.floorUnit == false) { //지하
                this.floorUnit = true;
            }
        },

        /* 면적 - 평과 제곱미터를 서로 전환하고, DB에는 제곱미터로 보냄 */
        changeSizeUnit() {
            let size = document.getElementById('size').value;
            if (this.sizeUnit == true) { //평->제곱미터
                this.sizeUnit = false;
                if (size != "") {
                    this.sizeInput = (size * 3.305785).toFixed(2);
                }
            } else if (this.sizeUnit == false) { //제곱미터->평
                this.sizeUnit = true;
                if (size != "") {
                    this.sizeInput = (size * 0.3025).toFixed(2);
                }
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
                this.studio.schedule.repeatDate = [];

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
                    let arr = this.studio.schedule.repeatDate;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].weekDate == dayName) {
                            this.studio.schedule.repeatDate.splice(i, 1);
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
            var dayName = dayTime.substring(0, 3);
            if (command == 'select') { //하루 시간 전체선택
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = true;
                }
                flag.checked = true;

                /* 운영 시간 데이터 바인딩 */
                this.studio.schedule.repeatDate.push({
                    weekDate: dayName,
                    time: "0-24"
                });
            }
            if (command == 'deselect') { //하루 시간 전체해제
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = false;
                }
                flag.checked = false;

                /* 운영 시간 데이터 초기화 */
                this.studio.schedule.repeatDate = [];
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

            /* 운영시간 데이터 초기화 */
            let arr = this.studio.schedule.repeatDate;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].weekDate == thisDay) {
                    this.studio.schedule.repeatDate.splice(i, 1);
                }
            }

            switch (thisDay) {
                case 'mon': //월요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.mon[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'tue': //화요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.tue[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'wed': //수요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.wed[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'thu': //목요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.thu[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'fri': //금요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.fri[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'sat': //토요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.sat[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;

                case 'sun': //일요일
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
                        temp += start + "-" + end + ",";
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
                                    temp += start + "-" + end + ",";
                                }
                            }
                            if (first != -1 && this.week.sun[i] == 0) {
                                first = -1; //여기서 링크를 끊음.
                                temp += start + "-" + end + ",";
                            }
                        }
                    }
                    break;
            }

            this.studio.schedule.repeatDate.push({
                weekDate: thisDay,
                time: temp.slice(0, temp.length - 1)
            }); //가장 끝에 있는 ,를 제거해서 운영 시간 데이터에 바인딩함

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

        /* 임시저장 */
        tempSave() {
            alert("임시저장~");
        },

        /* 스튜디오 등록 전 로그인 체크 */
        checkLogin() {
            if (this.studio.company == '') {
                alert("기업고객으로 로그인하세요.");
                //location.href = "/companyLogin";
            }
            this.checkStudio();
        },

        /* 스튜디오 등록 전 유효성 검사, 예외 처리, 데이터 바인딩 */
        checkStudio() {
            /* 입력된 태그들을 하나의 string으로 만들고 tag 데이터에 바인딩 */
            this.studio.tag = [] //태그 데이터 초기화
            let tags = document.getElementsByName("tag");
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].value == "") continue;
                this.studio.tag.push({ tagName: tags[i].value });
                this.tagCount++;
            }

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

            /* 숫자 유효성 검사 */
            let floor = document.getElementById('floor').value;
            let size = document.getElementById('size').value;
            let unitPrice = document.getElementById('unitPrice').value;
            let excharge = document.getElementById('excharge').value;
            let defaultCapacity = document.getElementById('defaultCapacity').value;
            let maxCapacity = document.getElementById('maxCapacity').value;
            let parking = document.getElementById('parking').value;
            let isNumeric = [{
                check: floor,
                message: "층수를 1 이상의 정수로 입력하세요."
            }, {
                check: size,
                message: "면적을 1 이상의 숫자로 입력하세요."
            }, {
                check: unitPrice,
                message: "시간당 대여료를 1 이상의 정수로 입력하세요."
            }, {
                check: excharge,
                message: "1인 추가시 대여료를 1 이상의 정수로 입력하세요."
            }, {
                check: defaultCapacity,
                message: "기본 인원을 1 이상의 정수로 입력하세요"
            }, {
                check: maxCapacity,
                message: "최대 인원을 1 이상의 정수로 입력하세요",
            }, {
                check: parking,
                message: "주차 대수를 0 이상의 정수로 입력하세요"
            }];

            for (let i = 0; i < isNumeric.length; i++) {
                let temp = Number(isNumeric[i].check);
                if (i == 1) { //면적
                    if (isNaN(temp) || temp < 1) {
                        alert(isNumeric[i].message);
                        return false;
                    }
                } else if (i == isNumeric.length - 1) { //주차대수
                    if (Number.isInteger(temp) && temp >= 0) {
                        continue;
                    } else {
                        alert(isNumeric[i].message);
                        return false;
                    }
                } else { //층수, 시간당 대여료, 1인 추가시 대여료, 기본 인원, 최대 인원
                    if (isNumeric[i].check == '') {
                        continue;
                    }
                    if (Number.isInteger(temp) && temp >= 1) {
                        continue;
                    } else {
                        alert(isNumeric[i].message);
                        return false;
                    }
                }
            }

            /* 지상/지하 토글 버튼에 맞춰 데이터 바인딩 */
            if (this.floorUnit == false) { //지상
                this.studio.floor = floor;
                this.floorUnit = true;
            } else if (this.floorUnit == true) { //지하
                this.studio.floor = floor * (-1);
                this.floorUnit = false;
            }

            /* 면적 단위 토글 버튼 상태에 맞춰 데이터 바인딩 */
            if (this.sizeUnit == false) { //제곱미터
                this.studio.studioFilter.size = size;
                this.sizeUnit = true;
            } else if (this.sizeUnit == true) { //평
                this.studio.studioFilter.size = (size * 3.305785).toFixed(2);
                this.sizeUnit = false;
            }

            /* 운영 시간 입력 필수 */
            if (this.studio.schedule.repeatDate.length < 1) {
                alert("운영 시간을 입력하세요");
                return false;
            }

            /* 주차가능 체크시 주차대수 입력 필수 */
            var parkAble = document.getElementsByName("parkFlag")[1].checked;
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
            this.studio.studioFilter.options = this.option_save.join(","); //배열을 string으로 만듦(,로 구분)

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

            this.uploadMainImg();
        },

        /* 대표사진 멀티 이미지 업로드 */
        uploadMainImg() {
            let formData = new FormData();
            let files = document.getElementsByName('mainFiles');
            let count = 0;
            for (let i = 0; i < files.length; i++) {
                if (typeof(files[i].files[0]) == "undefined") {
                    count++;
                    continue;
                }
                formData.append("files", files[i].files[0]);
                console.log("파일 정보 : " + files[i].files[0]);
            }
            if (count == 10) {
                alert("대표 사진을 1장 이상 입력하세요.");
                return false;
            }
            axios.post('http://127.0.0.1:7777/filesUpload/main/' + this.studio.comId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    console.log('대표사진 파일 업로드 응답 성공');
                    console.log('파일명 : ' + response.data);
                    this.studio.mainImg = response.data; //대표사진 파일명 데이터 바인딩
                })
                .catch(() => {
                    console.log('대표사진 파일 업로드 응답 실패');
                })
                .finally(() => {
                    this.uploadCadImg();
                });
        },

        /* 공간도면 단일 이미지 업로드 */
        uploadCadImg() {
            let formData = new FormData();
            let file = document.querySelector('#cadFile');
            formData.append("file", file.files[0]);
            console.log("파일 정보 : " + file.files[0]);
            axios.post('http://127.0.0.1:7777/fileUpload/cad/' + this.studio.comId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    console.log('공간도면 파일 업로드 응답 성공');
                    console.log('파일명 : ' + response.data);
                    this.studio.cadImg = response.data; //공간도면 파일명 데이터 바인딩
                })
                .catch(() => {
                    console.log('공간도면 파일 업로드 응답 실패');
                })
                .finally(() => {
                    this.uploadPortImg();
                });
        },

        /* 포트폴리오 멀티 이미지 업로드 */
        uploadPortImg() {
            let formData = new FormData();
            let files = document.getElementsByName('portFiles');
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i].files[0]);
                console.log("파일 정보 : " + files[i].files[0]);
            }
            axios.post('http://127.0.0.1:7777/filesUpload/port/' + this.studio.comId, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    console.log('포트폴리오 파일 업로드 응답 성공');
                    console.log('파일명 : ' + response.data);
                    this.studio.portImg = response.data; //포트폴리오 파일명 데이터 바인딩
                })
                .catch(() => {
                    console.log('포트폴리오 파일 업로드 응답 실패');
                })
                .finally(() => {
                    this.addStudio();
                });
        },

        /* 스튜디오 등록 */
        addStudio() {
            axios.post("http://127.0.0.1:7777/studio", this.studio)
                .then(
                    function(response) {
                        console.log("스튜디오 등록 응답 성공");
                        console.log(response.data);
                        if (response.data == '1') {
                            alert(`스튜디오가 성공적으로 등록되었습니다.`);
                            //location.href = "/mypage";
                        } else if (response.data == '-1') {
                            alert("이미 등록된 스튜디오입니다.");
                            return false;
                        }
                    },
                    function() {
                        console.log("스튜디오 등록 응답 실패");
                    }
                );
        }
    }
}