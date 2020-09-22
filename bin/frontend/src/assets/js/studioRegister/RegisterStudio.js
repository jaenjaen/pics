import axios from "axios";
import vueMultiSelect from "vue-multi-select"; //https://vue-multi-select.tuturu.io/
import "vue-multi-select/dist/lib/vue-multi-select.css";
import {
    VueDaumPostcode
} from "vue-daum-postcode";
import 'vue-material/dist/vue-material.min.css';

export default {
    components: {
        vueMultiSelect,
        VueDaumPostcode
    },
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
                    size: "", //제곱미터일 때의 값만 들어감
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

            /* 이미지 경로 */
            mainRoute: 'http://54.180.25.91:7777/upload/main/',
            cadRoute: 'http://54.180.25.91:7777/upload/cad/',
            portRoute: 'http://54.180.25.91:7777/upload/port/',

            /* 디폴트 이미지 */
            required: 'http://54.180.25.91:7777/upload/default/required.png',
            main: 'http://54.180.25.91:7777/upload/default/main.png',
            cad: 'http://54.180.25.91:7777/upload/default/cad.png',
            port: 'http://54.180.25.91:7777/upload/default/port.png',

            /* 카테고리 */
            category: [],

            /* 주소 */
            address1: "",
            address2: "",
            remainAddr: 44,

            /* 지상/지하 */
            floorUnit: false, //지하여부
            floorNum: '', //층수 절대값

            /* 면적 */
            sizeUnit: false,
            sizeValue: '', //제곱미터 또는 평일 때 면적 값

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
                list: [{
                        name: "카메라"
                    },
                    {
                        name: "조명"
                    },
                    {
                        name: "반사판"
                    },
                    {
                        name: "삼각대"
                    },
                    {
                        name: "철제박스"
                    },
                    {
                        name: "스피커"
                    },
                    {
                        name: "포토그래퍼"
                    }
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
            //console.log("comId : " + this.studio.comId); //뽑아낸 comId
        }
    },
    mounted() {
        /* 라이브러리 충돌로 인해 적용되지 않는 CSS 해결 */
        document.getElementById('multi').childNodes[0].setAttribute('style', 'width:100%; height:45px');
        document.getElementById('multi').childNodes[1].setAttribute('style', 'width:100%;');
        let uploadImg = document.getElementsByClassName('uploadImg');
        for (let i = 0; i < uploadImg.length; i++) { //모든 img 태그에 걸려있는 height:auto; 해결
            uploadImg[i].setAttribute('style', 'height:100%');
        }

        /* DB에서 카테고리 가져오기 */
        axios.get('http://54.180.25.91:7777/category')
            .then((response) => {
                this.category = JSON.parse(JSON.stringify(response.data));
            })
            .catch(() => {
                console.log('카테고리 가져오기 실패');
            })

        /* 임시저장된 내용 불러오기 */
        if (localStorage.getItem("tempStudio") === null) { //로컬스토리지에 tempStudio 키가 없는 경우
            return;
        } else { //로컬스토리지에 tempStudio 키가 존재하는 경우
            var tempStudio = JSON.parse(localStorage["tempStudio"]);

            /* 아래의 값들을 불러와서 바인딩하면 화면에 뿌려짐 */
            this.studio.categoryId = tempStudio["categoryId"]; //카테고리 종류(에 해당되는 번호)
            this.studio.name = tempStudio["name"]; //카테고리 이름
            this.studio.description = tempStudio["description"]; //카테고리 소개
            this.studio.rule = tempStudio["rule"]; //이용 수칙
            this.option_save = JSON.parse(tempStudio["options"]); //장비 및 옵션
            this.studio.studioFilter.unitPrice = tempStudio["unitPrice"]; //시간당 대여료
            this.studio.studioFilter.excharge = tempStudio["excharge"]; //1인 추가시 대여료
            this.studio.studioFilter.defaultCapacity = tempStudio["defaultCapacity"]; //기본 인원
            this.studio.studioFilter.maxCapacity = tempStudio["maxCapacity"]; //최대 인원

            /* 태그 값들을 불러와서 바인딩하고 화면에 뿌림 */
            document.getElementsByName('tag')[0].value = tempStudio["tag0"];
            document.getElementsByName('tag')[1].value = tempStudio["tag1"];
            document.getElementsByName('tag')[2].value = tempStudio["tag2"];

            /* 주차 가능 대수를 바인딩함.
            주차 가능 대수 = 0 일 때, 주차 가능 불가에 체크(기본)
            주차 가능 대수 > 0 일 때, 주차 가능에 체크하고 주차 가능 대수 보이기 */
            let parkingCount = Number(tempStudio["parking"]);
            this.studio.studioFilter.parking = parkingCount;
            if (parkingCount > 0) {
                document.getElementsByName('parkFlag')[1].checked = true;
                document.getElementById('parkAmount').setAttribute('style', 'display:block');
            }

            /* 지상/지하와 제곱미터/평을 확인하고 알게 바인딩하고 표시 */
            this.floorUnit = JSON.parse(tempStudio["floorUnit"]);
            this.sizeUnit = JSON.parse(tempStudio["sizeUnit"]);
            if (this.floorUnit) { //지하
                document.getElementById('underground').checked = true;
            } else { //지상
                document.getElementById('underground').checked = false;
            }
            this.floorNum = tempStudio["floor"];
            if (this.sizeUnit) { //평
                document.getElementById('pyoung').checked = true;
            } else { //평
                document.getElementById('pyoung').checked = false;
            }
            this.sizeValue = tempStudio["size"];

            /* 주소 바인딩 후 화면에 표시
            주소 API를 통해 첫째 주소를 입력했을 경우 상세 주소를 보이게 함  */
            this.address1 = tempStudio["address1"];
            if (this.address1 != '') {
                this.address2 = tempStudio["address2"];
                document.getElementById('address2').setAttribute('style', 'display:block');
            }

            /* 저장된 운영 시간을 각각 바인딩하고 화면에 표시함 */
            this.week.mon = JSON.parse(tempStudio["mon"]);
            this.week.tue = JSON.parse(tempStudio["tue"]);
            this.week.wed = JSON.parse(tempStudio["wed"]);
            this.week.thu = JSON.parse(tempStudio["thu"]);
            this.week.fri = JSON.parse(tempStudio["fri"]);
            this.week.sat = JSON.parse(tempStudio["sat"]);
            this.week.sun = JSON.parse(tempStudio["sun"]);

            let dayCount = [0, 0, 0, 0, 0, 0, 0]; //요일별 체크된 시간 수
            let dayList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; //요일 이름

            for (let i = 0; i < 24; i++) { //요일에 따른 체크, 선택, 보임
                if (this.week.mon[i] > 0) {
                    document.getElementById('monTime')[i].selected = true; //해당되는 시간 select option 선택
                    document.getElementById('monTd').setAttribute('style', 'display:inline-block'); //월요일 시간표 보임
                    document.getElementById('mon').checked = true; //월요일에 체크
                    dayCount[0]++; //월요일이 체크된 시간 수
                }
                if (this.week.tue[i] > 0) {
                    document.getElementById('tueTime')[i].selected = true;
                    document.getElementById('tueTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('tue').checked = true;
                    dayCount[1]++;
                }
                if (this.week.wed[i] > 0) {
                    document.getElementById('wedTime')[i].selected = true;
                    document.getElementById('wedTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('wed').checked = true;
                    dayCount[2]++;
                }
                if (this.week.thu[i] > 0) {
                    document.getElementById('thuTime')[i].selected = true;
                    document.getElementById('thuTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('thu').checked = true;
                    dayCount[3]++;
                }
                if (this.week.fri[i] > 0) {
                    document.getElementById('friTime')[i].selected = true;
                    document.getElementById('friTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('fri').checked = true;
                    dayCount[4]++;
                }
                if (this.week.sat[i] > 0) {
                    document.getElementById('satTime')[i].selected = true;
                    document.getElementById('satTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('sat').checked = true;
                    dayCount[5]++;
                }
                if (this.week.sun[i] > 0) {
                    document.getElementById('sunTime')[i].selected = true;
                    document.getElementById('sunTd').setAttribute('style', 'display:inline-block');
                    document.getElementById('sun').checked = true;
                    dayCount[6]++;
                }
            }

            let allDay = true;
            for (let i = 0; i < 7; i++) {
                if (dayCount[i] == 0) { //해당 요일에 시간이 하나도 선택되지 않았을 경우
                    allDay = false;
                } else { //해당 요일에 시간이 선택되었을 경우
                    this.selectTime(dayList[i]);
                }
            }
            if (allDay == true) { //모든 요일에 선택된 시간이 있을 경우
                this.selectDay('all');
            }

            for (let i = 0; i < 7; i++) { //특정 요일에서 모든 시간을 선택했을 경우
                if (dayCount[i] == 24) {
                    switch (i) {
                        case 0:
                            this.selectAllTime('select', 'monTime', 'noneMonTime', 'allMonTime', 'noneMonTimeCheck');
                            break;
                        case 1:
                            this.selectAllTime('select', 'tueTime', 'noneTueTime', 'allTueTime', 'noneTueTimeCheck');
                            break;
                        case 2:
                            this.selectAllTime('select', 'wedTime', 'noneWedTime', 'allWedTime', 'noneWedTimeCheck');
                            break;
                        case 3:
                            this.selectAllTime('select', 'thuTime', 'noneThuTime', 'allThuTime', 'noneThuTimeCheck');
                            break;
                        case 4:
                            this.selectAllTime('select', 'friTime', 'noneFriTime', 'allFriTime', 'noneFriTimeCheck');
                            break;
                        case 5:
                            this.selectAllTime('select', 'satTime', 'noneSatTime', 'allSatTime', 'noneSatTimeCheck');
                            break;
                        case 6:
                            this.selectAllTime('select', 'sunTime', 'noneSunTime', 'allSunTime', 'noneSunTimeCheck');
                            break;
                    }
                }
            }
        }
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
            if (img === 'main') {
                thisImgId.setAttribute("src", this.main);
            } else if (img === 'cad') {
                thisImgId.setAttribute("src", this.cad);
            } else if (img === 'port') {
                thisImgId.setAttribute("src", this.port);
            }


            /* 파일 업로드 리셋 버튼 숨김 */
            var thisBtnId = document.getElementById(btnId);
            thisBtnId.setAttribute("style", "display: none");
        },

        /* 주소 Modal, 동의 Modal 보이기, 닫기 */
        controlModal(cmd, modalId) {
            let modal = document.getElementById(modalId);
            if (cmd == "showModal") {
                modal.style.display = "block";
                if (modalId == 'modalAddr') {
                    let temp = document.getElementById("addressAPI").childNodes[0]
                    temp.setAttribute('style', 'height: 455px');
                }
            }
            if (cmd == "hideModal") {
                modal.style.display = "none";
            }
        },

        /* 주소를 선택하면 창이 닫히고, 상세주소가 보이게 함 */
        onComplete(data) {
            this.address1 = data.address;
            this.remainAddr = 44 - this.address1.length; //남은 주소 글자수를 바인딩
            document.getElementById('modalAddr').style.display = "none";
            this.address2 = ""; //상세주소 리셋
            document.getElementById("address2").style.display = "block";
        },

        /* 층수 - 지상과 지하로 전환하고, DB에는 지하일 경우 음수로 보냄 */
        changeFloor() {
            let underground = document.getElementById('underground');
            if (underground.checked) { //지하
                this.floorUnit = true;
            } else { //지상
                this.floorUnit = false;
            }
        },

        /* 면적 - 평과 제곱미터를 서로 전환하고, DB에는 제곱미터로 보냄 */
        changeSizeUnit() {
            let pyoung = document.getElementById('pyoung');
            if (pyoung.checked) {
                this.sizeUnit = true;
                this.sizeValue = (this.sizeValue * 0.3025).toFixed(2);
            } else {
                this.sizeUnit = false;
                this.sizeValue = (this.sizeValue * 3.305785).toFixed(2);
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
                for (let i = 0; i < 24; i++) {
                    this.week.mon[i] = 0;
                    this.week.tue[i] = 0;
                    this.week.wed[i] = 0;
                    this.week.thu[i] = 0;
                    this.week.fri[i] = 0;
                    this.week.sat[i] = 0;
                    this.week.sun[i] = 0;
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
                if (thisCheck.checked) {
                    /* 요일 선택시 */
                    whatDay.style.display = "inline-block"; //해당 요일 시간표 보임
                } else {
                    /* 요일 선택해제시 */
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
                    switch (dayName) {
                        case 'mon':
                            for (let i = 0; i < 24; i++) {
                                this.week.mon[i] = 0;
                            }
                            break;
                        case 'tue':
                            for (let i = 0; i < 24; i++) {
                                this.week.tue[i] = 0;
                            }
                            break;
                        case 'wed':
                            for (let i = 0; i < 24; i++) {
                                this.week.wed[i] = 0;
                            }
                            break;
                        case 'thu':
                            for (let i = 0; i < 24; i++) {
                                this.week.thu[i] = 0;
                            }
                            break;
                        case 'fri':
                            for (let i = 0; i < 24; i++) {
                                this.week.fri[i] = 0;
                            }
                            break;
                        case 'sat':
                            for (let i = 0; i < 24; i++) {
                                this.week.sat[i] = 0;
                            }
                            break;
                        case 'sun':
                            for (let i = 0; i < 24; i++) {
                                this.week.sun[i] = 0;
                            }
                            break;
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
                switch (dayName) {
                    case 'mon':
                        for (let i = 0; i < 24; i++) {
                            this.week.mon[i] = 1;
                        }
                        break;
                    case 'tue':
                        for (let i = 0; i < 24; i++) {
                            this.week.tue[i] = 1;
                        }
                        break;
                    case 'wed':
                        for (let i = 0; i < 24; i++) {
                            this.week.wed[i] = 1;
                        }
                        break;
                    case 'thu':
                        for (let i = 0; i < 24; i++) {
                            this.week.thu[i] = 1;
                        }
                        break;
                    case 'fri':
                        for (let i = 0; i < 24; i++) {
                            this.week.fri[i] = 1;
                        }
                        break;
                    case 'sat':
                        for (let i = 0; i < 24; i++) {
                            this.week.sat[i] = 1;
                        }
                        break;
                    case 'sun':
                        for (let i = 0; i < 24; i++) {
                            this.week.sun[i] = 1;
                        }
                        break;
                }
            }
            if (command == 'deselect') { //하루 시간 전체해제
                for (let i = 0; i < thisTime.length; i++) {
                    thisTime[i].selected = false;
                }
                flag.checked = false;

                /* 운영 시간 데이터 초기화 */
                this.studio.schedule.repeatDate = [];
                switch (dayName) {
                    case 'mon':
                        for (let i = 0; i < 24; i++) {
                            this.week.mon[i] = 0;
                        }
                        break;
                    case 'tue':
                        for (let i = 0; i < 24; i++) {
                            this.week.tue[i] = 0;
                        }
                        break;
                    case 'wed':
                        for (let i = 0; i < 24; i++) {
                            this.week.wed[i] = 0;
                        }
                        break;
                    case 'thu':
                        for (let i = 0; i < 24; i++) {
                            this.week.thu[i] = 0;
                        }
                        break;
                    case 'fri':
                        for (let i = 0; i < 24; i++) {
                            this.week.fri[i] = 0;
                        }
                        break;
                    case 'sat':
                        for (let i = 0; i < 24; i++) {
                            this.week.sat[i] = 0;
                        }
                        break;
                    case 'sun':
                        for (let i = 0; i < 24; i++) {
                            this.week.sun[i] = 0;
                        }
                        break;
                }
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
            let tempResult = '';

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

            tempResult = temp.slice(0, temp.length - 1);

            this.studio.schedule.repeatDate.push({
                weekDate: thisDay,
                time: tempResult
            }); //가장 끝에 있는 ,를 제거해서 운영 시간 데이터에 바인딩함

            if (tempResult == '0-24') {
                switch (thisDay) {
                    case 'mon':
                        this.selectAllTime('select', 'monTime', 'noneMonTime', 'allMonTime', 'noneMonTimeCheck');
                        break;
                    case 'tue':
                        this.selectAllTime('select', 'tueTime', 'noneTueTime', 'allTueTime', 'noneTueTimeCheck');
                        break;
                    case 'wed':
                        this.selectAllTime('select', 'wedTime', 'noneWedTime', 'allWedTime', 'noneWedTimeCheck');
                        break;
                    case 'thu':
                        this.selectAllTime('select', 'thuTime', 'noneThuTime', 'allThuTime', 'noneThuTimeCheck');
                        break;
                    case 'fri':
                        this.selectAllTime('select', 'friTime', 'noneFriTime', 'allFriTime', 'noneFriTimeCheck');
                        break;
                    case 'sat':
                        this.selectAllTime('select', 'satTime', 'noneSatTime', 'allSatTime', 'noneSatTimeCheck');
                        break;
                    case 'sun':
                        this.selectAllTime('select', 'sunTime', 'noneSunTime', 'allSunTime', 'noneSunTimeCheck');
                        break;
                }
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
                this.studio.studioFilter.parking = 0;
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

        /* 새로쓰기 */
        resetContent() {
            let result = confirm('작성하신 내용을 초기화합니다. 진행하시겠습니까?');
            if (result) {
                /* 로컬스토리지에 저장된 값들을 비움 */
                localStorage.removeItem("tempStudio");
                alert('스튜디오 등록을 새로 작성해주세요.');
                location.reload(); //새로고침
            } else {
                return;
            }
        },

        /* 임시저장 */
        tempSave() {
            alert("작성하신 내용이 임시저장 되었습니다.");
            let tempStudio = {
                "categoryId": this.studio.categoryId,
                "name": this.studio.name,
                "description": this.studio.description,
                "rule": this.studio.rule,
                "floor": this.floorNum,
                "floorUnit": this.floorUnit,
                "size": document.getElementById('size').value,
                "sizeUnit": this.sizeUnit,
                "options": JSON.stringify(this.option_save),
                "unitPrice": this.studio.studioFilter.unitPrice,
                "excharge": this.studio.studioFilter.excharge,
                "defaultCapacity": this.studio.studioFilter.defaultCapacity,
                "maxCapacity": this.studio.studioFilter.maxCapacity,
                "parking": this.studio.studioFilter.parking,
                "address1": this.address1,
                "address2": this.address2,
                "mon": JSON.stringify(this.week.mon),
                "tue": JSON.stringify(this.week.tue),
                "wed": JSON.stringify(this.week.wed),
                "thu": JSON.stringify(this.week.thu),
                "fri": JSON.stringify(this.week.fri),
                "sat": JSON.stringify(this.week.sat),
                "sun": JSON.stringify(this.week.sun),
                "tag0": document.getElementsByName('tag')[0].value,
                "tag1": document.getElementsByName('tag')[1].value,
                "tag2": document.getElementsByName('tag')[2].value
            };
            localStorage["tempStudio"] = JSON.stringify(tempStudio);
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
                this.studio.tag.push({
                    tagName: tags[i].value
                });
                this.tagCount++;
            }

            /* 태그 1개 이상 입력 */
            if (this.tagCount < 1) {
                alert("태그를 1개 이상 입력하세요.");
                return false;
            }

            /* 주소 입력을 확인하고, 입력한 주소들을 연결하여 바인딩 */
            if (this.address1 == '') {
                alert("주소를 선택하세요");
                return false;
            } else if (this.address2 == '') {
                alert("상세주소를 입력하세요");
                return false;
            } else {
                this.studio.studioFilter.address = this.address1 + " " + this.address2;
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
                this.studio.floor = this.floorNum;
            } else if (this.floorUnit == true) { //지하
                this.studio.floor = this.floorNum * (-1);
            }

            /* 면적 단위 토글 버튼 상태에 맞춰 데이터 바인딩 */
            if (!this.sizeUnit) { //제곱미터
                this.studio.studioFilter.size = size;
            } else { //평
                this.studio.studioFilter.size = (size * 3.305785).toFixed(2);
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
            axios.post('http://54.180.25.91:7777/filesUpload/main/' + this.studio.comId, formData, {
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
            axios.post('http://54.180.25.91:7777/fileUpload/cad/' + this.studio.comId, formData, {
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
            axios.post('http://54.180.25.91:7777/filesUpload/port/' + this.studio.comId, formData, {
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
            axios.post("http://54.180.25.91:7777/studio", this.studio)
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