import axios from "axios";
import Treeselect from '@riophae/vue-treeselect'; //https://github.com/riophae/vue-treeselect
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: { Treeselect },
    data() {
        return {
            studio: {
                categoryId: '',
                name: '',
                description: '',
                rule: '',
                mainImg: '',
                portImg: '',
                cadImg: '',
                floor: '',
                studioFilter: {
                    size: '',
                    options: null,
                    parking: '',
                    unitPrice: '',
                    defaultCapacity: '',
                    excharge: '',
                    address: '',
                    maxCapacity: ''
                },
                schedule: {
                    repeatDate: [{
                        weekDate: '',
                        time: ''
                    }]
                },
                tag: [{
                    tagName: ''
                }]
            },
            timePerDay: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
            ],
            week: [{
                mon: '',
                tue: '',
                wed: '',
                thu: '',
                fri: '',
                sat: '',
                sun: ''
            }],
            optionList: [{
                id: 'a',
                label: '카메라'
            }, {
                id: 'b',
                label: '조명',
            }, {
                id: 'c',
                label: '반사판',
            }, {
                id: 'd',
                label: '포토그래퍼',
            }],
            selected: [],
            tagCount: 0,
            agreeCount: 0,
        }
    },
    methods: {
        //선택 취소할 수 있게 해야 함...
        selectDay(day) {
            /* 요일 공통 알고리즘 */
            let time_list = '';
            let start = -1; //시작시간
            let front = 0;
            let temp_list = document.getElementById(day);
            for (let i = 0; i < temp_list.length; i++) {
                if (temp_list[i].selected) {
                    start = i; //시작 인덱스 할당
                    front = i; //앞 인덱스 할당
                    time_list = start + '-';
                    break;
                }
            }
            //다시 생각해서 짜기...
            for (let i = 1; i < temp_list.length; i++) {
                if (!temp_list[i].selected) continue; //선택되지 않은 건 제낌
                if (i - front == 1) { //연속적으로 이어지는 시간대일 경우
                    front = i;
                }
                if (i - front > 1) { //이어지지 않은 시간일 경우
                    start = -1;
                    front = i;
                }
            }

            /* 요일별 바인딩 */
            switch (day) {
                case ('mon'):
                    this.week.mon = time_list;
                case ('tue'):
                    this.week.tue = time_list;
                case ('wed'):
                    this.week.wed = time_list;
                case ('thu'):
                    this.week.thu = time_list;
                case ('fri'):
                    this.week.frii = time_list;
                case ('sat'):
                    this.week.sat = time_list;
                case ('sun'):
                    this.week.sun = time_list;
            }
        },
        checkParkFlag(flag) {
            if (flag == 'yes') { //주차 가능(주차대수 입력 영역 보임)
                document.getElementById('parkAmount').setAttribute('style', 'display: block;');
            }
            if (flag == 'no') { // 주차 불가
                document.getElementById('parkAmount').setAttribute('style', 'display: none;');
            }
        },
        controlModal(cmd, modalId) {
            //Modal 띄우고 끄기
            let modal = document.getElementById(modalId);
            if (cmd == 'showModalAgree') {
                modal.style.display = "block";
            }
            if (cmd == 'hideModalAgree') {
                modal.style.display = "none";
            }
        },
        controlAgree(control) {
            let agrees = document.getElementsByName('checkAgree[]');
            let allAgree = document.getElementById('allCheckAgree');
            if (control == 'allCheck') { //전체동의 선택시 모두 선택
                for (let i = 0; i < agrees.length; i++) {
                    agrees[i].checked = allAgree.checked;
                }
                this.agreeCount = 3;
            }
            if (control == 'partCheck') {
                this.agreeCount = 0;
                for (let i = 0; i < agrees.length; i++) {
                    if (agrees[i].checked == true) {
                        this.agreeCount++;
                    }
                    if (agrees[i].checked == false) { //부분동의를 하나라도 선택 해제시 전체동의 또한 선택 해제
                        allAgree.checked = false;
                        break;
                    }
                }
                if (this.agreeCount == 3) { //부분동의를 모두 선택시 전체동의 또한 선택
                    allAgree.checked = true;
                }
            }
        },
        addStudio() {
            /* 입력된 태그들을 하나의 string으로 만들고 tag 데이터에 바인딩 */
            let tags = document.getElementsByName('tag');
            let taglist = '';
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].value == '') continue;
                taglist += tags[i].value + '#';
                this.tagCount++;
            }
            this.tag = taglist;

            /* 태그 1개 이상 입력 */
            if (this.tagCount < 1) {
                alert("태그를 1개 이상 입력하세요.");
                return false;
            }

            /* 선택된 옵션을 문자열로 변환하여 바인딩 */
            this.studio.studioFilter.options = this.selected.join(',');

            /* 주차가능 체크시 주차대수 입력 필수 */
            var parkAble = document.getElementsByName('parkFlag')[1].checked;
            var parking = document.getElementById('parking').value;
            if (parkAble == true) {
                if (parking == '') {
                    alert("주차 가능 대수를 입력하세요.")
                    this.$refs.parking.focus();
                    return false;
                }
                if (parking < 1) {
                    alert("주차는 1대 이상부터 가능합니다.")
                    this.$refs.parking.focus();
                    return false;
                }
            }

            /* 서비스에 모두 동의해야 등록 */
            let agrees = document.getElementsByName('checkAgree[]');
            this.agreeCount = 0;
            for (let i = 0; i < agrees.length; i++) {
                if (agrees[i].checked) this.agreeCount++;
            }
            if (this.agreeCount < 3) {
                alert("서비스에 모두 동의하셔야 등록 가능합니다.");
                return false;
            }

            /* 스튜디오 등록 */
            axios
                .post('http://127.0.0.1:7777/studio', this.studio)
                .then(function(response) {
                    console.log(response.data)
                    alert(`등록되셨습니다.`)
                    location.href = "./test.html"
                }, function() {
                    console.log('failed')
                })
        }
    }
}
// //selectable
// $(function() {
//     /* 운영시간 값 저장 */
//     $("ol[name=mon]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("월요일");
//         });
//     $("ol[name=tue]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("화요일");
//         });
//     $("ol[name=wed]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("수요일");
//         });
//     $("ol[name=thu]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("목요일");
//         });
//     $("ol[name=fri]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("금요일");
//         });
//     $("ol[name=sat]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("토요일");
//         });
//     $("ol[name=sun]")
//         .selectable()
//         .on("selectablestop", function() {
//             alert("일요일");
//         });
// });     });
// });