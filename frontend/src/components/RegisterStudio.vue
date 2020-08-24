<template>
<div>
<h2>스튜디오 등록</h2>
    <div class="container">
        <form id="app" method="post" @submit.prevent="addStudio">
            <div class="row">
                <div class="col-25">
                    <label for="name">스튜디오 이름</label>
                </div>
                <div class="col-75">
                    <input type="text" id="name" name="name" v-model="studio.name" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="country">스튜디오 종류</label>
                </div>
                <div class="col-75">
                    <select id="categoryId" name="categoryId" v-model="studio.categoryId" required>
                        <option value="1">카페</option>
                        <option value="2">스튜디오</option>
                        <option value="3">집</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="description">스튜디오 소개</label>
                </div>
                <div class="col-75">
                    <textarea id="description" name="description" v-model="studio.description"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="rule">이용 수칙</label>
                </div>
                <div class="col-75">
                    <textarea id="rule" name="rule" v-model="studio.rule"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="mainImg">대표 사진</label>
                </div>
                <div class="col-75">
                    <!-- 파일 업로드 -->
                    <input type="text" id="mainImg" name="mainImg" v-model="studio.mainImg" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="tag">태그</label>
                </div>
                <div class="col-25 tag">
                    <label id='hashtag1'>#</label>
                    <input type="text" name="tag" style="text-indent:10px;">
                </div>
                <div class="col-25 tag">
                    <label id='hashtag2'>#</label>
                    <input type="text" name="tag" style="text-indent:10px;">
                </div>
                <div class="col-25 tag">
                    <label id='hashtag3'>#</label>
                    <input type="text" name="tag" style="text-indent:10px;">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="address">주소</label>
                </div>
                <div class="col-75">
                    <!-- 주소 처리 -->
                    <span style="padding-right:50px;">
                    <input type="text" id="address" name="address" v-model="studio.address" required>
                    </span>
                    <button type="button">찾기</button>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="floor">층수</label>
                </div>
                <div class="col-25">
                    <input type="text" id="floor" name="floor" v-model="studio.floor">
                </div>
                <div class="col-25 col-space">
                    <label for="size">면적</label>
                </div>
                <div class="col-25">
                    <input type="text" id="size" name="size" v-model="studio.studioFilter.size" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="cadImg">공간 도면</label>
                </div>
                <div class="col-75">
                    <!-- 파일 업로드 -->
                    <input type="text" id="cadImg" name="cadImg" v-model="studio.cadImg">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="unitPrice">시간당 대여료</label>
                </div>
                <div class="col-25">
                    <input type="text" id="unitPrice" name="unitPrice" v-model="studio.studioFilter.unitPrice" required>
                </div>
                <div class="col-25 col-space">
                    <label for="excharge">인원 추가시 1인당 대여료</label>
                </div>
                <div class="col-25">
                    <input type="text" id="excharge" name="excharge" v-model="studio.studioFilter.excharge" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="defaultCapacity">기본 인원</label>
                </div>
                <div class="col-25">
                    <input type="text" id="defaultCapacity" name="defaultCapacity" v-model="studio.studioFilter.defaultCapacity" required>
                </div>
                <div class="col-25 col-space">
                    <label for="maxCapacity">최대 인원</label>
                </div>
                <div class="col-25">
                    <input type="text" id="maxCapacity" name="maxCapacity" v-model="studio.studioFilter.maxCapacity" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="">운영 시간</label>
                </div>
                <div class="col-75">
                    <!-- 시간표 -->
                    <input type="text" id="weekDate" name="weekDate" placeholder="요일" required>
                    <input type="text" id="time" name="time" placeholder="시간" required>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="">운영 시간</label>
                </div>
                <div class="col-75">
                    <!-- 시간표 -->
                    <table>
                        <tr>
                            <td style="text-align: center;">월</td>
                            <td style="text-align: center;">화</td>
                            <td style="text-align: center;">수</td>
                            <td style="text-align: center;">목</td>
                            <td style="text-align: center;">금</td>
                            <td style="text-align: center;">토</td>
                            <td style="text-align: center;">일</td>
                        </tr>
                        <tr>
                            <td>
                                <ol class="daySelectable selectable" name="mon">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="tue">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="wed">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="thu">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="fri">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="sat">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                            <td>
                                <ol class="daySelectable selectable" name="sun">
                                    <li class="ui-widget-content" v-for="(time, index) in timePerDay" :key="index">
                                        {{time}}시-{{time+1}}시
                                    </li>
                                </ol>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="parkFlag">주차 가능</label>
                </div>
                <div class="col-25">
                    <input type="radio" name="parkFlag" value="unable" @change="checkParkFlag('no')" checked> 불가
                    <input type="radio" name="parkFlag" value="able" @change="checkParkFlag('yes')">가능
                </div>
                <span id="parkAmount" style="display: none;">
                    <div class="col-25 col-space">
                        <label for="parking">주차 가능 대수</label>
                    </div>
                    <div class="col-25">
                        <!-- 음수를 입력했을 때 0으로 -->
                        <input type="number" id="parking" name="parking" ref="parking" v-model="studio.studioFilter.parking">
                    </div>
                </span>
            </div>
            <div class="row">
                <div class="col-25 col-space" style="padding-left:0">
                    <label for="options">장비 및 옵션</label>
                </div>
                <div class="col-75">
                    <table>
                        <tr>
                            <td>
                                <ol class="optionSelectable selectable" id="optionSelectable1">
                                    <li class="ui-widget-content" name="option1" v-for="(opt, index) in option1" :key="index">{{opt}}</li>
                                </ol>
                            </td>
                            <td>
                                <button type="button" class="optionBtn" @click="controlOptions('add')">추가 ></button>
                                <br/>
                                <button type="button" class="optionBtn" @click="controlOptions('remove')">삭제</button>
                            </td>
                            <td>
                                <ol class="optionSelectable selectable" id="optionSelectable2">
                                    <li class="ui-widget-content" name="option2" v-for="(opt, index) in option2" :key="index">{{opt}}</li>
                                </ol>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="portImg">포트폴리오</label>
                </div>
                <div class="col-75">
                    <!-- 파일 업로드 -->
                    <input type="text" id="portImg" name="portImg" v-model="studio.portImg">
                </div>
            </div>
            <div class="row">
                <p>서비스 동의</p>
                <table id="agreeTable" width="100%">
                    <tr id="partAgree">
                        <td>
                            <input type="checkbox" name="checkAgree[]" value="0" @change="controlAgree('partCheck')">
                            <a href="javascript:;" onclick="controlModal('showModalAgree', 'modalAgree1')">환불 규정 안내에 대한 동의</a>
                        </td>
                        <td>
                            <input type="checkbox" name="checkAgree[]" value="1" @change="controlAgree('partCheck')">
                            <a href="javascript:;" onclick="controlModal('showModalAgree', 'modalAgree2')">개인 정보 제 3자 제공 동의</a>
                        </td>
                        <td>
                            <input type="checkbox" name="checkAgree[]" value="2" @change="controlAgree('partCheck')">
                            <a href="javascript:;" onclick="controlModal('showModalAgree', 'modalAgree3')">개인 정보 수집 및 이용 동의</a>
                        </td>
                    </tr>
                    <tr id="allAgree">
                        <td colspan="3" align="center">
                            <input type="checkbox" id="allCheckAgree" @change="controlAgree('allCheck')">
                            <span>전체동의</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="row">
                <input type="submit" value="Submit">
            </div>
        </form>
    </div>
    <!-- Modal : 환불 규정 안내에 대한 동의 -->
    <div id="modalAgree1" class="modal">
        <div class="modal-content">
            <span class="close" onclick="controlModal('hideModalAgree', 'modalAgree1')">&times;</span>
            <p>환불 규정 안내에 대한 동의</p>
        </div>
    </div>
    <!-- Modal : 개인 정보 제 3자 제공 동의 -->
    <div id="modalAgree2" class="modal">
        <div class="modal-content">
            <span class="close" onclick="controlModal('hideModalAgree', 'modalAgree2')">&times;</span>
            <p>개인 정보 제 3자 제공 동의</p>
        </div>
    </div>
    <!-- Modal : 개인 정보 수집 및 이용 동의 -->
    <div id="modalAgree3" class="modal">
        <div class="modal-content">
            <span class="close" onclick="controlModal('hideModalAgree', 'modalAgree3')">&times;</span>
            <p>개인 정보 수집 및 이용 동의</p>
        </div>
    </div>
