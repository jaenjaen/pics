<style>
                #app {
            background-color: #ffffff;
            margin: auto;
            width: 768px;
            text-align: center;
            padding: 1% 0 5% 0;
        }
        
        input[type=text],
        input[type=number],
        select,
        option,
        textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
        }
        
        textarea {
            height: 100px;
        }
        
        label {
            padding: 12px 12px 12px 0;
            display: inline-block;
        }
        
        input[type=submit],
        button {
            background-color: #33A3DC;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            float: right;
        }
        
        input:focus,
        textarea:focus {
            border: 2px solid #33A3DC !important;
        }
        
        input[type=submit]:hover,
        button:hover {
            background-color: #034EA2;
        }
        
        .optionBtn {
            padding: 5px 10px;
            margin: 20px 35px;
        }
        
        .container {
            margin: 0 auto;
            border-radius: 5px;
            background-color: white;
            padding: 20px;
        }
        
        .col-25 {
            float: left;
            text-align: "right";
            width: 25%;
            margin-top: 6px;
        }
        
        .col-75 {
            float: left;
            width: 75%;
            margin-top: 6px;
        }
        
        .col-space {
            padding-left: 20px;
        }
        
        .row:after {
            /* 열 다음에 Clear floats */
            content: "";
            display: table;
            clear: both;
        }
        /* 파일 업로드 */
        
        .uploadTotal {
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        
        .uploadArea {
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            position: relative;
            width: 15%;
            height: 0;
            overflow: hidden;
            padding-bottom: 15%;
            margin: 2%;
        }
        
        .uploadImg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .uploadImg:hover {
            opacity: 0.30;
        }
        /* 운영시간 */
        
        #dayList {
            margin-top: 13px;
            margin-bottom: 13px;
        }
        
        #dayList span {
            margin-right: 5px;
        }
        
        #dayNo {
            display: none;
        }
        
        select {
            overflow-y: hidden;
        }
        
        .daySelect {
            display: none;
            margin-top: 20px;
        }
        
        .daySelect select {
            border-width: 0;
            margin: -5px;
            outline: none;
        }
        
        .daySelect option {
            padding: 6px;
            width: 60px;
        }
        /* 체크박스 및 운영 시간표 CSS */
        
        .dayLabel {
            padding: 0;
        }
        
        input[name="day"]+label,
        input[name="dayHide"]+label {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1px solid #8C8C8C;
            cursor: pointer;
            border-radius: 2px;
        }
        
        input[id="mon"]:checked+label {
            background-color: #46E8CC;
        }
        
        select[id="monTime"] option:checked {
            background: #46E8CC linear-gradient(0deg, #46E8CC 0%, #46E8CC 100%);
        }
        
        input[id="tue"]:checked+label {
            background-color: #49E1F2;
        }
        
        select[id="tueTime"] option:checked {
            background: #49E1F2 linear-gradient(0deg, #49E1F2 0%, #49E1F2 100%);
        }
        
        input[id="wed"]:checked+label {
            background-color: #4DA6DB;
        }
        
        select[id="wedTime"] option:checked {
            background: #4DA6DB linear-gradient(0deg, #4DA6DB 0%, #4DA6DB 100%);
        }
        
        input[id="thu"]:checked+label {
            background-color: #4987F2;
        }
        
        select[id="thuTime"] option:checked {
            background: #4987F2 linear-gradient(0deg, #4987F2 0%, #4987F2 100%);
        }
        
        input[id="fri"]:checked+label {
            background-color: #4657E8;
        }
        
        select[id="friTime"] option:checked {
            background: #4657E8 linear-gradient(0deg, #4657E8 0%, #4657E8 100%);
        }
        
        input[id="sat"]:checked+label {
            background-color: #A244F2;
        }
        
        select[id="satTime"] option:checked {
            background: #A244F2 linear-gradient(0deg, #A244F2 0%, #A244F2 100%);
        }
        
        input[id="sun"]:checked+label {
            background-color: #C941E8;
        }
        
        select[id="sunTime"] option:checked {
            background: #C941E8 linear-gradient(0deg, #C941E8 0%, #C941E8 100%);
        }
        
        input[name="dayHide"]:checked+label {
            background-color: #E66B67;
        }
        
        input[name="day"],
        input[name="dayHide"] {
            display: none;
        }
        /* 태그 */
        
        .tag {
            padding-right: 10px;
        }
        
        #hashtag1,
        #hashtag2,
        #hashtag3 {
            color: grey;
            margin-top: -1px;
            padding-left: 10px;
            position: absolute;
            font-size: 16px;
        }
        /* 주소 */
        
        input[name='address1'] {
            float: left;
            width: 80%;
            margin-bottom: 5px;
        }
        
        button#searchAddr,
        button#closeAddr {
            width: 18%;
        }
        
        button#closeAddr,
        #addressAPI,
        input[name='address2'] {
            display: none;
        }
        
        #addressAPI {
            height: 100%;
        }
        /* 층수, 시간당 대여료, 인원 추가시 1인당 대여료, 
        기본 인원, 최대 인원, 주차 가능 대수의 단위를 input 안에 넣음 */
        
        .outContainer {
            text-align: right;
            width: 83%
        }
        
        .inContent {
            color: grey;
            margin-top: -1px;
            padding-left: 5px;
            position: absolute;
            font-size: 16px;
        }
        /* 면적 토글을 input 안에 넣음 */
        
        #sizeLabel {
            margin-top: -13px;
            position: absolute;
            font-size: 16px;
        }
        
        .vue-js-switch {
            margin-left: -25px;
        }
        /* 주차가능 수직정렬 */
        
        div#verticalFit {
            padding-top: 13px;
            margin-bottom: 13px;
        }
        /* 장비 및 옵션 관련 */
        
        .select {
            display: block;
        }
        /* 서비스 동의 */
        
        table#agreeTable {
            border-top: 1px solid #233157;
            border-collapse: collapse;
        }
        
        #agreeTable tr#partAgree {
            background: white;
            height: 60px;
        }
        
        #checkAgree2 {
            border-left: 1px solid #8E97A3;
            border-right: 1px solid #8E97A3;
        }
        
        #agreeTable td#allAgree {
            background: #33A3DC;
            border-top: 1px solid #8E97A3;
            height: 50px;
        }
        
        #agreeTable a:link,
        #agreeTable a:visited {
            color: #353535;
        }
        
        #submitArea {
            padding-top: 10px;
        }
        /* Modal 전체 */
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 80px;
            padding-bottom: 80px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }
        /* Modal 내용 */
        
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 100%;
            height: 100%;
        }
        /* Modal 닫기 버튼 */
        
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        /* 반응형 : 너비 768px 이하 */
        
        @media screen and (max-width: 768px) {
            #app {
                width: 100%;
            }
            .col-25,
            .col-75,
            input[type=submit] {
                width: 100%;
                margin-top: 0;
            }
            .col-space {
                padding-left: 0;
            }
            .tag {
                padding-right: 0px;
            }
        }
