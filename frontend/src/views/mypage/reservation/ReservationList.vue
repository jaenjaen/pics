<template>
  <div class="publicSpace">
    <div id="month_header">
      <button @click="beforeMonth">
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
      <button @click="afterMonth">
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
let monthList = [4, 6, 9, 11];

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
  methods: {
    changeMonth() {
      var yyyy = new Date(this.month).getFullYear();
      var mm = new Date(this.month).getMonth() + 1;
      var startDate = yyyy + "-" + mm + "-" + 1;
      var endDate = "";
      if (mm == 2) endDate = yyyy + "-" + mm + "-" + 28;
      else if (monthList.indexOf(mm) >= 0) endDate = yyyy + "-" + mm + "-" + 30;
      else endDate = yyyy + "-" + mm + "-" + 31;
      console.log(startDate + " and " + endDate);
      axios
        .get("http://localhost:7777/customer/reservation/expired/" + this.custId + "/" + startDate + "/" + endDate)
        .then(res => {
          this.resvList = res.data;
          this.emptyFlag = false;
          //console.log(res.data);
          if (res.data == "") this.emptyFlag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeMonth() {
      var startDate = "";
      var endDate = "";
      var mm = 12;
      //console.log(this.month);//2020-6
      if (this.month == today + "") {
        if(today.getMonth() == 0) {today = new Date((today.getFullYear()-1)+"-"+12+"-"+today.getDate());
        console.log(today);}
        else mm = today.getMonth()

        this.month = today.getFullYear() + "-" + mm + "-" + today.getDate();
        startDate = today.getFullYear() + "-" + mm + "-" + 1;
        if (today.getMonth() == 2) endDate = today.getFullYear() + "-" + mm + "-" + 28;
        else if (monthList.indexOf(today.getMonth()) >= 0) endDate = today.getFullYear() + "-" + today.getMonth() + "-" + 30;
        else endDate = today.getFullYear() + "-" + today.getMonth() + "-" + 31;
      } else {
        var tmpDate = new Date(this.month);
        console.log(tmpDate.getMonth());
        if(tmpDate.getMonth() == 0) {tmpDate = new Date((tmpDate.getFullYear()-1)+"-"+12+"-"+tmpDate.getDate());
        console.log(tmpDate);}
        else mm = tmpDate.getMonth();

        this.month = tmpDate.getFullYear() + "-" + mm + "-" + tmpDate.getDate();
        startDate = tmpDate.getFullYear() + "-" + mm + "-" + 1;
        if (today.getMonth() == 2) endDate = tmpDate.getFullYear() + "-" + mm +"-"+ 28;
        else if(monthList.indexOf(today.getMonth())>=0) endDate = tmpDate.getFullYear() + "-" + mm + "-"+30;
        else endDate = tmpDate.getFullYear() + "-" + mm + "-" + 31;
        }
      axios.get("http://localhost:7777/customer/reservation/expired/"+this.custId+"/"+startDate+"/"+endDate)
      .then(res=>{
        this.resvList = res.data;
        this.emptyFlag =false;
        console.log(res.data);
        if(res.data == "") this.emptyFlag =true;
      })
      .catch(err=>{
        console.log(err);
      });
    },//~beforeMonth
    afterMonth(){
      var startDate = "";
      var endDate = "";
      var mm = 1;
      //console.log(this.month);//2020-6
      if (this.month == today+""){
        if(today.getMonth() == 11) {today = new Date((today.getFullYear()+1)+"-"+1+"-"+today.getDate());
        console.log(today);}
        else mm = today.getMonth()+2

        this.month = today.getFullYear()+"-"+mm+"-"+today.getDate();
        startDate = today.getFullYear()+"-"+mm+"-"+1;

        if(today.getMonth() == 2) endDate = today.getFullYear()+"-"+mm+"-"+28;
        else if(monthList.indexOf(today.getMonth())>=0) endDate = today.getFullYear()+"-"+mm+"-"+30;
        else endDate = today.getFullYear()+"-"+mm +"-"+31;
      }
      else {
        var tmpDate = new Date(this.month);
        if(tmpDate.getMonth() == 11) {tmpDate = new Date((tmpDate.getFullYear()+1)+"-"+1+"-"+tmpDate.getDate());
        console.log(tmpDate);}
        else mm = tmpDate.getMonth()+2
        this.month = tmpDate.getFullYear()+"-"+mm+"-"+tmpDate.getDate();

        startDate = tmpDate.getFullYear()+"-"+mm+"-"+1;

        if(today.getMonth()+1 == 2) endDate = tmpDate.getFullYear()+"-"+mm+"-"+28;
        else if(monthList.indexOf(today.getMonth()+1)>=0) endDate = tmpDate.getFullYear()+"-"+mm+"-"+30;
        else endDate = tmpDate.getFullYear()+"-"+mm+"-"+31;
        }
      axios.get("http://localhost:7777/customer/reservation/expired/"+this.custId+"/"+startDate+"/"+endDate)
      .then(res=>{
        this.resvList = res.data;
        this.emptyFlag =false;
        //console.log(res.data);
        if(res.data == "") this.emptyFlag =true;
      })
      .catch(err=>{
        console.log(err);
      });

    }//~aftermonth
  }
};
</script>

<style scoped src="@/assets/css/mypage/reservation_list.css" />
