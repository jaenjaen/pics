<template>
  <div class="tagContainer">
    <table id="nameTag">
      <tr>
        <td rowspan="2" class="userImg">
          <img src= "@/assets/img/mypage/defaultImg.svg" alt="userImg" width="70px" height="70px">
        </td>
        <td class="userName">{{username}}</td>
        <td rowspan="2" id="userHeart" v-bind:class="{ 'is-active': customerMode }">
          <a href="http://localhost:9999/wishlist" ><img src="@/assets/img/common/redheart.svg" width="20px" height="20px"></a>
        </td>
      </tr>
      <tr>
        <td class="userDetail">
          <a href="#">정보 관리 ></a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from "axios";

export default {
  name: "MypageNametag",
  props: {
    customerMode: Boolean
  },
  data() {
    return {
      username:"",
      userid:"",
      userImg:"",
    };
  },
  mounted(){

  },
  methods: {
    
  }
};
</script>

<style scoped src="@/assets/css/mypage/nametag.css"></style>