</style>
<template>
  <div id="app">
    <div class="row">
          <div class="col-25">
            <label for="">운영 시간</label>
          </div>
          <div class="col-75">
            <div id="dayList">
              <input type="checkbox" name="day" id="mon" @change="selectDay('monTd')" />
              <label class="dayLabel" for="mon"></label>
              <span>월</span>
              <input type="checkbox" name="day" id="tue" @change="selectDay('tueTd')" />
              <label class="dayLabel" for="tue"></label>
              <span>화</span>
              <input type="checkbox" name="day" id="wed" @change="selectDay('wedTd')" />
              <label class="dayLabel" for="wed"></label>
              <span>수</span>
              <input type="checkbox" name="day" id="thu" @change="selectDay('thuTd')" />
              <label class="dayLabel" for="thu"></label>
              <span>목</span>
              <input type="checkbox" name="day" id="fri" @change="selectDay('friTd')" />
              <label class="dayLabel" for="fri"></label>
              <span>금</span>
              <input type="checkbox" name="day" id="sat" @change="selectDay('satTd')" />
              <label class="dayLabel" for="sat"></label>
              <span>토</span>
              <input type="checkbox" name="day" id="sun" @change="selectDay('sunTd')" />
              <label class="dayLabel" for="sun"></label>
              <span>일</span>
              <span id="dayAll">
                <input type="checkbox" name="dayHide" id="all" @change="selectDay('all')" />
                <label class="dayLabel" for="all"></label>
                전체선택
              </span>
              <span id="dayNo">
                <input type="checkbox" name="dayHide" id="no" @change="selectDay('no')" />
                <label class="dayLabel" for="no"></label>
                전체해제
              </span>
             </div>
          </div>
        </div>
        <div class="row">
          <!-- 시간표 -->
          <table class="daySelect" id="monTd">
            <tr>
              <td>
                <span id="allMonTime">
                  <input id="allMonTimeCheck" type="checkbox" @change="selectAllTime('select','monTime','noneMonTime','allMonTime','noneMonTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneMonTime">
                  <input id="noneMonTimeCheck" type="checkbox" @change="selectAllTime('deselect','monTime','allMonTime','noneMonTime','allMonTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="monTime" name="monTime" @change="selectTime('mon')" >
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#46E8CC">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="tueTd">
            <tr>
              <td>
                <span id="allTueTime">
                  <input id="allTueTimeCheck" type="checkbox" @change="selectAllTime('select','tueTime','noneTueTime','allTueTime','noneTueTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneTueTime">
                  <input id="noneTueTimeCheck" type="checkbox" @change="selectAllTime('deselect','tueTime','allTueTime','noneTueTime','allTueTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="tueTime" name="tueTime" @change="selectTime('tue')" >
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#49E1F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="wedTd">
            <tr>
              <td>
                <span id="allWedTime">
                  <input id="allWedTimeCheck" type="checkbox" @change="selectAllTime('select','wedTime','noneWedTime','allWedTime','noneWedTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneWedTime">
                  <input id="noneWedTimeCheck" type="checkbox" @change="selectAllTime('deselect','wedTime','allWedTime','noneWedTime','allWedTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="wedTime" name="wedTime" @change="selectTime('wed')" >
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#4DA6DB">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="thuTd">
            <tr>
              <td>
                <span id="allThuTime">
                  <input id="allThuTimeCheck" type="checkbox" @change="selectAllTime('select','thuTime','noneThuTime','allThuTime','noneThuTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneThuTime">
                  <input id="noneThuTimeCheck" type="checkbox" @change="selectAllTime('deselect','thuTime','allThuTime','noneThuTime','allThuTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="thuTime" name="thuTime">
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#4987F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="friTd">
            <tr>
              <td>
                <span id="allFriTime">
                  <input id="allFriTimeCheck" type="checkbox" @change="selectAllTime('select','friTime','noneFriTime','allFriTime','noneFriTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneFriTime">
                  <input id="noneFriTimeCheck" type="checkbox" @change="selectAllTime('deselect','friTime','allFriTime','noneFriTime','allFriTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="friTime" name="friTime">
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#4657E8">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="satTd">
            <tr>
              <td>
                <span id="allSatTime">
                  <input id="allSatTimeCheck" type="checkbox" @change="selectAllTime('select','satTime','noneSatTime','allSatTime','noneSatTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneSatTime">
                  <input id="noneSatTimeCheck" type="checkbox" @change="selectAllTime('deselect','satTime','allSatTime','noneSatTime','allSatTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="satTime" name="satTime">
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#A244F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="sunTd">
            <tr>
              <td>
                <span id="allSunTime">
                  <input id="allSunTimeCheck" type="checkbox" @change="selectAllTime('select','sunTime','noneSunTime','allSunTime','noneSunTimeCheck')"> 
                  <span style="font-size:11px">전체선택</span>
                </span>
                <span style="display:none" id="noneSunTime">
                  <input id="noneSunTimeCheck" type="checkbox" @change="selectAllTime('deselect','sunTime','allSunTime','noneSunTime','allSunTimeCheck')"> 
                  <span style="font-size:11px">전체해제</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <select multiple size="24" id="sunTime" name="sunTime">
                  <option v-for="(time, index) in timePerDay" :key="index" style="border-color:#C941E8">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>
        </div>
  </div>
