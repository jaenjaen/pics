<!-- Chat Modal 관련 외부 CSS 영역 -->
<style scoped src="@/assets/css/chat/ChatShow.css"></style>

<template>
  <div class="container">
    <!-- Chat Modal 영역 -->
    <div id="chatModal" style="display:none;">
      <div id="chatContent">
        <div id="closeChat" @click="hideChatModal">&times;</div>
        <Chat id="chatArea" ref="chat" />
      </div>
    </div>

    <!-- ==============  메인 이미지 : carousel ============== -->
    <carousel
      v-if="mainImgList && mainImgList.length"
      :items="1"
      :loop="true"
      :nav="false"
      :autoplay="true"
      :dots="false"
    >
      <div class="row" v-for="(mainImg,index) in mainImgList" v-bind:key="index">
        <div class="card-image">
          <img :src="imgUrl(mainImg)" />
        </div>
      </div>
    </carousel>

    <hr />

    <nav>
      <div class="tabs-field">
        <div class="row">
          <span class="nav-tab">
            <a href="#Studio-Filter-Table">상세보기</a>
          </span>
          <span class="nav-tab">
            <a href="#review-container">리뷰보기</a>
          </span>
        </div>
      </div>
    </nav>
    <hr />

    <section align="left">
      <!-- 태그 -->
      <div class="section-tag-field">
        <span id="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
          <button class="tag-btn">
            <span>#</span>
            {{tag.tagName}}
          </button>
        </span>
        <!-- 찜하기, 공유하기, 누적 이용자 수 -->
        <span class="section-bookmark-share-field">
          <span class="bookmark-btn" @click.prevent="setBookMark()" v-if="customer!=null">
            <img src="@/assets/img/util/fullheart.svg" v-if="isBooked" width="24em" height="24em" />
            <img src="@/assets/img/util/heart.svg" v-else width="24em" height="24em" />
          </span>&nbsp;&nbsp;
        </span>
        <span>
          <button
            id="share-btn"
            v-clipboard="getUrl"
            v-clipboard:success="clipboardSuccessHandler"
            v-clipboard:error="clipboardErrorHandler"
          >
            <i class="material-icons">share</i>
          </button>
        </span>
      </div>

      <!-- 타이틀 -->
      <div class="section-title-field" v-for="studio in studios" v-bind:key="studio.stuId">
        <!-- 누적 이용자 수 -->
        <div class="studio-name">
          <div>
            <h1 id="studio-name">
              <span>{{ studio.name }}</span>
              <button class="chat-btn" @click="showChatMoal">문의</button>
              <!-- 문의 클릭 이벤트 -->
            </h1>

            <p id="accCustomer">
              누적 이용자 총
              <b>{{accCustomer}}</b>명
            </p>
            <!-- 스튜디오 평점 -->
            <div id="review">
              <!-- 별점 부분 -->
              <span id="star">
                <span v-if="studio.avgScore > 0 && studio.avgScore < 1">
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 1">
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 1 && studio.avgScore < 2">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 2">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 2 && studio.avgScore < 3">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 3">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 3 && studio.avgScore < 4">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 4">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
                <span v-if="studio.avgScore > 4 && studio.avgScore < 5">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star_half</i>
                </span>
                <span v-if="studio.avgScore == 5">
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                  <i class="material-icons" id="icon_filter">star</i>
                </span>
              </span>
              <span v-if="studio.countReview == 0">평가 없음</span>
              <!-- <span v-else>{{ studio.avgScore | demical }} 점</span> -->
            </div>
          </div>
          <div class="price">
            <span>{{studio.studioFilter.unitPrice | currency}}</span>
            <span>원</span>
          </div>
        </div>
        <div id="company-of-studio">
          <!-- <span><img :src="imgUrl(studio.company.logoImg)" width="10%" height="20px"/></span> -->
          <span>{{studio.company.name}}</span>
        </div>
      </div>
    </section>
    <hr />
    <!-- ============== Studio Filter ============== -->
    <article>
      <div class="info_filter_map">
        <div class="info_filter" v-for="studio in studios" v-bind:key="studio.stuId">
          <table id="Studio-Filter-Table">
            <tr>
              <td>
                <b>넓이</b>
              </td>
              <td>
                {{ studio.studioFilter.size|sizePoint}}m
                <sup>2</sup>
                ({{ studio.studioFilter.size |sizeUnit}}/평)
              </td>
            </tr>
            <tr>
              <td>
                <b>옵션</b>
              </td>
              <td>{{studio.studioFilter.options}}</td>
            </tr>
            <tr>
              <td>
                <b>주차</b>
              </td>
              <td>{{studio.studioFilter.parking|parking}}</td>
            </tr>
            <tr>
              <td>
                <b>수용 인원</b>
              </td>
              <td>
                기본 {{studio.studioFilter.defaultCapacity}} 명 ~ 최대
                {{ studio.studioFilter.maxCapacity }} 명
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  인원 초과 시
                  <br />추가비용
                </b>
              </td>
              <td>{{studio.studioFilter.excharge|currency}}원</td>
            </tr>
          </table>
        </div>
        <!-- ============== Map ============== -->
        <div class="article-map-field">
          <Map id="Map" :stuIdData="stuId"></Map>
        </div>
      </div>

      <!-- ============== Reservation ============== -->

      <div class="article-Filterstudiormation-map-area">
        <hr />
        <Reservation width="70%" :stuIdData="stuId" :custData="customer"></Reservation>
      </div>

      <!-- ============== Description ============== -->

      <div class="article-Description-area" v-for="(studio,index) in studios" v-bind:key="index">
        <hr />
        <div class="studio-rule">
          <h4>Studio 이용 수칙</h4>
          <p>{{ studio.rule }}</p>
        </div>
        <div>
          <h4>Studio 소개글</h4>
          <p>{{ studio.description }}</p>
        </div>
      </div>
      <hr />
      <!-- ============== Portfolio Images ============== -->
      <carousel
        class="port_carousel"
        v-if="portImgList && portImgList.length"
        :items="3"
        :loop="true"
        :nav="false"
        :autoplay="true"
        :dots="false"
        :margin="5"
      >
        <div class="row" v-for="(portImg,index) in portImgList" v-bind:key="index">
          <div class="portimage">
            <img :src="imgUrl(portImg)" />
          </div>
        </div>
      </carousel>
      <hr />
      <!-- ============== Chart & Graph ============== -->
      <!-- ===== 시간대별 예약 차트 ===== -->
      <div class="article-Chart-area">
        <div id="time-chart" style="width:30%;">
          <div class="chart">
            <TimeChart :stuIdData="stuId"></TimeChart>
          </div>
        </div>

        <!-- ===== 요일별 예약 차트 ===== -->
        <div id="day-chart" style="width:30%;">
          <div class="chart">
            <DayChart :stuIdData="stuId"></DayChart>
          </div>
        </div>
      </div>
      <hr />
      <!-- ============== OthserStudio ============== -->
      <!-- <div class="article-Chart-area">
        <OthserStudio>
          
        </OthserStudio>      
      </div> -->
      <!-- ============== Review ============== -->
      <div id="review-container">
        <div id="no-review" v-if="(reviews+'').length<=0">
          <h3>"아직 등록된 리뷰가 없습니다!"</h3>
        </div>
        <div class="article-review-area" id="article-review-area" v-if="(reviews+'').length>0">
          <h2 id="reviewTitle" align="left">리뷰보기</h2>
          <span id="countReview">(총 {{studios[0].countReview}}개의 리뷰)</span>
          <div v-for="(review,index) in uncoveredReview" v-bind:key="index">
            <div>
              <div class="card-expansion" id="reviews">
                <md-card-media>
                  <!-- <span id="reviewr-img"><img :src="imgUrl(review.costomer.srcImg)"></span>  -->
                </md-card-media>
                <md-card>
                  <md-card-header>
                    <span class="md-subhead" id="reviewr-email">
                      <strong>{{ review.customer.email|emailHide }}</strong>
                      ({{ review.regDate}})
                    </span>
                    <!-- 별점 부분 -->
                    <div id="star-score">
                      <span class="md-subhead" v-if="review.score == 0">
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span class="md-subhead" v-if="review.score == 1">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span class="md-subhead" v-if="review.score == 2">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span class="md-subhead" v-if="review.score == 3">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                        <i class="material-icons" id="icon_filter">star_border</i>
                      </span>
                      <span class="md-subhead" v-if="review.score == 4">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star_half</i>
                      </span>
                      <span class="md-subhead" v-if="review.score == 5">
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                        <i class="material-icons" id="icon_filter">star</i>
                      </span>
                    </div>
                  </md-card-header>
                  <hr />
                  <div id="review-content">{{ review.content }}</div>
                  <md-card-expand v-if="review.answer!=''">
                    <md-card-actions md-alignment="space-between">
                      <md-card-expand-trigger>
                        <md-button class="md-icon-button">
                          <md-icon>keyboard_arrow_down</md-icon>
                        </md-button>
                      </md-card-expand-trigger>
                    </md-card-actions>
                    <md-card-expand-content>
                      <md-card-content id="answer">{{ review.answer }}</md-card-content>
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
            >더보기</button>
          </div>
        </div>
      </div>
    </article>
    <!-- 모달 모아두기 -->
    <div>
      <modal
        name="delBook"
        adaptive="adaptive"
        resizable="resizable"
        width="25%"
        height="15%"
        :maxWidth="768"
      >
        <div id="delBook">
          <p>찜목록에서 제거했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal
        name="regBook"
        adaptive="adaptive"
        resizable="resizable"
        width="25%"
        height="15%"
        :maxWidth="768"
      >
        <div id="regBook">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal
        name="login-required"
        adaptive="adaptive"
        resizable="resizable"
        width="25%"
        height="15%"
        :maxWidth="768"
      >
        <div id="login-required">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal
        name="copy-link-success"
        adaptive="adaptive"
        resizable="resizable"
        width="30%"
        height="15%"
        :maxWidth="768"
      >
        <div id="copy-link-success">
          <p>페이지 URL주소가 복사되었습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal
        name="copy-link-error"
        adaptive="adaptive"
        resizable="resizable"
        width="30%"
        height="15%"
        :maxWidth="768"
      >
        <div id="copy-link-error">
          <p>페이지 URL주소를 복사할 수 없습니다. 주소창에서 직접 복사를 시도하십시오.</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
    </div>
  </div>
</template>


<script scoped src="@/assets/js/studioInfo/StudioInfo.js"></script>
<style scoped src="material-design-icons/iconfont/material-icons.css">
</style>
<style scoped src="@/assets/css/studioInfo/StudioInfo.css"></style>