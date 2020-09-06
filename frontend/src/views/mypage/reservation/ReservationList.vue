<template>
  <div class="publicSpace">
    <div id="month_header">
      <button >
        <img src="@/assets/img/util/backward.svg">
      </button>
      <span>
        <vue-monthly-picker
          v-model="month"
          vlaue="month"
          dateFormat="MM월"
          :clearOption="false"
          alignment="center"
          @selected="changeMonth()">
        </vue-monthly-picker>
      </span>
      <button>
        <img src="@/assets/img/util/forward.svg">
      </button>
    </div>
    <div class="list_table">
      <table>
        <tr>
          <th>예약번호</th> <th>예약일자</th> <th>예약업체</th> <th>예약인원</th> <th>결제금액</th>
        </tr>
        <tr v-for="(reservation, idx) in resvList" :key="reservation">
          <td>{{idx+1}}</td> <td>{{reservation.startDate}} <br> ~ <br>{{reservation.endDate}}</td> <td>{{reservation.studio.name}}</td> <td>{{reservation.totalPeople}}</td> 
          <td>{{reservation.totalPrice}}원</td>
        </tr>
        <tr v-if="emptyFlag">
          <td colspan="5"><br>해당 월의 예약이 존재하지 않습니다.</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueMonthlyPicker from 'vue-monthly-picker'

let today = new Date();

export default {
  name: "ReservationList",
  components: {
    VueMonthlyPicker
  },
  data() {
    return {
      custId: JSON.parse(sessionStorage.getItem("customer")).custId,
      month: today + "",
      resvList: [],
      emptyFlag: false
    };
  },
  mounted() {
    if (sessionStorage.getItem("customer") == null){
      alert("로그인 후 접근 가능합니다.");
      location.href = "http://localhost:9999/customerlogin";
    }
    axios
      .get("http://localhost:7777/customer/reservation/expired/"+this.custId)
      .then(res => {
        this.resvList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    changeMonth(){
      var monthList = [4,6,9,11];
      var yyyy = new Date(this.month).getFullYear();
      var mm = new Date(this.month).getMonth()+1;
      var startDate = yyyy+"-"+mm+"-"+1;
      var endDate = "";

      if(mm == 2) endDate = yyyy+"-"+mm+"-"+28;
      else if(monthList.indexOf(mm)>=0) endDate = yyyy+"-"+mm+"-"+30;
      else endDate = yyyy+"-"+mm+"-"+31;
      console.log(startDate+" and "+endDate);
      axios.get("http://localhost:7777/customer/reservation/expired/"+this.custId+"/"+startDate+"/"+endDate)
      .then(res=>{
        this.resvList = res.data;
        console.log(res.data);
        if(res.data == "") this.emptyFlag =true;
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }
};
</script>

<style scoped src="@/assets/css/mypage/reservation_list.css" />
