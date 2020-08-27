
<template>
  <div id="container">
      <!-- ==============  메인 이미지 : jumbo, carousel ============== -->
      <section id="main-images-section">
        <div class="row" v-for="(studio,index) in studios" v-bind:key="index">
        <!-- <carousel navigationEnabled="true" navigationPrevLabel navigationNextLabel>  
            <Slide
                data-index="0"
                data-name="MySlideName"
                @slideclick="handleSlideClick">
              <img :src="studio.mainImg">
            </Slide>
         </Carousel> -->
        </div> 
      </section>

      <hr />

      <nav>
        <div id="studio-review-navigation">
          <div>
            <span id="tab-home" md-label="Home" to="/components/tabs" exact>
              스튜디오 상세
            </span>

            <span id="tab-pages" md-label="Pages" to="/components/tabs/pages">
              리뷰 보기
            </span>
          </div>
        </div>
        <hr />
      </nav>
      <article v-for="studio in studios" v-bind:key="studio.stuId">
        <!-- ============== Title ==============  -->
        <div class=" article-title-area">
          <hr />
          <h2>{{ studio.name }}</h2>
          <div class="bookmark-check">
            <button v-html="bookmark_check" @click="bookmarkChange">
            </button>
            
          </div>
          <div id="company-of-studio ">
            <span><img :src="studio.company.logoImg"/></span>&nbsp;<span>{{studio.company.name}}</span>
          </div>
          <ul class="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
            <li style="list-style:none">{{ tag.tagName }}</li>
          </ul>
        </div>

        <!-- ============== Studio Filter ============== -->
        <div>
          <div class="article-Filterstudiormation-area">
            장소 소개
            <table id="Studio-Filter-Table ">
              <tr>
                <td>넓이</td>
                <td>{{ studio.studioFilter.size }}</td>
              </tr>
              <tr>
                <td>옵션</td>
                <td>{{ studio.studioFilter.options }}</td>
              </tr>
              <tr>
                <td>주차</td>
                <td>{{studio.studioFilter.parking}}</td>
              </tr>
              <tr>
                <td>수용 인원</td>
                <td>
                  기본 {{studio.studioFilter.defaultCapacity}} 명 ~ 최대
                  {{ studio.studioFilter.maxCapacity }} 명
                </td>
              </tr>
              <tr>
                <td>인원 초과 시 추가비용</td>
                <td>{{studio.studioFilter.excharge}}</td>
              </tr>
            </table>
          </div>
          <!-- ============== Map ============== -->
          <div id="map"></div>
        </div>
        <hr />
        <!-- ============== Description ============== -->
        <div class="article-Description-area">
          <h4>Studio 소개글</h4>
          <p>{{ studio.rule }}</p>
          <p>{{ studio.description }}</p>
        </div>
        <hr />
        <!-- ============== Review ============== -->
        <h4>Reviews</h4>
        <div class="article-review-area">
          <table id="list_table">
            <tbody v-for="review in reviews" v-bind:key="review.reviewId">
              <tr>
                <td>작성자 Id</td>
                :
                <td v-html="review.customer.email"></td>
              </tr>
              <tr>
                <td>리뷰</td>
                :
                <td v-html="review.content"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

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
                     <input type="date" id="start_date" name="start_date" v-model="reservation.start_date" required="required">
                    </div>
                    <br>
                    <br>
                    <div class="date-input-field"> 
                     대여 종료 일자
                     <input type="date" id="end_date" name="end_date"  v-model="reservation.end_date" required="required">
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
                <option v-for="option in options" v-bind:key="option" required="required">{{options[option-1]}}</option>
              </select>
              <br>
              종료 시간 선택
              <select v-model="end_time" >
                <option disabled value="예약 시작 시간"></option>
                <option v-for="option in options" v-bind:key="option">{{options[option-1]}}</option>
              </select>              
            </div>
            <div>
            <button type="click" @click.prevent="totalPriceCalculate()"> </button>
            <div v-for="stuio in studios" v-bind:key="stuio.stuId">
              총금액 :{{reservation.total_price}}
              단가 : {{studio.studioFilter.unitPrice}}
              날짜 차이 : {{difTime}}
            </div>
              <!-- (일자/24+일자%24)*unitPrice +(max_pep-default_pep)*excharge -->
            </div>
            <!-- <button type="submit" @click="checkReservationDuplicate">예약하기</button> -->
          </form>
        </div>
      </aside>
  </div>
</template>

<script scoped>
import axios from "axios";
// import { Carousel, Slide } from 'vue-carousel';
// import 'materialize-css/dist/css/materialize.min.css'
// import M from "materialize-css/";
export default{
  name: "studio-info",
  data(){
        return{
        // studio 객체 변수
        studios: [],
        tags: [],
        reviews: [],
        bookmark_check:0,
        reservation:{
        start_date:"",
        end_date:"",
        total_people:1,
        total_price:0,
        },
        //날짜 계산 변수
        start_time:Date.now(),
        end_time:Date.now(),
        difTime:0,
        options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        // 기본 변수
        loading: true,
        errored: false
        };
      },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/studio/info/10')
            .then(response => {
              this.studios = response.data;
            })
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
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        },
    methods: {
        bookmarkChange(){
            if(this.bookmark_check==1) this.bookmark_check=0
            else this.bookmark_check=1
        }
        ,deletePeople() {
            if (this.reservation.total_people > 1) this.reservation.total_people--;
            else {
                alert("최소 1명 이상 선택해주세요.");
            }
        }
        ,addPeople() {
            if (this.reservation.total_people < parseInt(document.getElementById("maxCapacity").value))
                this.reservation.total_people++;
            else {
                alert("최대 인원을 초과했습니다.")
            }
        },
        handleSlideClick (dataset) {
          console.log(dataset.index, dataset.name)
       }  
      ,datePicker() {// 날짜 숫자로 받고 시작일과 마지막날 계산
      if (this.start_date.length > 0 & this.end_date.length > 0) {
        //alert(this.end_date+","+this.start_date+","+this.start_time+","+this.end_time);   
        typeof(this.start_date)
          }
        },
        totalPriceCalculate() {
        // 1. 일자 >> 시간대로 변경
        var startDate =this.reservation.start_date.split("-");
        var endDate =this.reservation.end_date.split("-");
        var startDateList=(new Date(startDate[0], startDate[1], startDate[2])).getTime();
        var endDateList=(new Date(endDate[0], endDate[1], endDate[2])).getTime();
        this.difTime=(endDateList-startDateList)/(60*60*1000);
        // 2. 끝나는 일자가 항상 시작일보다 크게, 예약 일자는 현재 일자 이후로
        if(this.difTime<0){
          alert("대여 종료일을 시작일 이후로 설정하세요.");
          this.reservation.endDate.html(this.reservation.startDate);
        }else if(startDateList<Date.now()){
          alert("대여 시작일은 현재 날짜 이후로 가능합니다.");
          this.reservation.endDate.html(this.reservation.startDate);
        }else{
        // 3. 시간 계산 : 끝나는 시간이 시작 시간보다 작으면 끝나는 일자 다 계산하고 빼기
        if(this.start_time>=this.end_time.getTime)
          this.difTime-=(this.end_time-this.start_time);
        else this.difTime+=(this.end_time-this.start_time);
        }
        // 4. 시간 * (unitPrice + excharge*초과 인원수)
        this.reservation.total_price
        =this.difTime*(this.studios.studioFilter.unitPrice
        +this.studios.studioFilter.excharge
        *(this.studioFilter.maxCapacity-this.studioFilter.defaultCapacity))
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
