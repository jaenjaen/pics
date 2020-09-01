<template>
  <div class="publicSpace">
    <MypageNametag customerMode="true"/>
    <MypageGap />
    <!-- 예약내역-->
    <MypageGap />
    <!-- 문의 내역-->
    <MypageGap />
    <!-- 리뷰 -->
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