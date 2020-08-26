<template>
    <div id="container">
        <div id="app">
            <!-- ==============  메인 이미지 : jumbo, carousel ============== -->
            <section id="main-images-section">
                <!-- <div id="demo" class="carousel slide" data-ride="carousel"> -->
                    <!-- 하단 바 -->
                    <!-- <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        <li data-target="#demo" data-slide-to="3"></li>
                    </ul> -->

                    <!-- 이미지 -->
                    <!-- <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="static/img/crawling_images/barcel_1.jpg" alt="barcel_1">
                        </div>
                        <div class="carousel-item">
                            <img src="static/img/crawling_images/barcel_2.jpg" alt="barcel_2">
                        </div>
                        <div class="carousel-item">
                            <img src="static/img/crawling_images/barcel_3.jpg" alt="barcel_3">
                        </div>
                        <div class="carousel-item">
                            <img src="static/img/crawling_images/barcel_4.jpg" alt="barcel_3">
                        </div>
                    </div> -->

                    <!-- 좌우 넘기기 아이콘 -->
                    <!-- <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div> -->
            </section>

            <nav>
                <hr>
                <div id="studio-review-navigation">
                    <span><a href="#">상세보기</a></span>
                    <span><a href="#">리뷰보기</a></span>
                </div>
                <hr>
            </nav>
            <article v-for="studio in studios" v-bind:key="studio.stuId">
                <!-- ============== Title ==============  -->
                <div class=" article-title-area">
                    <hr>
                    <h2>{{studio.name}}</h2>
                    <div class="bookmark-check">
                        <button v-html="bookmark_check" @click="bookmarkChange"></button>
                    <img>
                    </div>
                    <div id="company-of-studio " >
                        <span><img :src="studio.company.logoImg"/></span>&nbsp;<span>{{studio.company.name}}</span>
                    </div>
                    <ul class="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
                        <li style=list-style:none>{{tag.tagName}}</li>
                    </ul>
                </div>

                <!-- ============== Studio Filter ============== -->
                <div>
                    <div class="article-Filterstudiormation-area">
                        장소 소개
                        <table id="Studio-Filter-Table ">
                            <tr>
                                <td>넓이</td>
                                <td>{{studio.studioFilter.size}}</td>
                            </tr>
                            <tr>
                                <td>옵션</td>
                                <td>{{studio.studioFilter.options}}</td>
                            </tr>
                            <tr>
                                <td>주차</td>
                                <td>{{studio.studioFilter.parking}}</td>
                            </tr>
                            <tr>
                                <td>수용 인원</td>
                                <td>기본 {{studio.studioFilter.defaultCapacity}} 명 ~ 최대 {{studio.studioFilter.maxCapacity}} 명</td>
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
                <hr>
                <!-- ============== Description ============== -->
                <div class="article-Description-area">
                    <h4>Studio 소개글</h4>
                    <p>{{studio.rule}}</p>
                    <p>{{studio.description}}</p>
                </div>
                <hr>
                <!-- ============== Review ============== -->
                <h4>Reviews</h4>
                <div class="article-review-area">
                    <table id='list_table'>
                        <tbody v-for="review in reviews" v-bind:key="review.reviewId">
                            <tr>
                                <td>작성자 Id</td> : <td v-html="review.customer.email"></td>
                            </tr>
                            <tr>
                                <td>리뷰</td> : <td v-html="review.content "></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>

            <!-- ============== Reservation ============== -->
             <aside>
                <div id="reservation-floating-banner" v-for="studio in studios" v-bind:key="studio.stuId">
                    <h2>예약하기</h2>
                    <form id=" reservation-form">
                        <!-- 시작일 <input type="text" id="calender-start" name="start_Date" @focus="calenderOpen()" v-model="reservation.start_Date"><br> -->
                        <!-- ============== calender ============== -->
                        <!-- <div id="calender">
                            <v-app id="inspire">
                                <div>
                                <v-sheet
                                    tile
                                    height="54"
                                    color="grey lighten-3"
                                    class="d-flex"
                                >
                                    <v-btn
                                    icon
                                    class="ma-2"
                                    @click="$refs.calendar.prev()"
                                    >
                                    <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                    <v-select
                                    v-model="type"
                                    :items="types"
                                    dense
                                    outlined
                                    hide-details
                                    class="ma-2"
                                    label="type"
                                    ></v-select>
                                    <v-select
                                    v-model="mode"
                                    :items="modes"
                                    dense
                                    outlined
                                    hide-details
                                    label="event-overlap-mode"
                                    class="ma-2"
                                    ></v-select>
                                    <v-select
                                    v-model="weekday"
                                    :items="weekdays"
                                    dense
                                    outlined
                                    hide-details
                                    label="weekdays"
                                    class="ma-2"
                                    ></v-select>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    icon
                                    class="ma-2"
                                    @click="$refs.calendar.next()"
                                    >
                                    <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-sheet>
                                <v-sheet height="600">
                                    <v-calendar
                                    ref="calendar"
                                    v-model="value"
                                    :weekdays="weekday"
                                    :type="type"
                                    :events="events"
                                    :event-overlap-mode="mode"
                                    :event-overlap-threshold="30"
                                    :event-color="getEventColor"
                                    @change="getEvents"
                                    ></v-calendar>
                                </v-sheet>
                                </div>
                            </v-app>
                            </div> -->
                        <!-- ============== calender ============== -->    
                        <!-- 종료일 <input type="text" id="calender-end" name="end_Date" @focus="calenderOpen()" v-model="reservation.end_Date"><br> -->
                        시간
                        <input type="text"><br>
                        인원수
                        <button type="button" id="deletePeopleBtn" @click="deletePeople()">-<img src=""></button>
                        <input type="text" v-model="reservation.total_people">
                        <input type="hidden" id="maxCapacity" :value="studio.studioFilter.maxCapacity">
                        <button type="button" id="addPeopleBtn" @click="addPeople()">+<img src=""></button>
                        <hr>
                        <!-- 가격 계산 -->
                        총금액 :
                        <span name="totalPrice">(일자/24+일자%24)*unitPrice +(max_pep-default_pep)*excharge
                        </span>
                        <!-- <button type="submit" @click="checkReservationDuplicate">예약하기</button> -->
                    </form>
                </div>
            </aside>
        </div>
    </div>
    
