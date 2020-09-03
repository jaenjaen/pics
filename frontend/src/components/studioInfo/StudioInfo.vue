   
<template>
  <div class="container">
      <!-- ==============  메인 이미지 : carousel ============== -->
      <header id="main-images-section">
        <div class="row" v-for="(mainImg,index) in mainImgList" v-bind:key="index">
          <carousel :itmes="1" :loop="true" :autoplay="true" >
            <div>
               <img class="item" 
               data-merge="3" 
               :src="imgUrl(mainImg)" 
               width="100%" height="500" 
               accept-charset="utf-8"/>
            </div>
           </carousel>
         </div> 
      </header>
      <hr/>

       <nav>
         <div class="tabs-field">
           <div class="row">
            <span class="nav-tab"><a href="#Studio-Filter-Table">상세보기</a></span>
            <span class="nav-tab"><a href="#article-review-area">리뷰보기</a></span>
          </div>
        </div>
      </nav>
       <hr/>
      <section align="left">
          <!-- 태그 -->
        <div class = "section-tag-field">
          <span id="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
              <button class="tag-btn"><span>#</span>{{tag.tagName}}</button>
            </span>
        </div>
        <br>
          <!-- 타이틀 -->
        <div class="section-title-field" v-for="(studio,index) in studios" v-bind:key="index">
          <div class="studio-name">
            <h2> {{ studio.name }}</h2>
          </div>
          <div id="company-of-studio">
                <!-- <span><img :src="imgUrl(studio.company.logoImg)" width="10%" height="20px"/></span> -->
                <span>{{studio.company.name}}</span>
            </div>
          </div> 
          <br>
          <div>
          <!-- 찜하기, 공유하기, 누적 이용자 수 -->
          <span>
          <button class="bookmark-btn" @click.prevent="bookmarkChange()" :v-model="bookmarkCheck">
            찜
            <img src="@/assets/img/util/fullheart.svg" v-if="bookmarkCheck>0" alt />
            <img src="@/assets/img/util/heart.svg" v-else alt width="10%"/>
          </button>
          </span>          
          <span>
          <a class="waves-effect waves-light btn-small" @click="shareUrl()">
            <i class="material-icons">share</i>
              <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" width="10%"/> 
          </a>
          </span>

            <!-- 누적 이용자 수 -->
            <span>
            {{this.accCustomer}}명
            </span>
          </div>        
        </section>
      <hr/>  
        <!-- ============== Reservation ============== -->
      <div class =article-Filterstudiormation-map-area>
        <Reservation></Reservation>
      </div>
        <!-- ============== Studio Filter ============== -->
      <hr>
      <article>
          <div class="article-Filterstudiormation-area" v-for="(studio,index) in studios" v-bind:key="index">
            <div>
              <table id="Studio-Filter-Table">
                <tr>
                  <td>넓이</td>
                  <td>{{ studio.studioFilter.size}}m<sup>2</sup>
                  ({{ studio.studioFilter.size |sizeUnit}}/평)</td>
                </tr>
                <tr>
                  <td>옵션</td>
                  <td>{{studio.options}}</td>
                </tr>
                <tr>
                  <td>주차</td>
                  <td>{{studio.studioFilter.parking|parking}}</td>
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
                  <td>{{studio.studioFilter.excharge|currency}}</td>
                </tr>
              </table>
            </div>
          </div>
          
        <!-- ============== Description ============== -->
             
        <div class="article-Description-area">
           <hr/>  
          <div class="studio-rule" v-for="(studio,index) in studios" v-bind:key="index">
          <h4>Studio 이용 수칙</h4>
          <p>{{ studio.rule }}</p>
          </div>
          <div>
          <h4>Studio 소개글</h4>
          <p>{{ studio.description }}</p>
          </div>
        </div>
        <hr>
        <!-- ============== Portfolio Images ============== -->
        <table aligh="center" width="100%">
        <tr class="article-portfolio-area"  v-for="(portImg,index) in portImgList" v-bind:key="index">
          <!-- <td style="list-style-type:none"><img :src="imgUrl(portImg)" width="80%" height="400px"/></td><br> -->
        </tr>       
        </table>
        
        <!-- ============== Map ============== -->
          <div id="map">
            <!-- <daum-map width="80%"></daum-map> -->
          </div>
        <hr />
        <!-- ============== Chart & Graph ============== -->
        <div class="article-Chart-area" border="2">
          <div style="width:500px;heigth:500px">
           <!--   도넛 그래프 -->
					 <div id="canvas-holder" style="width:100%">
						<div class="chartjs-size-monitor">
							<div class="chartjs-size-monitor-expand">
								<div class=""></div>
							</div>
							<div class="chartjs-size-monitor-shrink">
								<div class=""></div>
							</div>
						</div>
              <canvas id="doughnut-chart-area" width="80%" height="400" class="chartjs-render-monitor"> -->
                <ChartGender>
                  : Chart Data = GenderData
                </ChartGender>  
              </canvas>
					</div> 
          </div> 
        </div>
        		
				 	 <!-- 히스토그램 연령대 -->
					<!-- <div id="canvas-holder" style="width:100%">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <p></p>
              <canvas id="hist-canvas" style="display: block; height: 30%; width: 100%;" width="100%" height="100%" class="chartjs-render-monitor"></canvas>
            </div>
          </div> -->
        

        <!-- ============== Review ============== --> 
        <div class="article-review-area" id="article-review-area" v-if="(reviews+'').length>0">
          <div v-for="review in reviews" v-bind:key="review.reviewId">
           <div>
              <hr>
              <h4>리뷰보기</h4>
                <div class="card-content" id="reviews" >
                  <div>
                    <!-- <span id="reviewr-img"><img :src="imgUrl(review.costomer.srcImg)"></span>  -->
                    <!-- <span id="reviewr-email"><strong>{{ review.cusomer.email|emailHide }}</strong></span> -->
                    <span id="register-date">({{ review.regDate}})</span>
                  </div>
                    <!-- 별점 부분 -->
                    <span id="star"> 별점
                      <span v-if="review.score > 0 && review.score < 1">
                        <i class="material-icons" id="icon_filter">star_half</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score == 1">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score > 1 && review.score < 2">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score == 2">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score > 2 && review.score < 3">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score == 3">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span v-if="review.score > 3 && review.score < 4">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                      </span>
                      <span v-if="review.score == 4">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                      </span>
                      <span v-if="review.score > 4 && review.score < 5">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                      </span>
                      <span v-if="review.score == 5">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                      </span>              
                      <span v-if="review.score == 0">
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                    </span>
                </div>
                <div>
              <div id="content">{{ review.content }}</div>   
              <div><a href="#answer" v-if="review.answer!=null"> 답글보기</a> </div>    
            </div>
            <div id="no-review" v-if="(reviews+'').length==0"><h3>"아직 등록된 리뷰가 없습니다!"</h3></div>
            <div id=answer v-if="review.answer==null">
                <div>{{ review.answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- 모달 모아두기 -->
    <!-- <div>
      <modal name="delBook" adaptive="adaptive" resizable="resizable" width="20%" height="30%" :maxWidth=768>
        <div id="delBook">
          <p>찜목록에서 제거했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal name="regBook" adaptive="adaptive" resizable="resizable" width="20%" height="30%" :maxWidth=768>
        <div id="regBook">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
    </div> -->
  </div>
</template>


<script>
import axios from "axios"; //axios
import Vue from 'vue'
import carousel from "vue-owl-carousel"; //캐러셀
import "materialize-css";
// import Chart from 'chart.js'
// import { Doughnut } from "vue-chartjs";
import VModal from 'vue-js-modal'
// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import ChartGender from "@/assets/js/studioInfo/ChartJs.js"
import Reservation from "@/components/studioInfo/Reservation.vue"
// import Map from "@/components/studioInfo/Map.vue"

Vue.use(VModal);
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

export default {
    name: "studio-info",
    components: { carousel, ChartGender, Reservation },
    props: {
        stuId: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            datacollection: null,
            loaded: false,

            // studio 관련 변수 (GET)
            customer: {},
            studios: {
                categoryId: 0,
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: 0,
                studioFilter: {
                    size: 0,
                    options: null,
                    parking: "",
                    unitPrice: 0,
                    defaultCapacity: 0,
                    excharge: 0,
                    address: "",
                    maxCapacity: 0
                },
                company: {
                    comId: 0,
                    name: "",
                    address: ""
                }
            },
            tags: [{
                tagId: 0,
                tagName: ""
            }],
            bookmarkCheck: 0, //북마크 id값 받은 변수
            reviews: [{}],
            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false,

            //이미지 split 변수
            mainImgList: [],
            portImgList: [],
        };
    },

    async mounted() { //async mount로 비동기 처리
        ////////////////////////////// 스튜디오 기본 정보 불러오기  //////////////////////////////
        this.customer = JSON.parse(sessionStorage.getItem('customer'));
        console.log("this.stuId : " + this.stuId);
        axios
            .get("http://127.0.0.1:7777/studio/info/" + this.stuId)
            .then(response => {
                this.studios = response.data;
                //메인 이미지 split
                this.mainImgList = this.studios[0].mainImg.split(',');
                this.portImgList = this.studios[0].portImg.split(',');
                console.log("this.portImgList : " + this.portImgList);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

        axios
            .get("http://127.0.0.1:7777/studio/tags/" + this.stuId)
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.tags : " + this.tags);
        axios
            .get("http://127.0.0.1:7777/studio/accCustomer/" + this.stuId)
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.accCustomer : " + this.accCustomer);
        axios
            .get("http://127.0.0.1:7777/studio/reviews/" + this.stuId)
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        console.log("this.reviews[0].reviewId : " + this.reviews[0].reviewId);
        if (this.customer != undefined) {
            axios
                .get("http://127.0.0.1:7777/studio/getBookmark/" + this.customer.custId + "/" + this.stuId)
                .then(response => (this.bookmarkCheck = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("this.bookmarkCheck : " + this.bookmarkCheck);
        }
        // this.fillData;
        // await this.getGenderData();
        ////////////////////////////// Chart & Graph //////////////////////////////

        // this.$nextTick(() => {
        //     var ctx = document.getElementById('doughnut-chart-area').getContext('2D');
        //     var config = {
        //         type: 'Doughnut',
        //         data: {
        //             datasets: [{
        //                 data: [20, 30],
        //                 backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
        //                 label: "Gender Ratio"
        //             }],
        //             labels: ["Female", "Male"]
        //         },
        //         options: {
        //             responsive: true,
        //             legend: {
        //                 position: "top"
        //             },
        //             title: {
        //                 display: true,
        //                 text: "Gender Ratio"
        //             },
        //             animation: {
        //                 animateScale: true,
        //                 animateRotate: true
        //             }
        //         }
        //     }

        //     new Chart(ctx, config);
        // })
    },
    filters: {
        currency: function(value) { // 숫자를 금액 형식으로
            if (!isNaN(value)) return value.toLocaleString();
            else return 0;
        },
        parking: function(value) {
            if (value) return "주차 가능";
            else return "주차 불가";
        },
        sizeUnit(size) { //m^2 >> 평 단위
            return (size * 0.3025).toFixed(1);
        },
        emailHide(value) { //이메일 아이디 가리기
            var id = value.split("@");
            if (id.length < 5) {
                return id + "****님"
            } else {
                return id.slice(0, 4) + "****님"
            }
        },
    },
    ////////////////////////////// Methods //////////////////////////////
    methods: {
        // filltData() {
        //     this.datacollection = {
        //             datasets: [{
        //                 data: [10, 10],
        //                 backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
        //                 label: "Gender Ratio"
        //             }],
        //             labels: ["Female", "Male"]
        //         },
        //         console.log("datacollection 지나서");

        //     this.total = this.result.length;
        //     this.female = 0;
        //     for (var i = 0; i < this.result.length; i++) {
        //         if (this.result[i].gender == "F") {
        //             this.female++;
        //         }
        //     }
        // },
        // getGenderData() {
        //     axios
        //         .get("http://127.0.0.1:7777/studio/genderRatio/" + this.stuId)
        //         .then(response => {
        //             this.result = response.data;
        //             this.total = this.result.length;
        //             this.female = 0;
        //             // console.log("result : " + this.result + ", this.total : " + this.total)
        //             // var female=0;
        //             for (var i = 0; i < this.result.length; i++) {
        //                 if (this.result[i].gender == "F") {
        //                     //여자 수만큼 세기
        //                     this.female += 1;
        //                 }
        //             }
        //             this.fillData();
        //             console.log("aaa1");
        //             this.$set(this.datacollection.datasets[0].data, 0, this.female);
        //             this.$set(this.datacollection.datasets[0].data, 1, this.total);
        //             this.filltData()
        //             console.log("aaa2");

        //             // this.renderChart(this.datacollection, this.options);
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             this.errored = true;
        //         })
        //         .finally(() => {
        //             this.loading = false;
        //         });
        // },
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        bookmarkChange() {
            if (this.bookmarkCheck != 0) { //찜한적 있다면 찜 목록 해제 
                axios
                    .delete("http://127.0.0.1:7777/bookmark/" + this.bookmarkCheck)
                    .then(() => {
                        this.bookmarkCheck = 0;
                        this.$modal.show("delBook");
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            } else { //찜한적 없다면 찜 목록 등록
                let bookmark = {
                    studio: {
                        stuId: this.stuId
                    },
                    customer: {
                        custId: this.customer.custId
                    }
                };
                axios
                    .post("http://127.0.0.1:7777/bookmark/", bookmark)
                    .then(() => {
                        this.$modal.show("regBook");
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
        },
        isEmpty(value) {
            if (value == "" || value == null || value == undefined || (value != null &&
                    typeof value == "object" && !Object.keys(value).length)) {
                return true
            } else return false
        }



        ////////////////////////////// Chart & Graph Methods //////////////////////////////
        // chartData: function() {
        //     var customer = this.customers;
        //     this.total = customer.length;
        //     this.female = 0;
        //     for (var i = 0; i < this.total; i++) {
        //         if (this.customers[i].gender == "F") {
        //             this.female++;
        //         }
        //     }
        //     this.$set(this.datacollection.datasets[0].data, 0, this.female);
        //     this.$set(this.datacollection.datasets[0].data, 1, this.total);
        // }
    }
};
</script>

<style scoped>
@import '~material-design-icons/iconfont/material-icons.css';
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic");

@media screen and (max-width: 768px) {
    #app {
        width: 100%;
    } 
}
.body{
  background: white;
}
.container {
    width: 768px;
    margin: auto 20em 0 10em 0;
    
}

#main-images-section {
    width: 100%;
    margin: auto;
}

.tag-list {
    padding: 0.5%;
}

.tabs-field {
    width: 100%;
    height: 50;
}

.nav-tab {
    margin: 20%;
    list-style-type: none;
    display: inline;
}

article {
    width: 100%;
    float: left;
    
    margin-bottom: 10em;
}

#Studio-Filter-Table {
    float:left;
    width: 50%;
    border-top: 2px solid #5a5a5a;
    border-collapse: collapse;
}

#Studio-Filter-Table td {
    text-align: right;
    border-bottom: 1.5px solid #bbb5b5;
    padding: 10px;
}

#map {
    float:left;
    margin-left: 5%;
    width: 40%;
    height: 40%;
    border: 1px solid green;
}
.article-Description-area{
  clear: both;
  text-align: left;
}


.tag-btn{
    
    background-color: #029BE0;
    border: none;
    color:#fff;
    padding: 5px 5px 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 4px;
    cursor: pointer;
    border-radius:5px;
}
.tag-btn:hover {
    background-color: white;
    color:#029BE0;
    border:1.5px solid lightgray;
}
.article-review-area{
  text-align: left;
}
.card-content{
  border:1px solid lightgray;
  border-radius:10px;
  padding:2%;
  box-shadow:2px 2px 1.5px lightgray;
}
#reviewr-img{
  width:10px;
  height:10px;
}
#reviewr-email{
  color:lightgray;
}
#no-review{
  align-content: center;
  border:1px solid lightgray;
  border-radius:10px;
  padding:2%;
  box-shadow:2px 2px 1.5px lightgray;
}
#answer{
  border:1px solid lightgray;
  border-radius:10px;
  padding:2%;
  box-shadow:2px 2px 1.5px lightgray;
}

</style>
