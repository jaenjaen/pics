<template>
  <div class="container">
      <!-- ==============  메인 이미지 : carousel ============== -->
      <header id="main-images-section">
        <div class="row" v-for="(mainImg,index) in mainImgList" v-bind:key="index">
          <carousel :itmes="1" :loop="true" :autoplay="true" >
            <div>
               <!-- <img  class="item" data-merge="3" :src="imgUrl(mainImg)" width="100%" height="500"/> -->
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
        <div class="section-title-field" v-for="studio in studios" v-bind:key="studio.stuId">
          <div class="studio-name">
            <h1> {{ studio.name }}</h1>
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
            <span class="bookmark-btn" @click.prevent="setBookMark()" v-if="customer">
              <img src="@/assets/img/util/fullheart.svg" v-if="isBooked" width="20em" height="24em" />
              <img src="@/assets/img/util/heart.svg" v-else width="20em" height="24em"/>
            </span>
            </span>          
          <span>
          <!-- <a class="waves-effect waves-light btn-small" @click="shareUrl()">
            <i class="material-icons">share</i>
              <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" width="10%"/> 
          </a> -->
          </span>
  
            <!-- 누적 이용자 수 -->
            <br>
            <span>
            스튜디오를 이용한 사람 총 {{this.accCustomer}}명
            </span>
          </div>        
        </section>
      <hr/>  
        <!-- ============== Reservation ============== -->
      <div class =article-Filterstudiormation-map-area>
        <Reservation width="70%"></Reservation>
      </div>
        <!-- ============== Studio Filter ============== -->
      <hr>
      <article>
          <div class="article-studioFilter-information-area" >
            <div v-for="studio in studios" v-bind:key="studio.stuId"> 
              <table id="Studio-Filter-Table">
                <tr>
                  <td>넓이</td>
                  <!-- <td>{{ studio.studioFilter.size}}m<sup>2</sup>
                  ({{ studios.studioFilter.size |sizeUnit}}/평)</td> -->
                </tr>
                <tr>
                  <td>옵션</td>
                  <td>{{studio.studioFilter.options}}</td>
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
             
        <div class="article-Description-area"  v-for="(studio,index) in studios" v-bind:key="index">
           <hr/>  
          <div class="studio-rule">
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
          <!-- <tr class="article-portfolio-area"  v-for="(portImg,index) in portImgList" v-bind:key="index"> -->
            <!-- <td style="list-style-type:none"><img :src="imgUrl(portImg)" width="80%" height="400px"/></td><br> -->
          <!-- </tr> -->
        </table>
          <!-- ============== Map ============== -->
          <div id="map">

          </div>

        <hr />
        <!-- ============== Chart & Graph ============== -->
        <!-- ===== 시간대별 예약 차트 ===== -->
        <div class="article-Chart-area">
          <div id=time-chart style="width:40%;heigth:70px">
              <div class="chart">
                  <Bar 
                  :chartdata=datacollection
                  :options=options></Bar>
              </div>
					</div> 
        		
				 	 <!-- ===== 요일별 예약 차트 ===== -->
          <div id=day-chart style="width:40%;heigth:70px">
              <div class="chart">
                  <Bar 
                  :chartdata=datacollection
                  :options=options></Bar>
              </div>
					</div> 
        </div>

        <!-- ============== Review ============== -->
        <hr>
        <div class="article-review-area" id="article-review-area" v-if="(reviews+'').length>0">
        <h2 align="left">리뷰보기</h2>   
          <div v-for="(review,index) in uncoveredReview" v-bind:key="index">
           <div>
              <div class="card-expansion" id="reviews" >
                <md-card-media>
                  <!-- <span id="reviewr-img"><img :src="imgUrl(review.costomer.srcImg)"></span>  -->
                </md-card-media>
                <md-card>
                  <md-card-header>
                  <div class="md-subhead" id="register-date">{{ review.customer.email}}</div>
                  <!-- <div class="md-subhead" id="register-date">({{ review.regDate}})</div> -->
                </md-card-header>

                  <!-- <span id="reviewr-email"><strong>{{ review.customer.email|emailHide }}</strong></span> -->
                  <!-- 별점 부분 -->
                  <span id="star-score"> 별점
                    <span v-if="review.score == 0">
                      <i class="material-icons" id="icon_filter">star_border</i>
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
                    <span v-if="review.score == 2">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star_border</i>
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
                    <span v-if="review.score == 4">
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
                    <hr width="90%">
                    <div id="review-content">{{ review.content }}</div>
                  </span>
                  <md-card-expand  v-if="review.answer!=''">
                    <md-card-actions md-alignment="space-between">
                      <md-card-expand-trigger>
                        <md-button class="md-icon-button">
                          <md-icon>keyboard_arrow_down</md-icon>
                        </md-button>
                      </md-card-expand-trigger>
                    </md-card-actions>
                    <md-card-expand-content>
                      <md-card-content id=answer> 
                          {{ review.answer }}
                      </md-card-content>
                    </md-card-expand-content>
                  </md-card-expand>
                </md-card>                
              </div>
            </div>
            </div>
            <div id="more-review" v-if="(reviews).length>3">
              <button 
                type="button"
                @click="appendReviews()"
                :disabled="dataFull === true" 
                :class="{disabled : dataFull}"
                >더보기
              </button>
            </div>
          </div>
          <div id="no-review" v-if="(reviews+'').length==0"><h3>"아직 등록된 리뷰가 없습니다!"</h3></div>
      </article>
    <!-- 모달 모아두기 -->
    <div>
      <modal name="delBook" adaptive="adaptive" resizable="resizable" width="25%" height="15%" :maxWidth=768>
        <div id="delBook">
          <p>찜목록에서 제거했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal name="regBook" adaptive="adaptive" resizable="resizable" width="25%" height="15%" :maxWidth=768>
        <div id="regBook">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal name="login-required" adaptive="adaptive" resizable="resizable" width="25%" height="15%" :maxWidth=768>
        <div id="login-required">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
    </div>
  </div>
</template>


<script src="@/assets/js/studioInfo/StudioInfo.js"></script>
<style scoped src="@/assets/css/studioInfo/StudioInfo.css"></style>

