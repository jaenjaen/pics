<template>
    <div class="publicSpace">
        <div id="month_header">
            <img src="@/assets/img/util/backward.svg"><span>
                <vue-monthly-picker
                v-model="month"
                dateFormat="MM월"
                :clearOption="false">
                </vue-monthly-picker>
                </span><img src="@/assets/img/util/forward.svg">
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
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import VueMonthlyPicker from 'vue-monthly-picker'

let today = new Date();

export default {
    name:"ReservationList",
    components:{
        VueMonthlyPicker
    },
    data(){
        return{
            custId: JSON.parse(sessionStorage.getItem("customer")).custId,
            month:today+"",
            resvList:[],
        }
    },
    mounted(){
        axios.get("http://localhost:7777/customer/reservation/expired/"+this.custId)
        .then(res=>{
            console.log(res.data);
            this.resvList = res.data;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style scoped src="@/assets/css/mypage/reservation_list.css"/>