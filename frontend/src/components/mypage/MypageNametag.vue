<template>
  <div class="tagContainer">
    <table id="nameTag">
      <tr>
        <td rowspan="2" class="userImg">
          <img :src="userImg" alt="userImg" width="70px" height="70px">
        </td>
        <td class="userName">{{username}}</td>
        <td rowspan="2" id="userHeart">
          <a href="http://localhost:9999/wishlist?userid="><img src="@/assets/img/util/fullheart.svg" width="20px" height="20px" v-if="customerMode"></a>
        </td>
      </tr>
      <tr>
        <td class="userDetail">
          <a href="#">내 정보 수정 ></a>
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
      userImg: require("@/assets/img/mypage/defaultStudio.svg")
    };
  },
  mounted(){
    if(sessionStorage.getItem("customer")!= null){
      var customer = JSON.parse(sessionStorage.getItem("customer"));
      this.username = customer.nickname;
      this.userId = customer.custId;
      this.userImg = customer.imgSrc;
    }
    else if(sessionStorage.getItem("company")!=null){
      var company = JSON.parse(sessionStorage.getItem("company"));
      this.username = company.name;
      this.userId = company.comId;
      if (company.logoImg != null) this.userImg = company.logoImg;
      console.log(this.userImg);
    }
  },
  methods: {
    
  }
};
</script>

<style scoped src="@/assets/css/mypage/nametag.css"></style>