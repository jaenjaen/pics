<template>
  <div class="tagContainer">
    <table id="nameTag">
      <tr>
        <td rowspan="2" class="userImg">
          <img :src= "userImg" alt="userImg" width="70px" height="70px">
        </td>
        <td class="userName">{{username}}</td>
        <td rowspan="2" id="userHeart" v-bind:class="{ 'is-active': customerMode }">
          <a href="http://localhost:9999/wishlist?userid="><img src="@/assets/img/util/fullheart.svg" width="20px" height="20px"></a>
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
      userImg: "@/assets/img/mypage/defaultImg.svg",
    };
  },
  mounted(){
    if(sessionStorage.getItem("customer")!= null){
      var customer = JSON.parse(sessionStorage.getItem("customer"));
      this.username = customer.nickname;
      this.userId = customer.custId;
      this.userImg = customer.imgSrc;
    }

  },
  methods: {
    
  }
};
</script>

<style scoped src="@/assets/css/mypage/nametag.css"></style>