<style scoped src="@/assets/css/mypage/edit/StudioEdit.css"></style>
<template>
  <div id="app">
    <div class="container">
      <h2>스튜디오 수정</h2>
      <br />
      <section>
        <div class="row">
          <div class="col-25">
            <label for="name">
              스튜디오 이름
            </label>
          </div>
          <div class="col-75">
            <input type="text" id="name" name="name" :placeholder="studio.name" disabled/>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">
              스튜디오 종류
            </label>
          </div>
          <div class="col-75">
            <select id="categoryId" name="categoryId" disabled>
              <option>{{categoryme}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="description">스튜디오 소개</label>
            <div style="color:#ccc;"><span name="changeArea">0</span><b>/500</b></div>
          </div>
          <div class="col-75">
            <textarea id="description" name="countLength" v-model="studio.description" @keyup="checkLength()" maxlength="500"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="rule">이용 수칙</label>
            <div style="color:#ccc;"><span name="changeArea">0</span><b>/400</b></div>
          </div>
          <div class="col-75">
            <textarea id="rule" name="countLength" v-model="studio.rule" @keyup="checkLength()" maxlength="400"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="mainImg">
              대표 사진
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-75 uploadTotal">
            <div class="uploadArea">
              <input type=file id="mainFile0" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile0', 'mainImg0', 'mainFilesBtn0', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg0" onclick='document.getElementById("mainFile0").click()'>
              <button type="button" id="mainFilesBtn0" class="uploadResetBtn" @click="resetUploadImg('mainFile0', 'mainImg0', 'mainFilesBtn0', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile1" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile1', 'mainImg1', 'mainFilesBtn1', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg1" onclick='document.getElementById("mainFile1").click()'>
              <button type="button" id="mainFilesBtn1" class="uploadResetBtn" @click="resetUploadImg('mainFile1', 'mainImg1', 'mainFilesBtn1', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile2" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile2', 'mainImg2', 'mainFilesBtn2', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg2" onclick='document.getElementById("mainFile2").click()'>
              <button type="button" id="mainFilesBtn2" class="uploadResetBtn" @click="resetUploadImg('mainFile2', 'mainImg2', 'mainFilesBtn2', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile3" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile3', 'mainImg3', 'mainFilesBtn3', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg3" onclick='document.getElementById("mainFile3").click()'>
              <button type="button" id="mainFilesBtn3" class="uploadResetBtn" @click="resetUploadImg('mainFile3', 'mainImg3', 'mainFilesBtn3', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile4" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile4', 'mainImg4', 'mainFilesBtn4', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg4" onclick='document.getElementById("mainFile4").click()'>
              <button type="button" id="mainFilesBtn4" class="uploadResetBtn" @click="resetUploadImg('mainFile4', 'mainImg4', 'mainFilesBtn4', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile5" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile5', 'mainImg5', 'mainFilesBtn5', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg5" onclick='document.getElementById("mainFile5").click()'>
              <button type="button" id="mainFilesBtn5" class="uploadResetBtn" @click="resetUploadImg('mainFile5', 'mainImg5', 'mainFilesBtn5', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile6" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile6', 'mainImg6', 'mainFilesBtn6', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg6" onclick='document.getElementById("mainFile6").click()'>
              <button type="button" id="mainFilesBtn6" class="uploadResetBtn" @click="resetUploadImg('mainFile6', 'mainImg6', 'mainFilesBtn6', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile7" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile7', 'mainImg7', 'mainFilesBtn7', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg7" onclick='document.getElementById("mainFile7").click()'>
              <button type="button" id="mainFilesBtn7" class="uploadResetBtn" @click="resetUploadImg('mainFile7', 'mainImg7', 'mainFilesBtn7', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile8" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile8', 'mainImg8', 'mainFilesBtn8', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg8" onclick='document.getElementById("mainFile8").click()'>
              <button type="button" id="mainFilesBtn8" class="uploadResetBtn" @click="resetUploadImg('mainFile8', 'mainImg8', 'mainFilesBtn8', 'main')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile9" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile9', 'mainImg9', 'mainFilesBtn9', $event)" style='display: none;'> 
              <img :src="main" class="uploadImg" id="mainImg9" onclick='document.getElementById("mainFile9").click()'>
              <button type="button" id="mainFilesBtn9" class="uploadResetBtn" @click="resetUploadImg('mainFile9', 'mainImg9', 'mainFilesBtn9', 'main')">삭제</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="tag">
              태그
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25 tag">
            <label id="hashtag1">#</label>
            <input type="text" name="tag" maxlength="45" style="text-indent:10px;" />
          </div>
          <div class="col-25 tag">
            <label id="hashtag2">#</label>
            <input type="text" name="tag" maxlength="45" style="text-indent:10px;" />
          </div>
          <div class="col-25 tag">
            <label id="hashtag3">#</label>
            <input type="text" name="tag" maxlength="45" style="text-indent:10px;" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="address">
              주소
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-75" style="margin-top:10px;margin-bottom:7px;">
            <!-- 주소 처리 -->
            <input type="text" id="address1" name="address1" :value="address1" disabled />
            <button type="button" id="searchAddr"  @click="controlModal('showModal', 'modalAddr')">찾기</button><br/>
            <div id="modalAddr" class="modal">
              <div class="modal-content modal-addr-content">
                <span class="close" @click="controlModal('hideModal', 'modalAddr')" >&times;
                </span>
                <div id = "addressArea">
                  <vue-daum-postcode 
                    id = "addressAPI"
                    @complete="onComplete"
                    :hide-map-btn="false"
                    :hide-eng-btn="true"
                    :always-show-eng-addr="false"
                    :zonecode-only="true" 
                  />
                </div>
              </div>
            </div>
            <input placeholder="상세주소를 작성하세요." type="text" id="address2" name="address2" v-model="address2" :maxlength="remainAddr" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="floor">층수</label>
          </div>
          <div class="col-25">
            <label class="inContent">층</label>
            <div class="outContainer">
                <label class="sizeLabel">
                  <input class="tgl tgl-flip" id="underground" @change="changeFloor()" type="checkbox"/>
                  <label class="tgl-btn" data-tg-off="지상" data-tg-on="지하" for="underground"></label>
                </label>
            </div>
            <input type="text" id="floor" name="floor" v-model="floorNum"  maxlength="4"/>
          </div>
          <div class="col-25 col-space">
            <label for="size">
              면적
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="sizeLabel">
                <input class="tgl tgl-flip" id="pyoung" @change="changeSizeUnit()" type="checkbox"/>
                <label class="tgl-btn" data-tg-off="㎡" data-tg-on="평" for="pyoung"></label>
              </label>
            </div>
            <input type="text" id="size" name="size" v-model="sizeValue" maxlength="8" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="cadImg">공간 도면</label>
          </div>
          <div class="col-75 uploadTotal">
            <div class="uploadArea">
              <input type=file id="cadFile" name="cadFile" class="cadFile" @change="handleImgFileSelect('cadFile', 'cadImg', 'cadFileBtn', $event)" style='display: none;'> 
              <img :src="cad" class="uploadImg" id="cadImg" onclick='document.getElementById("cadFile").click()'>
              <button type="button" id="cadFileBtn" class="uploadResetBtn" @click="resetUploadImg('cadFile', 'cadImg', 'cadFileBtn', 'cad')">삭제</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="unitPrice">
              시간당 대여료
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">원</label>
            </div>
            <input type="text" id="unitPrice" name="unitPrice" v-model="studio.studioFilter.unitPrice" maxlength="10" required />
          </div>
          <div class="col-25 col-space">
            <label for="excharge">
              1인 추가시 대여료 
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">원</label>
            </div>
            <input type="text" id="excharge" name="excharge" v-model="studio.studioFilter.excharge" maxlength="10" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="defaultCapacity">
              기본 인원
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">명</label>
            </div>
            <input type="text" id="defaultCapacity" name="defaultCapacity" v-model="studio.studioFilter.defaultCapacity" maxlength="5" required/>
          </div>
          <div class="col-25 col-space">
            <label for="maxCapacity">
              최대 인원
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-25">
            <div class="outContainer">
              <label class="inContent">명</label>
            </div>
            <input type="text" id="maxCapacity" name="maxCapacity" v-model="studio.studioFilter.maxCapacity" maxlength="5" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="">
              운영 시간
              <img :src="required" width="20px">
            </label>
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
              <td>월요일</td>
            </tr>
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
                <select multiple size="24" id="monTime" name="dayTime" @change="selectTime('monTime')" >
                  <option v-for="(time, index) in week.mon" :key="index" style="border: 2px solid #46E8CC">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="tueTd">
            <tr>
              <td>화요일</td>
            </tr>
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
                <select multiple size="24" id="tueTime" name="dayTime" @change="selectTime('tueTime')" >
                  <option v-for="(time, index) in week.tue" :key="index" style="border: 2px solid #49E1F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="wedTd">
            <tr>
              <td>수요일</td>
            </tr>
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
                <select multiple size="24" id="wedTime" name="dayTime" @change="selectTime('wedTime')" >
                  <option v-for="(time, index) in week.wed" :key="index" style="border: 2px solid #4DA6DB">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="thuTd">
            <tr>
              <td>목요일</td>
            </tr>
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
                <select multiple size="24" id="thuTime" name="dayTime" @change="selectTime('thuTime')">
                  <option v-for="(time, index) in week.thu" :key="index" style="border: 2px solid #4987F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="friTd">
            <tr>
              <td>금요일</td>
            </tr>
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
                <select multiple size="24" id="friTime" name="dayTime" @change="selectTime('friTime')">
                  <option v-for="(time, index) in week.fri" :key="index" style="border: 2px solid #4657E8">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="satTd">
            <tr>
              <td>토요일</td>
            </tr>
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
                <select multiple size="24" id="satTime" name="dayTime" @change="selectTime('satTime')">
                  <option v-for="(time, index) in week.sat" :key="index" style="border: 2px solid #A244F2">
                    {{ index }}시-{{ index + 1 }}시
                  </option>
                </select>
              </td>
            </tr>
          </table>

          <table class="daySelect" id="sunTd">
            <tr>
              <td>일요일</td>
            </tr>
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
                <select multiple size="24" id="sunTime" name="dayTime" @change="selectTime('sunTime')">
                  <option v-for="(time, index) in week.sun" :key="index" style="border: 2px solid #C941E8">
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
              <input type="radio" name="parkFlag" value="unable" @change="checkParkFlag('no')" checked /> 불가
              <input type="radio" name="parkFlag" value="able" @change="checkParkFlag('yes')" /> 가능
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
              <input type="text" id="parking" name="parking" ref="parking" v-model="studio.studioFilter.parking" />
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
                id="multi"
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
          <div class="col-75 uploadTotal">
            <div class="uploadArea">
              <input type=file id="portFile0" name="portFiles" class="portFiles" @change="handleImgFileSelect('portFile0', 'portImg0', 'portFilesBtn0', $event)" style='display: none;'> 
              <img :src="port" class="uploadImg" id="portImg0" onclick='document.getElementById("portFile0").click()'>
              <button type="button" id="portFilesBtn0" class="uploadResetBtn" @click="resetUploadImg('portFile0', 'portImg0', 'portFilesBtn0', 'port')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="portFile1" name="portFiles" class="portFiles" @change="handleImgFileSelect('portFile1', 'portImg1', 'portFilesBtn1', $event)" style='display: none;'> 
              <img :src="port" class="uploadImg" id="portImg1" onclick='document.getElementById("portFile1").click()'>
              <button type="button" id="portFilesBtn1" class="uploadResetBtn" @click="resetUploadImg('portFile1', 'portImg1', 'portFilesBtn1', 'port')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="portFile2" name="portFiles" class="portFiles" @change="handleImgFileSelect('portFile2', 'portImg2', 'portFilesBtn2', $event)" style='display: none;'> 
              <img :src="port" class="uploadImg" id="portImg2" onclick='document.getElementById("portFile2").click()'>
              <button type="button" id="portFilesBtn2" class="uploadResetBtn" @click="resetUploadImg('portFile2', 'portImg2', 'portFilesBtn2', 'port')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="portFile3" name="portFiles" class="portFiles" @change="handleImgFileSelect('portFile3', 'portImg3', 'portFilesBtn3', $event)" style='display: none;'> 
              <img :src="port" class="uploadImg" id="portImg3" onclick='document.getElementById("portFile3").click()'>
              <button type="button" id="portFilesBtn3" class="uploadResetBtn" @click="resetUploadImg('portFile3', 'portImg3', 'portFilesBtn3', 'port')">삭제</button>
            </div>
          </div>
        </div>
        <div id="submitArea" class="row">
          <button type="button" id="reset" @click="resetContent()">새로쓰기</button>
           <button type="button" id="delete" @click="deleteStudio()">스튜디오 삭제</button>
          <button type="submit" id="register" @click="checkLogin()">등록</button>
        </div>
      </section>
    </div>
  </div>
</template>
<script scoped src="@/assets/js/mypage/edit/StudioEdit.js"></script>

<style scoped src="vue-material/dist/vue-material.min.css"></style>