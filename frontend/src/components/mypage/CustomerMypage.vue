<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="true" />
    <MypageGap categoryName="예약내역 >" cateogryURL="#"/>
    <!-- 예약내역-->
    <div class="mypage_card">
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
    </div>
    <MypageGap categoryName="문의내역 >" cateogryURL="#"/>
    <!-- 문의 내역-->
    <div class="mypage_card"> 
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
    </div>
    <MypageGap categoryName="스튜디오 리뷰 >" cateogryURL="#"/>
    <!-- 리뷰 -->
    <div class="mypage_card">
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";

export default {
  name: "customerMypage",
  components: {
    MypageNametag,
    MypageGap
  },
  data() {
    return {
      reservationList:[],
      reviewList:[]
    };
  },
  methods: {
  }
};
</script>

<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
