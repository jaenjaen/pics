<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="false" />
    <MypageGap categoryName="예약관리 >" cateogryURL="#"/>
    <!-- 예약관리-->
    <div class="mypage_card">
      <p>ㅇㅖ약고나리</p>
    </div>
    <MypageGap categoryName="스튜디오 관리 +" cateogryURL="http://localhost:9999/registerStudio"/>
    <!-- 문의 내역-->
    <div class="mypage_card">
       <p>슷휴디오 관리</p>
    </div>
    <MypageGap categoryName="문의내역 >" cateogryURL="#"/>
    <!-- 리뷰 -->
    <Inquiry :customerMode="false"/>
  </div>
</template>

<script scoped src="@/assets/js/mypage/CompanyMypage.js"></script>
<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
