<template>
  <div class="publicSpace">
    <div class="grid">
      <h2>업체 정보 수정</h2>
      <br />
      <form
        action=""
        method="POST"
        class="form login"
        @submit.prevent="companyEdit"
      >
        <div class="form__field">
          <label for="login__name"
            ><img
              class="icon"
              src="@/assets/img/register/companyName.svg"
            /><span class="hidden">Name</span></label
          >
          <input
            type="text"
            v-model="name"
            class="form__input"
            :placeholder="name"
            required
          />
        </div>

        <div class="form__field">
          <label for="login__password"
            ><img class="icon" src="@/assets/img/login/loginPw.svg" /><span
              class="hidden"
              >Password</span
            ></label
          >
          <input
            type="password"
            v-model="password"
            class="form__input"
            placeholder="비밀번호"
            required
          />
        </div>
        <div class="form__field">
          <label for="login__password"
            ><img class="icon" src="@/assets/img/login/loginPw.svg" /><span
              class="hidden"
              >Password</span
            ></label
          >
          <input
            type="password"
            v-model="checkpassword"
            class="form__input"
            placeholder="비밀번호 확인"
            required
            @keyup="checkPw"
          />
        </div>

        <div v-html="pwMsg"></div>

        <div class="form__field">
          <label for="login__address"
            ><img
              class="icon"
              src="@/assets/img/register/companyAddr.svg"
            /><span class="hidden">Address</span></label
          >
          <input
            type="text"
            v-model="address"
            class="form__input"
            placeholder="주소"
            required
            v-if="addrShow"
            readonly
            @click="editAddr"
          />
          <input
            type="button"
            value="주소 검색"
            v-if="!addrShow"
            @click="showModal"
          />
        </div>

        <modal name="postcodeModal" :height="455">
          <vue-daum-postcode
            @complete="onComplete"
            style="height: 455px; overflow: scroll;"
          />
        </modal>

        <div class="form__field" >
          <label for="login__tel"><img class="icon" src="@/assets/img/register/companyTel.svg"><span class="hidden">PhoneNumber</span></label>
          <input type="tel" v-model="tel" class="form__input" @keyup="insertDash" :maxlength="max" :placeholder="tel" required>
        </div>

        <div class="form__field">
          <label for="login__logImg"
            ><img
              class="icon"
              src="@/assets/img/register/companyLogo.svg"
            /><span class="hidden">Logo</span></label
          >
          <input type="file" class="form__input" placeholder="업체 로고" />
        </div>

        <div class="form__field">
          <label for="login__comId"
            ><img class="icon" src="@/assets/img/register/description.svg" /><span
              class="hidden"
              >description</span
            ></label
          >
          <input
            type="text"
            v-model="desc"
            class="form__input"
            :placeholder="desc"
          />
        </div>

        <div class="form__field">
          <input type="submit" value="Register" />
        </div>

        <p class="text--center">
        탈퇴하시겠습니까? &nbsp;&nbsp;<a href="#" class="signout" @click="signout">탈퇴하기</a>
      </p>

      </form>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
var company = JSON.parse(sessionStorage.getItem("company"));

export default {
  name: "CompanyEdit",
  data() {
    return {
      name: "",
      pwMsg: "",
      pwFlag: false,
      password: "",
      checkpassword: "",
      address: "",
      addrShow: false,
      comId: "",
      tel: "",
      imgSrc:"",
      desc:"",
      max: 13,
    };
  },mounted(){
    console.log(company);
    this.name = company.name;
    this.address = company.address;
    this.comId = company.comId;
    this.tel = company.tel;
    this.imgSrc = company.imgSrc;
    this.desc = company.desc;

  },
  methods: {
    companyEdit: function() {
      if (this.pwFlag == true) {
        axios
          .put("http://localhost:7777/company", {
            name: this.name,
            comId: this.comId,
            password: this.password,
            address: this.address,
            tel: this.tel
          })
          .then(response => {
            this.condata = response.data;
            alert("회원정보가 수정되었습니다.");
            //location.href = "http://localhost:9999";
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert("입력한 정보를 다시 한번 확인해주세요.");
        //console.log(this.idFlag+","+this.pwFlag+","+this.name+","+this.comId+","+this.password+","+this.address+","+this.tel);
      }
    }, //~companyRegister
    checkPw: function() {
      if (this.password == this.checkpassword) {
        this.pwFlag = true;
        this.pwMsg = "";
      } else {
        this.pwMsg = "<p style='color:red;'>입력하신 비밀번호와 다릅니다.</p>";
        this.pwFlag = false;
      }
    }, //~checkPw
    showModal: function() {
      this.$modal.show("postcodeModal");
    },
    onComplete(data) {
      this.address = data.address;
      this.addrShow = true;
      this.$modal.hide("postcodeModal");
    },
    editAddr: function() {
      this.$modal.show("postcodeModal");
    },
    insertDash(){
        if(this.tel.length == 3 || this.tel.length == 8) this.tel = this.tel+"-"
      }
  },signout(){

  }
};
</script>
<style scpoed src="@/assets/css/login/CompanyLogin.css"></style>
