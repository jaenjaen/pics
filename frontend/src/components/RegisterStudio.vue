<style scoped src="../assets/css/RegisterStudio.css"></style>
<template>
  <div id="app">
    <div class="container">
      <h2>스튜디오 등록</h2>
      <br />
      <form method="post" @submit.prevent="addStudio">
        <div class="row">
          <div class="col-25">
            <label for="name">스튜디오 이름</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="name"
              name="name"
              v-model="studio.name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">스튜디오 종류</label>
          </div>
          <div class="col-75">
            <select
              id="categoryId"
              name="categoryId"
              v-model="studio.categoryId"
              required
            >
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
            <textarea
              id="description"
              name="description"
              v-model="studio.description"
            ></textarea>
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
            <input
              type="text"
              id="mainImg"
              name="mainImg"
              v-model="studio.mainImg"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="tag">태그</label>
          </div>
          <div class="col-25 tag">
            <label id="hashtag1">#</label>
            <input type="text" name="tag" style="text-indent:10px;" />
          </div>
          <div class="col-25 tag">
            <label id="hashtag2">#</label>
            <input type="text" name="tag" style="text-indent:10px;" />
          </div>
          <div class="col-25 tag">
            <label id="hashtag3">#</label>
            <input type="text" name="tag" style="text-indent:10px;" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="address">주소</label>
          </div>
          <div class="col-75">
            <!-- 주소 처리 -->
            <span style="padding-right:50px;">
              <input
                type="text"
                id="address"
                name="address"
                v-model="studio.address"
                required
              />
            </span>
            <button type="button">찾기</button>
          </div>
        </div>
        <toggle-button :value="true"
                            color="#33A3DC"
                            :labels="{checked: '㎡', unchecked: '평'}"/>
        <div class="row">
          <div class="col-25">
            <label for="floor">층수</label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">층</label>
            </div>
            <input type="text" id="floor" name="floor" v-model="studio.floor" />
          </div>
          <div class="col-25 col-space">
            <label for="size">면적</label>
          </div>
          <div class="col-25">
            <div class="col-25">
              
            </div>
            <input
              type="text"
              id="size"
              name="size"
              v-model="studio.studioFilter.size"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="cadImg">공간 도면</label>
          </div>
          <div class="col-75">
            <!-- 파일 업로드 -->
            <input
              type="text"
              id="cadImg"
              name="cadImg"
              v-model="studio.cadImg"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="unitPrice">시간당 대여료</label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">원</label>
            </div>
            <input
              type="text"
              id="unitPrice"
              name="unitPrice"
              v-model="studio.studioFilter.unitPrice"
              required
            />
          </div>
          <div class="col-25 col-space">
            <label for="excharge">인원 추가시 1인당 대여료</label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">원</label>
            </div>
            <input
              type="text"
              id="excharge"
              name="excharge"
              v-model="studio.studioFilter.excharge"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="defaultCapacity">기본 인원</label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">명</label>
            </div>
            <input
              type="text"
              id="defaultCapacity"
              name="defaultCapacity"
              v-model="studio.studioFilter.defaultCapacity"
              required
            />
          </div>
          <div class="col-25 col-space">
            <label for="maxCapacity">최대 인원</label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">명</label>
            </div>
            <input
              type="text"
              id="maxCapacity"
              name="maxCapacity"
              v-model="studio.studioFilter.maxCapacity"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="">운영 시간</label>
          </div>
          <div class="col-75">
            <div id="dayList">
              <input
                type="checkbox"
                name="day"
                id="mon"
                @change="selectDay('monTd')"
              />
              <label class="dayLabel" for="mon"></label>
              <span>월</span>
              <input
                type="checkbox"
                name="day"
                id="tue"
                @change="selectDay('tueTd')"
              />
              <label class="dayLabel" for="tue"></label>
              <span>화</span>
              <input
                type="checkbox"
                name="day"
                id="wed"
                @change="selectDay('wedTd')"
              />
              <label class="dayLabel" for="wed"></label>
              <span>수</span>
              <input
                type="checkbox"
                name="day"
                id="thu"
                @change="selectDay('thuTd')"
              />
              <label class="dayLabel" for="thu"></label>
              <span>목</span>
              <input
                type="checkbox"
                name="day"
                id="fri"
                @change="selectDay('friTd')"
              />
              <label class="dayLabel" for="fri"></label>
              <span>금</span>
              <input
                type="checkbox"
                name="day"
                id="sat"
                @change="selectDay('satTd')"
              />
              <label class="dayLabel" for="sat"></label>
              <span>토</span>
              <input
                type="checkbox"
                name="day"
                id="sun"
                @change="selectDay('sunTd')"
              />
              <label class="dayLabel" for="sun"></label>
              <span>일</span>
              <span id="dayAll">
                <input
                  type="checkbox"
                  name="dayHide"
                  id="all"
                  @change="selectDay('all')"
                />
                <label class="dayLabel" for="all"></label>
                전체선택
              </span>
              <span id="dayNo">
                <input
                  type="checkbox"
                  name="dayHide"
                  id="no"
                  @change="selectDay('no')"
                />
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
                <select
                  multiple
                  size="24"
                  id="monTime"
                  name="monTime"
                  @change="selectTime('mon')"
                >
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
                <select
                  multiple
                  size="24"
                  id="tueTime"
                  name="tueTime"
                  @change="selectTime('tue')"
                >
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
                <select
                  multiple
                  size="24"
                  id="wedTime"
                  name="wedTime"
                  @change="selectTime('wed')"
                >
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
        <div class="row">
          <div class="col-25">
            <label for="parkFlag">주차 가능</label>
          </div>
          <div class="col-25">
            <div id="verticalFit">
              <input
                type="radio"
                name="parkFlag"
                value="unable"
                @change="checkParkFlag('no')"
                checked
              />
              불가
              <input
                type="radio"
                name="parkFlag"
                value="able"
                @change="checkParkFlag('yes')"
              />가능
            </div>
          </div>
          <span id="parkAmount" style="display: none;">
            <div class="col-25 col-space">
              <label for="parking">주차 가능 대수</label>
            </div>
            <div class="col-25">
              <!-- 음수를 입력했을 때 0으로 -->
              <div class="outContainer">
                <label class="inContent">대</label>
              </div>
              <input
                type="text"
                id="parking"
                name="parking"
                ref="parking"
                v-model="studio.studioFilter.parking"
              />
            </div>
          </span>
        </div>
        <div class="row">
          <div class="col-25 col-space" style="padding-left:0">
            <label for="options">장비 및 옵션</label>
          </div>
          <div class="col-75">
            <div>
              <vue-multi-select
                ref="multiSelect"
                v-model="option_save"
                search
                historyButton
                :options="option_flags"
                :filters="option_filters"
                :btnLabel="btnLabel"
                :selectOptions="option_list"
              >
                <template v-slot:option="{ option }">
                  <input
                    type="checkbox"
                    name="optionCheck"
                    :checked="option.selected"
                  />
                  <span name="optionName">{{ option.name }}</span>
                </template>
              </vue-multi-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="portImg">포트폴리오</label>
          </div>
          <div class="col-75">
            <!-- 파일 업로드 -->
            <input
              type="text"
              id="portImg"
              name="portImg"
              v-model="studio.portImg"
            />
          </div>
        </div>
        <div class="row">
          <p id="agreeTitle" style="padding-top:10px">서비스 동의</p>
          <table id="agreeTable" width="100%">
            <tr id="partAgree">
              <td id="checkAgree1">
                <input
                  type="checkbox"
                  name="checkAgree[]"
                  value="0"
                  @change="controlAgree('partCheck')"
                />&nbsp;
                <a
                  href="javascript:;"
                  @click="controlModal('showModalAgree', 'modalAgree1')"
                  >환불 규정 안내에 대한 동의</a
                >
              </td>
              <td id="checkAgree2">
                <input
                  type="checkbox"
                  name="checkAgree[]"
                  value="1"
                  @change="controlAgree('partCheck')"
                />&nbsp;
                <a
                  href="javascript:;"
                  @click="controlModal('showModalAgree', 'modalAgree2')"
                  >개인 정보 제 3자 제공 동의</a
                >
              </td>
              <td id="checkAgree3">
                <input
                  type="checkbox"
                  name="checkAgree[]"
                  value="2"
                  @change="controlAgree('partCheck')"
                />&nbsp;
                <a
                  href="javascript:;"
                  @click="controlModal('showModalAgree', 'modalAgree3')"
                  >개인 정보 수집 및 이용 동의</a
                >
              </td>
            </tr>
            <tr>
              <td id="allAgree" colspan="3" align="center">
                <input
                  type="checkbox"
                  id="allCheckAgree"
                  @change="controlAgree('allCheck')"
                />
                <span style="color:white">&nbsp;전체동의</span>
              </td>
            </tr>
          </table>
        </div>
        <div id="submitArea" class="row">
          <input type="submit" value="등록" />
        </div>
      </form>
    </div>
    <!-- Modal : 환불 규정 안내에 대한 동의 -->
    <div id="modalAgree1" class="modal">
      <div class="modal-content">
        <span
          class="close"
          @click="controlModal('hideModalAgree', 'modalAgree1')"
          >&times;</span
        >
        <p>환불 규정 안내에 대한 동의</p>
      </div>
    </div>
    <!-- Modal : 개인 정보 제 3자 제공 동의 -->
    <div id="modalAgree2" class="modal">
      <div class="modal-content">
        <span
          class="close"
          @click="controlModal('hideModalAgree', 'modalAgree2')"
          >&times;</span
        >
        <p>개인 정보 제 3자 제공 동의</p>
      </div>
    </div>
    <!-- Modal : 개인 정보 수집 및 이용 동의 -->
    <div id="modalAgree3" class="modal">
      <div class="modal-content">
        <span
          class="close"
          @click="controlModal('hideModalAgree', 'modalAgree3')"
          >&times;</span
        >
        <p>개인 정보 수집 및 이용 동의</p>
      </div>
    </div>
  </div>
</template>
<script scoped src="../assets/js/RegisterStudio.js"></script>