</template>

<script>
import axios from "axios"
export default{
  name: "studio-info",
  data() {
      return {
        // studio 객체 변수
        studios: {},
        tags: [],
        reviews: [],
        bookmark_check:0,
        reservation:{
        start_Date:"",
        end_Date:"",
        total_people:1
        },
        // 기본 변수
        loading: true,
        errored: false,
      }
  },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/getStudioInfo/10')
            .then(response => (this.studios = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)  
        axios
            .get('http://127.0.0.1:7777/getTags/10')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)  
        axios
            .get('http://127.0.0.1:7777/checkBookmark/3/10')
            .then(response => (this.bookmark_check = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/getStudioReviews/10')
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
  
    },methods: {
        bookmarkChange(){
            if(this.bookmark_check==1) this.bookmark_check=0
            else this.bookmark_check=1
        }
        ,deletePeople() {
            if (this.total_people > 1) this.total_people--;
            else {
                alert("최소 1명 이상 선택해주세요.");
            }
        }
        ,addPeople() {
            if (this.total_people < parseInt(document.getElementById("maxCapacity").value))
                this.total_people++;
            else {
                alert("최대 인원을 초과했습니다.")
            }
        }
        }
}

// import $ from 'jquery';
// var currentPosition = parseInt($("#reservation-floating-banner").css("top")) - 350;
// $(window).scroll(function() {
//     var position = $(window).scrollTop();
//     $("#reservation-floating-banner").stop().animate({
//         "top": position + currentPosition + "px"
//     }, 0);
// });

</script>
<style>

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

</style>
