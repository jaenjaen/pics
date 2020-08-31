   
<template>
  <div class="container">
<div class="container">
      <!-- ==============  메인 이미지 : jumbo, carousel ============== -->
      <section id="main-images-section">
        <div class="row" v-for="(studio,index) in studios" v-bind:key="index">     
          <carousel :itmes="1" :loop="true" :autoplay="true" >
            <div>
               <img  class="item" data-merge="3" :src="imgUrl(studio.mainImg)" width="100%" height="500"/>
           </div>
           <!-- <div>
               <img  class="item" data-merge="3" :src="imgUrl(studio.portImg)" width="100%" height="500"/>
           </div>
           <div>
               <img  class="item" data-merge="3" :src="imgUrl(studio.mainImg)" width="100%" height="500"/>
           </div> -->
          </carousel>
         </div> 
      </section>
      <hr/>
       <nav>
          <div class="nav-tab">
            <span id="studio-info-body"><a href="#">상세보기</a></span>
            <span id="studio-info-review"><a href="#">리뷰보기</a></span>
          </div>
        </nav>
       <hr/>
      <article>
       <!-- ============== Title ==============  --> 
        <div class="article-title-area" v-for="(studio,index) in studios" v-bind:key="index">
         <table>
          <tr>
          <td><h2> {{ studio.name }}</h2></td>
          <td>
             <!-- 찜하기 -->
            <span>
            <button class="waves-effect waves-light btn-small" @click.prevent="bookmarkChange()" :v-model="bookmarkCheck">
              찜
              <!--  <img src="../assets/img/header_bottom/marking.svg" v-if="bookmarkCheck" alt /> -->
              <!-- <img src="../assets/img/header_bottom/marking.svg" v-if!="bookmarkCheck" alt /> -->
            </button>
            </span>
            <span>
            <a class="waves-effect waves-light btn-small" @click="shareUrl()">
              <!-- <i class="material-icons">share</i> -->
              <img @click="kakaoShare" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" width="30"/>
            </a>
            </span>
           </td>
          </tr>
          </table>
          <spand class="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
            <button class="tagBtn"><span>#</span>{{tag.tagName}}</button>
          </spand>

         <div id="company-of-studio"> 
               <span>{{studio.company.name}}</span>
               <!-- <img :src="imgUrl(studio.company.logoImg)"/> -->
          </div>
          <!-- 누적 이용자 수 -->
          <!-- <span>
          {{this.accCustomer}}명
          </span> -->
 
        </div>        
        <hr>

        <!-- ============== Studio Filter ============== -->
        <div class="article-Filterstudiormation-map-area" >
          <div class="article-Filterstudiormation-area" >
            <div v-for="(studio,index) in studios" v-bind:key="index">
              <table id="Studio-Filter-Table">
                <tr>
                  <td>넓이</td>
                  <td>{{ studio.studioFilter.size }}</td>
                </tr>
                <tr>
                  <td>옵션</td>
                  <td>{{ studio.options }}</td>
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

          </div>
          <!-- ============== Map ============== -->
          <div id="map">

          </div>
        </div>
        <hr />
        <!-- ============== Description ============== -->
        <div class="article-Description-area"  v-for="(studio,index) in studios" v-bind:key="index">
          <div>
          <h4>Studio 이용 수칙</h4>
          <p>{{ studio.rule }}</p>
          </div>
          <div>
          <h4>Studio 소개글</h4>
          <p>{{ studio.description }}</p>
          </div>
        </div>
        <hr />
        <hr>
        <!-- ============== Portfolio Images ============== -->
        <table aligh="center" width="100%" height="100px">
        <tr class="article-portfolio-area"  v-for="(studio,index) in studios" v-bind:key="index">   
          <td style="list-style-type:none"><img :src="imgUrl(studio.portImg)" width="80%" height="400px"/></td><br>
        </tr>       
        </table>
        
        <hr />
        <!-- ============== Chart & Graph ============== -->
        <!-- <div class="article-Chart-area">
          <div style="width:300px;heigth:300px">
           도넛 그래프
					 <div id="canvas-holder" style="width:100%">
						<div class="chartjs-size-monitor">
							<div class="chartjs-size-monitor-expand">
								<div class=""></div>
							</div>
							<div class="chartjs-size-monitor-shrink">
								<div class=""></div>
							</div>
						</div>
						<canvas id="doughnut-chart-area" style="display: block" width="280" height="200" class="chartjs-render-monitor"></canvas>
					</div>
          <div>
						
				 	히스토그램  평균가격대|쇼핑몰
					<div id="canvas-holder" style="width:100%">
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
          </div>
        </div>  -->

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

  </div>
</template>

<script scoped src="../assets/js/StudioInfo.js"></script>

<style scoped>

.container{
  width: 768px;
  margin: auto 3em 0 10em 0;

}

#main-images-section {
  width: 768px;
  margin: auto;
}
.nav-tab span{
  margin: 20%;
}
article {
    width: 100%;
    float: left;
    border: 1px solid gray;
    margin-bottom: 10em;

}

#map {
  width: 40%;
  height: 40%;
  border: 1px solid green;
}

#Studio-Filter-Table tr td {
    border: 1px solid gray;
    text-align: right;

}

.carousel-inner img {
  width: 100%;
  height: 550px;
}

.tagBtn{
  display: inline;

}
</style>
