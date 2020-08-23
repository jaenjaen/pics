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
                }
            }
        }
    },
    methods: {
        checkParkFlag(flag) {
            if (flag == 'yes') { //주차 가능(주차대수 입력 영역 보임)
                document.getElementById('parkAmount').setAttribute('style', 'display: block;');
                if (!this.parking) {
                    alert("주차 가능 대수를 입력하세요.")
                    this.$refs.parking.focus();
                }
            }
            if (flag == 'no') { // 주차 불가
                document.getElementById('parkAmount').setAttribute('style', 'display: none;');
            }
        },
        controlOptions(control) {
            if (control == 'add') { //옵션 추가
                alert("추가");
            }
            if (control == 'remove') { //옵션 제거
                alert("제거");
            }
        },
        controlModal(cmd, modalId) {
            let modal = document.getElementById(modalId);
            if (cmd == 'showModalAgree') {
                modal.style.display = "block";
            }
            if (cmd == 'hideModalAgree') {
                alert('확인');
                modal.style.display = "none";
            }
        },
        controlAgree(control) {
            let agrees = document.getElementsByName('checkAgree[]');
            let allAgree = document.getElementById('allCheckAgree');
            if (control == 'allCheck') { //전체동의 선택시 모두 선택
                for (i = 0; i < agrees.length; i++) {
                    agrees[i].checked = allAgree.checked;
                }
            }
            if (control == 'partCheck') {
                let count = 0;
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
            //스튜디오 등록
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