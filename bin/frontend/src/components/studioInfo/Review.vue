<template>
<div id="review-container">
    <div id="no-review" v-if="(reviews+'').length<=0">
      <h3>"아직 등록된 리뷰가 없습니다!"</h3>
    </div>
    <div class="article-review-area" id="article-review-area" v-if="(reviews+'').length>0">
      <h2 id="reviewTitle">리뷰보기</h2>
      <span id="countReview">(총 {{studios[0].countReview}}개의 리뷰)</span>
      <div v-for="(review,index) in uncoveredReview" v-bind:key="index">
        <div>
          <div class="card-expansion" id="reviews">
            <md-card-media>
              <!-- <span id="reviewr-img"><img :src="imgUrl(review.costomer.srcImg)"></span>  -->
            </md-card-media>
            <md-card md-with-hover>
              <md-ripple>
              <md-card-header>
                <span class="md-subhead" id="reviewr-email">
                  <strong>{{ review.customer.email|emailHide }}</strong>
                  ({{ review.regDate}})
                </span>
                  <!-- 별점 부분 -->
                <div id="star-score">
                <span v-if="review.score > 0 && review.score < 1">
                <i class="material-icons" id="icon_filter">star_half</i>
                  </span>
                  <span v-if="review.score == 1">
                      <i class="material-icons" id="icon_filter">star</i>
                  </span>
                  <span v-if="review.score > 1 && review.score < 2">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star_half</i>
                  </span>
                  <span v-if="review.score == 2">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                  </span>
                  <span v-if="review.score > 2 && review.score < 3">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star_half</i>
                  </span>
                  <span v-if="review.score== 3">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                  </span>
                  <span v-if="review.score> 3 && review.score < 4">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star_half</i>
                  </span>
                  <span v-if="review.score == 4">
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                      <i class="material-icons" id="icon_filter">star</i>
                  </span>
                  <span v-if="review.score> 4 && review.score< 5">
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
                  </span><br>
                  </div>
              </md-card-header>
              <hr width="90%"/>
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
              </md-ripple>
            </md-card>
          </div>
        </div>
      </div>
      <div id="more-review" v-if="(reviews).length>3">
        <button
          type="button"
          id="more-review-btn"
          @click="appendReviews()"
          :disabled="dataFull === true"
          :class="{disabled : dataFull}"
        >더보기</button>
      </div>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/studioInfo/Review.js"></script>
<style scoped src="material-design-icons/iconfont/material-icons.css">
</style>
<style scoped src="@/assets/css/studioInfo/review.css"></style>