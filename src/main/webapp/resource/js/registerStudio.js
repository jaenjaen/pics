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
            }
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
            let options = document.getElementsByName('options')
            let temp = [];
            if (control == 'add') { //옵션 추가
                for (i = 0; i < options.length; i++) {
                    temp.push(options[i].innerHTML);
                }
                optionlist = optionlist.concat(temp);
                alert(optionlist[0]);
                alert("추가");
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
    $("#selectable1")
        .selectable()
        .on("selectablestop", function() {
            var temp = []
            $('#selectable1 .ui-selected').each(function() {
                temp.push($(this).html());
            });
            option_left = temp;
            console.log(option_left);
        });
    $("#selectable2")
        .selectable()
        .on("selectablestop", function() {
            var temp = []
            $('#selectable1 .ui-selected').each(function() {
                temp.push($(this).html());
            });
            option_right = temp;
            console.log(option_right);
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