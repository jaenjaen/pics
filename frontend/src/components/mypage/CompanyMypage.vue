<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="false" />
    <MypageGap categoryName="예약관리" cateogryURL="#"/>

    <!-- 예약관리-->
    <div class="mypage_card" style="height:500px;">
      <div id="calendar_header">
        <button class="arrow_btn" @click="prevWeek">
          <img src="@/assets/img/util/backward.svg">
        </button>

        <button class="today_btn" @click="moveToday">today</button>

        <button class="arrow_btn" @click="nextWeek">
          <img src="@/assets/img/util/forward.svg">
        </button>
      <span><p style="display:inline;">{{startWeek}}~{{endWeek}}</p></span>
        
        <select v-model="selectedId" @change="getStudioReservation">
          <option value="" v-if="studioFlag" disabled> 등록된 스튜디오가 없습니다. </option>
          <option value="" v-if="!studioFlag" disabled> 스튜디오를 선택해주세요. </option>
          <option v-for="(studio, index) in studioList" :key="index" :value="studio.stuId">
            {{ studio.name }}
          </option>
        </select>

      </div>

      <!-- Custom Creation Popup -->
       <modal name="creationModal" :height="200" :width="300" :styles="styles">
         <div class="popup">
          <h3> 예약이름(무조건 예외날만 추가)</h3>
          <h3> 날짜데이터피커1  |  날짜 데이터피커2 | 올데이</h3>
          <button>저장</button>
          <button id="delete" v-if="calendarId">삭제</button>
        </div>
      </modal>

      <!-- Custom Detail Popup -->
       <modal name="detailModal" :height="200" :width="300" :styles="styles">
         <div class="popup">
          <h3>customerID(누르면 바로 채팅)</h3>
          <h4>날짜~날짜</h4>
          <h4>예약분류</h4>
        <button>수정</button>
        </div>
      </modal>

      <!-- Calendar -->
      <calendar ref="studioCalendar"
        style="height:450px;"
        :calendars="calendarList"
        :schedules="scheduleList"
        :taskView="false"
        :disableDblClick="true"
        :isReadOnly="false"
        :useCreationPopup="false"
        :useDetailPopup="false"
        @beforeCreateSchedule="onBeforeCreateSchedule"
        @clickSchedule="onClickSchedule"
      /> 
    </div>
    <MypageGap categoryName="스튜디오 관리 +" cateogryURL="http://localhost:9999/registerStudio"/>

    <!-- 문의 내역-->
    <div class="mypage_card">
       <table>
         <tr>
          <th>종류</th> <th>스튜디오 이름</th> <th>스튜디오 위치</th> <th>스튜디오 수정</th>
        </tr>
        <tr>
          <td colspan="4" v-if="studioFlag"> 소유한 스튜디오가 없습니다.<br><a href="http://localhost:9999/registerStudio"> 새로운 스튜디오 추가하기 </a></td>
        </tr>
        <tr v-for="(studio, index) in studioList" :key="index">
          <td style="width:10%">{{studio.category.categoryName}}</td> <td style="width:35%;"><router-link :to="{name:'studioInfo', params: {stuId:studio.stuId}}">{{studio.name}}</router-link></td> 
          <td>{{studio.studioFilter.address}}</td>
          <td style="width:15%"><router-link :to="{name:'studioEdit', params: {stuId:studio.stuId}}"><button class="list_btn">수정</button></router-link></td>
        </tr>
      </table>
    </div>
    <MypageGap categoryName="문의내역" cateogryURL="/chatShow"/>

    <!-- 리뷰 -->
    <Inquiry :customerMode="false"/>
  </div>
</template>

<script scoped src="@/assets/js/mypage/CompanyMypage.js"></script>
<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
<style scoped src="@/assets/css/mypage/calendar.css"></style>


