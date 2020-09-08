<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="true" />
    <MypageGap categoryName="예약내역 >" cateogryURL="http://localhost:9999/reservationlist"/>
    <!-- 예약내역-->
    <div class="mypage_card">
       <table>
         <tr>
          <th>예약일자</th> <th>예약업체</th> <th>예약인원</th> <th>결제금액</th> <th>결제취소</th>
        </tr>
        <tr>
          <td colspan="5" v-if="resvFlag"> 존재하는 예약이 없습니다. </td>
        </tr>
        <tr v-for="(reservation) in resvList" :key="reservation">
          <td>{{reservation.startDate}} <br> ~ <br>{{reservation.endDate}}</td> <td>{{reservation.studio.name}}</td> <td>{{reservation.totalPeople}}</td> 
          <td>{{reservation.totalPrice}}원</td> <td><button class="list_btn" @click="deleteResv(reservation.resId)">결제취소</button></td>
        </tr>
      </table>
    </div>
    <MypageGap categoryName="문의내역" cateogryURL="#"/>
    <!-- 문의 내역-->
    <div class="mypage_card"> 
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
       <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
      <p> 예약번호 예약업체 결제완료 표기 결제취소 버튼 </p>
    </div>
    <MypageGap categoryName="스튜디오 리뷰" cateogryURL="#"/>
    <!-- 리뷰 -->
    <div class="mypage_card">
      <table>
         <tr>
          <th>예약업체</th> <th>리뷰내용</th> <th>평점</th> <th>리뷰삭제</th>
        </tr>
        <tr>
          <td colspan="5" v-if="rvFlag"> 작성한 리뷰가 없습니다.</td>
        </tr>
        <tr v-for="(review) in reviewList" :key="review">
           <td><router-link :to="{name:'studioInfo', params: {stuId:review.studio.stuId}}">{{review.studio.name}}</router-link></td> <td style="width:60%; text-align:left;">{{review.content}}</td> 
          <td>{{review.score}}점</td> <td><button class="list_btn" @click="deleteReview(review.reviewId)">리뷰삭제</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/mypage/CustomerMypage.js"></script>
<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
