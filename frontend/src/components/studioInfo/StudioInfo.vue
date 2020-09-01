   
<template>
  <div class="container">
      <!-- ==============  메인 이미지 : carousel ============== -->
      <header id="main-images-section">
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
      </header>
      <hr/>
    
       <nav>
         <div class="tabs-field">
           <div class="row">
            <span class="nav-tab"><a href="#">상세보기</a></span>
            <span class="nav-tab"><a href="#">리뷰보기</a></span>
          </div>
          </div>
        </nav>
       <hr/>


    <section align="left">
        <!-- 태그 -->
      <div>
        <spand class="tag-list" v-for="tag in tags" v-bind:key="tag.tagId">
            <button class="tagBtn"><span>#</span>{{tag.tagName}}</button>
          </spand>
      </div>
      <br>
        <!-- 타이틀 -->
      <div class="article-title-area" v-for="(studio,index) in studios" v-bind:key="index">
        <div class="studio-name">
          <h2> {{ studio.name }}</h2>
        </div><br>
`
        <div id="company-of-studio">
              <!-- <span><img :src="imgUrl(studio.company.logoImg)" width="20px" height="20px"/></span> -->
              <span>{{studio.company.name}}</span>
          </div>
        </div> 
        <br>
        <div>
        <!-- 찜하기, 공유하기, 누적 이용자 수 -->
        <span>
        <button class="waves-effect waves-light btn-small" @click.prevent="bookmarkChange()" :v-model="bookmarkCheck">
          <img src="@/assets/img/header_bottom/marking.svg" v-if!="bookmarkCheck" alt />
          <img src="@/assets/img/header_bottom/marking.svg" v-if="bookmarkCheck" alt />
          <i class="material-icons"></i>
        </button>
        </span>
        <span>
        <!-- <a class="waves-effect waves-light btn-small" @click="shareUrl()">
          <i class="material-icons">share</i>
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" width="30"/> 
        </a> -->
        </span>

          <!-- 누적 이용자 수 -->
          <span>
          {{this.accCustomer}}명
          </span>
        </div>        
      </section>
      <hr/>  
        <!-- ============== Studio Filter ============== -->
      <article>
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
                <td v-html="review.customer.funnel"></td>
              </tr>
              <tr>
              <td>평점</td>
                :
              <td v-html="review.score"></td>
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

<script scoped src="@/assets/js/StudioInfo.js"></script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic");
.container {
    width: 768px;
    margin: auto 3em 0 10em 0;
}

#main-images-section {
    width: 100%;
    margin: auto;
}

.tag-list {
    padding: 3px;
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

.tagBtn {
    display: inline;
}
</style>>