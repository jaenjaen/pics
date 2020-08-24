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
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
import RegsiterStudioJS from '../assets/js/RegisterStudio.js';
</script>