</template>
<script>

export default {
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
        /* 요일 체크하면 해당 요일 시간표 뜨게 함 */
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

            /* 전체해제를 체크했을 때 모든 요일을 해제하고 전체체크가 보이게 함 */
            else if (day == "no") {
                /* 모든 요일 체크해제 */
                for (let i = 0; i < allDay.length; i++) {
                    allDay[i].style.display = "none";
                    checkDay[i].checked = false;
                }
                /* 모든 요일의 모든 시간표 선택해제 */
                let dayTime = document.getElementsByName('dayTime');
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 24; j++) {
                        dayTime[i][j].selected = false;
                    }
                }
                dayNo.setAttribute('style', 'display:none');
                dayAll.setAttribute('style', 'display:inline-block');
                document.getElementById('all').checked = false;
                return;
            }

            /* 요일을 체크했을 때 */
            else {
                let whatDay = document.getElementById(day);
                thisCheck = document.getElementById(day.substring(0, 3));
                let checkDayTime = document.getElementById(day.substring(0, 3) + "Time");
                if (thisCheck.checked) { //요일 체크시 보임
                    whatDay.style.display = "inline-block";
                } else { //요일 체크 해제시, 모든 시간 체크해제 하고 숨김
                    for (let i = 0; i < checkDayTime.length; i++) {
                        checkDayTime[i].selected = false;
                    }
                    whatDay.style.display = "none";
                }
            }

            /* 요일을 모두 선택했거나 전체선택 클릭시 전체해제가 보이게 함 */
            if (checkDayCount == 7 || day == 'all') {
                dayAll.setAttribute('style', 'display:none');
                dayNo.setAttribute('style', 'display:inline-block');
                document.getElementById('no').checked = true;
            } else {
                dayNo.setAttribute('style', 'display:none');
                dayAll.setAttribute('style', 'display:inline-block');
                document.getElementById('all').checked = false;
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
        }
    }
};
</script>