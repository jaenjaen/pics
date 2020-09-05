<style scoped src="@/assets/css/studioRegister/RegisterStudio.css"></style>
<template>
  <div id="app">
    <div class="container">
      <h2>스튜디오 등록</h2>
      <br />
      <form enctype="multipart/form-data" @submit.prevent="checkLogin">
        <div class="row">
          <div class="col-25">
            <label for="name">
              스튜디오 이름
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-75">
            <input type="text" id="name" name="name" v-model="studio.name" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">
              스튜디오 종류
              <img :src="required" width="20px">
            </label>
          </div>
          <div class="col-75">
            <select id="categoryId" name="categoryId" v-model="studio.categoryId" required>
              <option v-for="(category, index) in category" :key="index" :value="category.categoryId">{{category.categoryName}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="description">스튜디오 소개</label>
            <div style="color:#ccc;"><span name="changeArea">0</span><b>/500</b></div>
          </div>
          <div class="col-75">
            <textarea id="description" name="countLength" v-model="studio.description" @keyup="checkLength(event)"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="rule">이용 수칙</label>
            <div style="color:#ccc;"><span name="changeArea">0</span><b>/400</b></div>
          </div>
          <div class="col-75">
            <textarea id="rule" name="countLength" v-model="studio.rule" @keyup="checkLength(event)"></textarea>
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
              <img :src="preview" class="uploadImg" id="mainImg0" onclick='document.getElementById("mainFile0").click()'>
              <button type="button" id="mainFilesBtn0" class="uploadResetBtn" @click="resetUploadImg('mainFile0', 'mainImg0', 'mainFilesBtn0', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile1" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile1', 'mainImg1', 'mainFilesBtn1', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg1" onclick='document.getElementById("mainFile1").click()'>
              <button type="button" id="mainFilesBtn1" class="uploadResetBtn" @click="resetUploadImg('mainFile1', 'mainImg1', 'mainFilesBtn1', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile2" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile2', 'mainImg2', 'mainFilesBtn2', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg2" onclick='document.getElementById("mainFile2").click()'>
              <button type="button" id="mainFilesBtn2" class="uploadResetBtn" @click="resetUploadImg('mainFile2', 'mainImg2', 'mainFilesBtn2', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile3" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile3', 'mainImg3', 'mainFilesBtn3', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg3" onclick='document.getElementById("mainFile3").click()'>
              <button type="button" id="mainFilesBtn3" class="uploadResetBtn" @click="resetUploadImg('mainFile3', 'mainImg3', 'mainFilesBtn3', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile4" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile4', 'mainImg4', 'mainFilesBtn4', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg4" onclick='document.getElementById("mainFile4").click()'>
              <button type="button" id="mainFilesBtn4" class="uploadResetBtn" @click="resetUploadImg('mainFile4', 'mainImg4', 'mainFilesBtn4', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile5" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile5', 'mainImg5', 'mainFilesBtn5', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg5" onclick='document.getElementById("mainFile5").click()'>
              <button type="button" id="mainFilesBtn5" class="uploadResetBtn" @click="resetUploadImg('mainFile5', 'mainImg5', 'mainFilesBtn5', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile6" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile6', 'mainImg6', 'mainFilesBtn6', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg6" onclick='document.getElementById("mainFile6").click()'>
              <button type="button" id="mainFilesBtn6" class="uploadResetBtn" @click="resetUploadImg('mainFile6', 'mainImg6', 'mainFilesBtn6', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile7" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile7', 'mainImg7', 'mainFilesBtn7', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg7" onclick='document.getElementById("mainFile7").click()'>
              <button type="button" id="mainFilesBtn7" class="uploadResetBtn" @click="resetUploadImg('mainFile7', 'mainImg7', 'mainFilesBtn7', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile8" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile8', 'mainImg8', 'mainFilesBtn8', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg8" onclick='document.getElementById("mainFile8").click()'>
              <button type="button" id="mainFilesBtn8" class="uploadResetBtn" @click="resetUploadImg('mainFile8', 'mainImg8', 'mainFilesBtn8', 'preview')">삭제</button>
            </div>
            <div class="uploadArea">
              <input type=file id="mainFile9" name="mainFiles" class="mainFiles" @change="handleImgFileSelect('mainFile9', 'mainImg9', 'mainFilesBtn9', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="mainImg9" onclick='document.getElementById("mainFile9").click()'>
              <button type="button" id="mainFilesBtn9" class="uploadResetBtn" @click="resetUploadImg('mainFile9', 'mainImg9', 'mainFilesBtn9', 'preview')">삭제</button>
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
            <input placeholder="상세주소를 작성하세요." type="text" id="address2" name="address2" v-model="address2" />
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
            <input type="text" id="floor" name="floor" v-model="floorNum"/>
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
            <input type="text" id="size" name="size" v-model="sizeValue" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="cadImg">공간 도면</label>
          </div>
          <div class="col-75 uploadTotal">
            <div class="uploadArea">
              <input type=file id="cadFile" name="cadFile" class="cadFile" @change="handleImgFileSelect('cadFile', 'cadImg', 'cadFileBtn', $event)" style='display: none;'> 
              <img :src="preview" class="uploadImg" id="cadImg" onclick='document.getElementById("cadFile").click()'>
              <button type="button" id="cadFileBtn" class="uploadResetBtn" @click="resetUploadImg('cadFile', 'cadImg', 'cadFileBtn', 'preview')">삭제</button>
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
            <input type="text" id="unitPrice" name="unitPrice" v-model="studio.studioFilter.unitPrice" required />
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
            <input type="text" id="excharge" name="excharge" v-model="studio.studioFilter.excharge" required />
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
            <input type="text" id="defaultCapacity" name="defaultCapacity" v-model="studio.studioFilter.defaultCapacity" required/>
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
            <input type="text" id="maxCapacity" name="maxCapacity" v-model="studio.studioFilter.maxCapacity" required />
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
        <div class="row">
          <p id="agreeTitle" style="padding-top:10px">
            서비스 동의&nbsp;
            <img :src="required" width="20px">
          </p>
          
          <table id="agreeTable" width="100%">
            <tr id="partAgree">
              <td id="checkAgree1">
                <input type="checkbox" name="checkAgree[]" value="0" @change="controlAgree('partCheck')" />&nbsp;
                <a href="javascript:;" @click="controlModal('showModal', 'modalAgree1')" >환불 규정 안내에 대한 동의</a>
              </td>
              <td id="checkAgree2">
                <input type="checkbox" name="checkAgree[]" value="1" @change="controlAgree('partCheck')" />&nbsp;
                <a href="javascript:;" @click="controlModal('showModal', 'modalAgree2')" >개인 정보 제 3자 제공 동의</a>
              </td>
              <td id="checkAgree3">
                <input type="checkbox" name="checkAgree[]" value="2" @change="controlAgree('partCheck')" />&nbsp;
                <a href="javascript:;" @click="controlModal('showModal', 'modalAgree3')" >개인 정보 수집 및 이용 동의</a>
              </td>
            </tr>
            <tr>
              <td id="allAgree" colspan="3" align="center">
                <input type="checkbox" id="allCheckAgree" @change="controlAgree('allCheck')" />
                <span style="color:white">&nbsp;전체동의</span>
              </td>
            </tr>
          </table>
        </div>
        <div id="submitArea" class="row">
          <button type="button" id="reset" @click="resetContent()">새로쓰기</button>
          <button type="button" id="temp" @click="tempSave()">임시저장</button>
          <button type="submit" id="register">등록</button>
        </div>
      </form>
    </div>
    <!-- Modal : 환불 규정 안내에 대한 동의 -->
    <div id="modalAgree1" class="modal">
      <div class="modal-content">
        <span class="close" @click="controlModal('hideModal', 'modalAgree1')" >&times;
        </span>
        <p style="text-align:center"><b>환불 규정 안내에 대한 동의</b></p><br/>
        <p>
          * 100% 환불 : 사용 예정일 5일 전<br/>
          * 70% 환불 : 사용 예정일 3일 전 ~ 사용 예정일 4일 전<br/>
          * 환불 불가 : 사용 예정일 ~ 사용 예정일 2일 전<br/><br/>
          - 촬영일 기준으로 5일 전까지는 취소 및 100% 환불이 가능합니다.<br/>
          - 촬영일 기준으로 3일 전까지는 취소 및 70% 환불이 가능합니다.<br/>
          - 촬영일 기준으로 2일 전부터는 취소 및 환불이 불가합니다.<br/>
          - 호스트 사정에 의해서 취소 발생시 100% 환불이 가능합니다.<br/>
        </p>
      </div>
    </div>
    <!-- Modal : 개인 정보 제 3자 제공 동의 -->
    <div id="modalAgree2" class="modal">
      <div class="modal-content">
        <span class="close" @click="controlModal('hideModal', 'modalAgree2')" >&times;
        </span>
        <p style="text-align:center"><b>개인 정보 제 3자 제공 동의</b></p><br/>
        <p>
          "Pics"에서는 고객님의 예약 서비스 제공 등을 위해 최소한의 개인정보를 수집/제공하고 있습니다.<br/><br/>
          (1) "Pics"의 개인정보 수집 이용 목적은 다음과 같습니다. 
          "고객"은 정보 수집/이용 약관에 동의할 수 있으며, 동의하지 않는 경우 예약 서비스 이용에 제한이 있을 수 있습니다.<br/>
          - 수집/이용 목적 : 위탁 업무 내용(개인 정보의 보유 및 이용 기간)<br/><br/>
          (2) 회원 정보를 제공받는 자, 제공목적, 제공하는 정보, 보유 및 이용기간은 다음과 같습니다.<br/>
          - 제공받는 자 : Pics 게스트, 호스트<br/>
          - 제공 목적 : 공간 예약 서비스 이용계약 이행(서비스 제공, 확인, 이용자 정보 확인)<br/>
          - 제공하는 정보 : 아이디, 이름, 연락처, 기타 예약에 필요한 정보<br/>
          - 제공받는 자의 개인정보 보유 및 이용 기간 : 서비스 제공기간(관계법령의 규정에 의하여 보존할 필요가 있는 경우 및 사전 동의를 득한 경우 해당 보유 기간)
        </p>
      </div>
    </div>
    <!-- Modal : 개인 정보 수집 및 이용 동의 -->
    <div id="modalAgree3" class="modal">
      <div class="modal-content">
        <span class="close" @click="controlModal('hideModal', 'modalAgree3')" >&times;
        </span>
        <p style="text-align:center"><b>개인 정보 수집 및 이용 동의</b></p><br/>
        <p>
        Ⅰ. 개인정보의 수집 및 이용 동의서<br/>
        - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.<br/><br/>
        ① 개인정보 수집 항목 및 수집·이용 목적<br/>
        가) 수집 항목 (필수항목)<br/>
        - 스튜디오 이름, 사진, 주소, 층수, 면적, 운영 시간 등 스튜디오 등록에 기재된 정보 또는 신청자가 제공한 정보<br/>
        나) 수집 및 이용 목적<br/>
        - 스튜디오 등록 및 스튜디오 예약 서비스 제공<br/>
        - 주제 및 기준에 따른 스튜디오 분류 및 데이터 분석<br/><br/>
        ② 개인정보 보유 및 이용기간<br/>
        - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지<br/><br/>
        ③ 동의거부관리<br/>
        - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,
        귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 스튜디오 예약 관리 서비스에 있어 불이익이 발생할 수
        있음을 알려드립니다
        </p>
      </div>
    </div>
  </div>
</template>
<script scoped src="@/assets/js/studioRegister/RegisterStudio.js"></script>