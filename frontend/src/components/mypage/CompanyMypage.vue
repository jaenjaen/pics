<template>
  <div class="mypage_container">
    <MypageNametag :customerMode="false" />
    <MypageGap categoryName="예약관리 >" cateogryURL="#"/>
    <!-- 예약관리-->
    <div class="mypage_card">
       <p> 예약관리 테이블 들어가야함</p>
    </div>
    <MypageGap categoryName="스튜디오 관리 +" cateogryURL="http://localhost:9999/registerStudio"/>
    <!-- 문의 내역-->
    <div class="mypage_card"> 
       <p> 내가가진 스튜디오1</p>
       <p> 내가가진 스튜디오2</p>
       <p> 내가가진 스튜디오3</p>
       <p> 내가가진 스튜디오4</p>
    </div>
    <MypageGap categoryName="문의내역 >" cateogryURL="#"/>
    <!-- 리뷰 -->
    <div class="mypage_card">
       <p>문의 내역 만들어놓기~</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";

export default {
  name: "CompanyMypage",
  components: {
    MypageNametag,
    MypageGap
  },
  data() {
    return {
      
    };
  },
  methods: {
  }
};
</script>

<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
