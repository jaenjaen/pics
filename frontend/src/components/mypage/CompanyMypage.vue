<template>
  <div class="publicSpace">
    <MypageNametag customerMode="false"/>
    <div class="gap">
      <span clss="categroy_name"> 예약관리
        <select> </select>
      </span>
    </div>
    <!-- 예약 관리 -->
    <MypageGap />
    <!--스튜디오 관리-->
    <MypageGap />
    <!--문의 관리-->
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";

export default {
  name: "companyMypage",
  components: {
    MypageNametag,
    MypageGap,
  },
  data() {
    return {
      
    };
  },
  methods: {
  }
};
</script>