</div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import 'jquery-ui';

var count = 0;
var option_left = [];
var option_right = [];
export default {
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
            ],
            option1: ['카메라', '조명', '반사판', '포토그래퍼'],
            option2: ['', '', '', '']
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
            if (control == 'add') { //옵션 추가
                for (let i = 0; i < this.option1.length; i++) {
                    if (this.option1[i] === '') break;
                    for (let j = 0; j < option_left.length; j++) {
                        for (let k = 0; k < this.option2.length; k++) {
                            if (this.option1[i] === option_left[j] && this.option2[k] === '') {
                                this.option2[k] = this.option1.splice(i, 1)[0];
                            }
                        }

                    }
                }
            }
            if (control == 'remove') { //옵션 제거
                for (let i = 0; i < this.option2.length; i++) {
                    if (this.option2[i] === '') break;
                    for (let j = 0; j < option_right.length; j++) {
                        for (let k = 0; k < this.option1.length; k++) {
                            if (this.option2[i] === option_right[j] && this.option1[k] === '') {
                                this.option1[k] = this.option2.splice(i, 1)[0];
                            }
                        }
                    }
                }
            }
            while (this.option1.length < 4) {
                this.option1.push('');
            }
            while (this.option2.length < 4) {
                this.option2.push('');
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
                count = 3;
            }
            if (control == 'partCheck') {
                count = 0;
                for (let i = 0; i < agrees.length; i++) {
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
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].value == '') continue;
                taglist += tags[i].value + '#';
            }
            this.tag = taglist;

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
                temp.push($(this).html());
            });
            option_right = temp;
        });
});
</script>
