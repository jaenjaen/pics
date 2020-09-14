<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="false" />
    <MypageGap categoryName="예약관리" cateogryURL="#"/>
    <!-- 예약관리-->
    <div class="mypage_card">
      <p>ㅇㅖ약고나리</p>
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
