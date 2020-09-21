<div class="row" id="searchList" v-else>
      <!-- 여기서 출력... 3개씩... 무한스크롤링 가즈아 -->
      <!-- 카드 형식 큰 틀 -->
      <div
        class="card horizontal col s12"
        id="studioInf"
        v-for="(studio, $index) in studios"
        v-bind:key="$index"
        ref="scrollContainer"
        @click="showStudioInfo(studio.stuId)"
      >
        <!-- 이미지 출력 부분 -->
        <div class="card-image" id="studioImg">
          <img
            :src="getImgUrl(studio.mainImg)"
            width="200em"
            height="210.14em"
          />
        </div>
        <!-- 업체 간단 요약 부분 -->
        <div class="card-content" id="studioContent">
          <div id="title">{{ studio.name }}</div>
          <div id="nameAddr">
            {{ studio.category.categoryName }} /
            {{ studio.studioFilter.address | category }}
          </div>
          <div id="desc">{{ studio.description | shortenDesc }}</div>
          <div id="info">
            {{ studio.studioFilter.unitPrice | currency }} 원/시간
          </div>
          <!-- 평점 및 리뷰 출력 부분 -->
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
            <span v-if="studio.countReview == 0">
              평가 없음
            </span>
            <span v-else> {{ studio.avgScore | demical }} 점 </span>
          </div>
        </div>
        <!-- 찜기능 부분 -->
        <div id="regBM">
          <img src="@/assets/img/util/fullheart.svg" width="20em" @click.capture="setBookMark(1,studio.stuId,$event)" v-if="studio.bookmark"/>
          <img src="@/assets/img/util/heart.svg" width="20em" @click.capture="setBookMark(0,studio.stuId,$event)" v-else/>
          <!-- <input type="hidden" :value="studio.stuId" v-model="stuId"/> -->
        </div>
      </div>