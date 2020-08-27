<template>
  <div id="container">
      <!-- ============== Reservation ============== -->
      <aside>
        <div id="reservation-floating-banner">
          <form id=" reservation-form">
            <!-- ============== calender ============== -->
        <!-- 날짜 -->
            <div class="row">
              <div class="col s12 m3"></div>
                <div class="col s12 m6">
                  <form>
                    <div class="date-input-field"> 
                     대여 시작 일자
                     <input type="date" id="start_date" name="start_date" v-model="start_date" required="required">
                    </div>
                    <br>
                    <br>
                    <div class="date-input-field"> 
                     대여 종료 일자
                     <input type="date" id="end_date" name="end_date"  v-model="end_date" required="required">
                    </div>
                  </form>
                </div>
              <div class="col s12 m3"></div>
            </div>
           <hr/>
            <div>
              시작 시간 선택
              <select v-model="start_time" >
                <option disabled value="예약 시작 시간"></option>
                <option v-for="time in times" v-bind:key="time" required="required">{{times[time-1]}}</option>
              </select>
              <br>
              종료 시간 선택
              <select v-model="end_time" >
                <option disabled value="예약 시작 시간"></option>
                <option v-for="time in times" v-bind:key="time">{{times[time-1]}}</option>
              </select>              
            </div>
            <div>
            <!-- <button type="click" @click.prevent="totalPriceCalculate()"> </button> -->
            <div>
              <!-- <span id="unitPrice">시간 당 비용 : {{studio.studioFilter.unitPrice}}</span>
              <span id="unitPrice">인원 추가 비용 : {{studio.studioFilter.excharge}}</span> -->
              <span id="totalPrice">총금액 : {{totalPriceCalculate}}</span>
              
            </div>
              <!-- (일자/24+일자%24)*unitPrice +(max_pep-default_pep)*excharge -->
            </div>
            <!-- <button type="submit" @click.prevent="reserve">예약하기</button> -->
          </form>
        </div>
      </aside>
  </div>
</template>

<script scoped>
// import jquery from "jquery";
// import $ from "jquery";
import axios from "axios";
// import vSelect from 'vue-select';
import loadScriptOnce from 'load-script-once'
export default{
  name: "studio-info",
  data:function(){
        return{
        // studio 관련 변수 (GET)
        studios: {
            },
        tag: [{
          tagName: ''
          }],
        reviews: [],
        bookmark_check:0,
        accCustomer:0,

        //기존 예약 관련 변수 (GET)
        reservation:{
        // 나중에 정리하고 하기 내용지우기
        // resId=0,
        // startDate:"",
        // endDate:"",
        // totalPeople:1,
        // totalPrice:0,
        },

        //새로운 예약 관련 변수(POST)
        start_date:"",
        end_date:"",
        total_people:1,
        total_price:0,
        start_time:Date.now(),
        end_time:Date.now(),
        times: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        
        // 상태 체크 변수
        loading: true,
        errored: false
        }
      },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/studio/info/10')
            .then(response => (this.studios = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)  
        axios
            .get('http://127.0.0.1:7777/studio/tags/10')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)  
        axios
            .get('http://127.0.0.1:7777/studio/bookmark/3/10')
            .then(response => (this.bookmark_check = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/reviews/10')
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
                    axios
          .get('http://127.0.0.1:7777/studio/accCustomer/10')
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
          .get('http://127.0.0.1:7777/studio/reservation/3/10')
          .then(response => (this.reservation = response.data))
          .catch(error => {
              console.log(error);
              this.errored = true
          })
          .finally(() => this.loading = false)
      },
      filters: {
                priceFormet(value) {
                    return value.toLocaleString();
                }
            },
          computed: {
          totalPriceCalculate: function(){
          var total_price=0;
          // 1. 일자 >> 시간대로 변경
          var startSplit =this.start_date.split("-");
          var endSplit =this.end_date.split("-");
          var startDateList=(new Date(startSplit[0], startSplit[1], startSplit[2])).getTime();
          var endDateList=(new Date(endSplit[0], endSplit[1], endSplit[2])).getTime();
          var difTime=(endDateList-startDateList)/(60*60*1000);
          
          // 2. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후로
          if(difTime<0){
            alert("대여 종료일을 시작일 이후로 설정하세요.");
            document.getElementById("end_date").html(this.reservation.startDate);
          }else if(startDateList<Date.now()){
            alert("대여 시작일은 현재 날짜 이후로 가능합니다.");
            document.getElementById("end_date").html(Date.now());
          }else{
          // 3. 시간 계산 : 끝나는 시간이 시작 시간보다 작으면 끝나는 일자 다 계산하고 빼기
          if(this.start_time>=this.end_time.getTime)
            difTime-=(this.end_time-this.start_time);
          else difTime+=(this.end_time-this.start_time);
          }
          // 4. 시간 * (unitPrice + excharge*초과 인원수)
          total_price=difTime*(this.studios.unitPrice+this.studios.excharge*(this.studios.maxCapacity-this.studios.defaultCapacity));
          console.log(this.start_date+","+endDateList+","+startDateList+","+difTime+","+this.start_time+","+this.end_time+","+this.studios.maxCapacity);
          return total_price+","+difTime+","+this.studios.maxCapacity
          },
      },
      methods: {
        reserve(){
          
          // 2. 예약 정보 넘기기
          axios
            .post("http://127.0.0.1:7777/studio/reservation", {
              stuId:this.studios.stu_id,
              customer:{
                custId:sessionStorage.key,
                // apiId:sessionStorage.getItem("apiId"),
                // gender:sessionStorage.getItem("gender"),
                // age:sessionStorage.getItem("age"),
                // job:sessionStorage.getItem("job"),
                // funnel:sessionStorage.getItem("funnel"),
                // email:sessionStorage.getItem("email"),
                // tel:sessionStorage.getItem("tel"),
                // apiKey:sessionStorage.getItem("apiKey"),
                // imgSrc:sessionStorage.getItem("imgSrc")  
                },
            startDate:this.start_date+" "+this.start_time,
            endDate:this.end_date+" "+this.end_time,
            totalPrice:this.total_price,
            totalPeople:this.total_people
          })
          .then(response => {
            alert(response.data+"건 예약이 완료되었습니다. 마이페이지에서 예약 내역을 확인하세요.")
            location.href = "#"
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => {
            this.loading = false;
          });
        }
      }   
    }

</script>
<style scoped>
#main-images-section {
    margin: 5% 0 5% 0;
}

article {
    width: 60%;
    float: left;
    border: 1px solid gray;
}

aside {
    width: 35%;
    margin-left: 5%;
    float: left;
    border: 1px solid gray;
}

#map {
    width: 40%;
    height: 40%;
    border: 1px solid green;
}

#Studio-Filter-Table tr td {
    border: 1px solid gray;
}

.carousel-inner img {
    width: 100%;
    height: 550px;
}
#reservation-floating-banner {
    background-color: #F0F0F0;
    position: absolute;
    width: 25%;
    padding: 3px 10px
}
#container{
  width:80%;
}
</style>
