<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="true" />
    <MypageGap categoryName="예약내역 >" cateogryURL="#"/>
    <!-- 예약내역-->
    <div class="mypage_card">
       <table>
         <tr>
          <th>예약번호</th> <th>예약일자</th> <th>예약업체</th> <th>예약인원</th> <th>결제금액</th> <th>결제취소</th>
        </tr>
        <tr>
          <td>0</td> <td>2020-09-03 18:00 <br> ~ <br> 2020-09-03 20:00</td> <td>나잇나잇</td> <td>3</td> <td>3,000,000 원</td> <td><button>결제취소</button></td>
        </tr>
        <tr>
          <td>0</td> <td>2020-09-03 18:00 <br> ~ <br> 2020-09-03 20:00</td> <td>나잇나잇</td> <td>3</td> <td>3,000,000 원</td> <td><button>결제취소</button></td>
        </tr>
        <tr>
          <td>0</td> <td>2020-09-03 18:00 <br> ~ <br> 2020-09-03 20:00</td> <td>나잇나잇</td> <td>3</td> <td>3,000,000 원</td> <td><button>결제취소</button></td>
        </tr>
      </table>
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
