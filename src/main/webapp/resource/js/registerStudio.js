var count = 0;
var option_list = [];
var option_left = [];
var option_right = [];
var app = new Vue({
    el: '#app',
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
                    options: '',
                    parking: '',
                    unitPrice: '',
                    defaultCapacity: '',
                    excharge: '',
                    address: '',
                    maxCapacity: ''
                },
                tag: ''
            },
            timePerDay: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
            ]
        }
    },
    methods: {
        test() {
            alert('테스트');
        },
        checkParkFlag(flag) {
            if (flag == 'yes') { //주차 가능(주차대수 입력 영역 보임)
                document.getElementById('parkAmount').setAttribute('style', 'display: block;');
            }
            if (flag == 'no') { // 주차 불가
                document.getElementById('parkAmount').setAttribute('style', 'display: none;');
            }
        },
        controlOptions(control) {
            var option1 = document.getElementsByName('option1');
            var option2 = document.getElementsByName('option2');
            var emptyIndex = 0;
            if (control == 'add') { //옵션 추가
                for (i = 0; i < option2.length; i++) {
                    emptyIndex = i;
                    var value = option2[i].innerHTML;
                    if (value == '') break; //비어있는 경우
                    for (j = 0; j < option_left.length; i++) {
                        if (option_left[j] == value) { //중복 검사해서 같을 경우 중복 제거
                            option_left = option_left.splice(j, 1);
                        }
                    }
                }
                for (i = emptyIndex; i < option_left.length; i++) {
                    option2[i].innerHTML = option_left[i];
                }
            }
            if (control == 'remove') { //옵션 제거
                alert("제거");
            }
        },
        controlAgree(control) {
            let agrees = document.getElementsByName('checkAgree[]');
            let allAgree = document.getElementById('allCheckAgree');
            if (control == 'allCheck') { //전체동의 선택시 모두 선택
                for (i = 0; i < agrees.length; i++) {
                    agrees[i].checked = allAgree.checked;
                }
                count = 3;
            }
            if (control == 'partCheck') {
                count = 0;
                for (i = 0; i < agrees.length; i++) {
                    if (agrees[i].checked == true) {
                        count++;
                    }
                    if (agrees[i].checked == false) { //부분동의를 하나라도 선택 해제시 전체동의 또한 선택 해제
                        allAgree.checked = false;
                        break;
                    }
                }
                if (count == 3) { //부분동의를 모두 선택시 전체동의 또한 선택
                    allAgree.checked = true;
                }
            }
        },
        addStudio() {
            /* 태그 1개 이상 입력 */
            if (count < 1) {
                alert("태그를 1개 이상 입력하세요.");
                return false;
            }

            /* 입력된 태그들을 하나의 string으로 만들고 tag 데이터에 바인딩 */
            let tags = document.getElementsByName('tag');
            let taglist = '';
            for (i = 0; i < tags.length; i++) {
                if (tags[i].value == '') continue;
                taglist += tags[i].value + '#';
            }
            this.tag = taglist;

            /* 주차가능 입력시 주차대수 필수 */
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
})

//selectable
$(function() {
    /* 운영시간 값 저장 */
    $("ol[name=mon]")
        .selectable()
        .on("selectablestop", function() {
            alert("월요일");
        });
    $("ol[name=tue]")
        .selectable()
        .on("selectablestop", function() {
            alert("화요일");
        });
    $("ol[name=wed]")
        .selectable()
        .on("selectablestop", function() {
            alert("수요일");
        });
    $("ol[name=thu]")
        .selectable()
        .on("selectablestop", function() {
            alert("목요일");
        });
    $("ol[name=fri]")
        .selectable()
        .on("selectablestop", function() {
            alert("금요일");
        });
    $("ol[name=sat]")
        .selectable()
        .on("selectablestop", function() {
            alert("토요일");
        });
    $("ol[name=sun]")
        .selectable()
        .on("selectablestop", function() {
            alert("일요일");
        });

    /* 옵션 선택 후 값 저장*/
    $("#optionSelectable1")
        .selectable()
        .on("selectablestop", function() {
            let temp = []
            $('#optionSelectable1 .ui-selected').each(function() {
                temp.push($(this).html());
            });
            option_left = temp;
        });
    $("#optionSelectable2")
        .selectable()
        .on("selectablestop", function() {
            let temp = []
            $('#optionSelectable2 .ui-selected').each(function() {
                temp.push($(this).data('value'));
            });
            option_right = temp;
        });
});

function controlModal(cmd, modalId) {
    //Modal 띄우고 끄기
    let modal = document.getElementById(modalId);
    if (cmd == 'showModalAgree') {
        modal.style.display = "block";
    }
    if (cmd == 'hideModalAgree') {
        modal.style.display = "none";
    }
}