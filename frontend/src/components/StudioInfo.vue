<template>
    <div id="container">
        <div id="app">
            <!-- ==============  메인 이미지 : jumbo, carousel ============== -->
            <section id="main-images-section">
                <div id="demo" class="carousel slide" data-ride="carousel">
                    <!-- 하단 바 -->
                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        <li data-target="#demo" data-slide-to="3"></li>
                    </ul>

                    <!-- 이미지 -->
                    <div class="carousel-inner">
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
                    </div>

                    <!-- 좌우 넘기기 아이콘 -->
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
            </section>

            <nav>
                <hr>
                <div id="info-review-navigation">
                    <span><a href="#">상세보기</a></span>
                    <span></span><a href="#">리뷰보기</a></span>
                </div>
                <hr>
            </nav>
            <article v-for="info in infos">
                <!-- ============== Title ==============  -->
                <div class=" article-title-area">
                    <hr>
                    <h2>{{info.name}}</h2>
                    <div class="bookmark-check">
                        <span v-html="bookmark" role="button">
                    <img></img>
                    </span>
                    </div>
                    <div id="company-of-studio ">
                        <span><img :src="info.company.logoImg"/></span>&nbsp;<span>{{info.company.name}}</span>
                    </div>
                    <ul class="tag-list" v-for="tag in tags">
                        <li style=list-style:none>#{{tag.tagName}}</li>
                    </ul>
                </div>

                <!-- ============== Studio Filter ============== -->
                <div>
                    <div class="article-FilterInformation-area ">
                        장소 소개
                        <table id="Studio-Filter-Table ">
                            <tr>
                                <td>넓이</td>
                                <td>{{info.studioFilter.size}}</td>
                            </tr>
                            <tr>
                                <td>옵션</td>
                                <td>{{info.studioFilter.options}}</td>
                            </tr>
                            <tr>
                                <td>주차</td>
                                <td>{{info.studioFilter.parking}}</td>
                            </tr>
                            <tr>
                                <td>수용 인원</td>
                                <td>기본 {{info.studioFilter.defaultCapacity}} 명 ~ 최대 {{info.studioFilter.maxCapacity}} 명</td>
                            </tr>
                            <tr>
                                <td>인원 초과 시 추가비용</td>
                                <td>{{info.studioFilter.excharge}}</td>
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
                    <p>{{info.rule}}</p>
                    <p>{{info.description}} 플러그인 플러그인은 일반적으로 전역 수준 기능을 Vue에 추가합니다. 플러그인에는 엄격하게 정의된 범위는 없습니다. 일반적으로 작성할 수있는 플러그인에는 여러 유형이 있습니다. 약간의 전역 메소드 또는 속성 추가 예. vue-custom-element 하나 이상의 글로벌 에셋 추가 : 디렉티브 / 필터 / 트랜지션 등. vue-router 글로벌 mixin으로 일부 컴포넌트
                        옵션을 추가하십시오. 예. vuex Vue.prototype에 Vue 인스턴스 메소드를 연결하여 Vue 인스턴스 메소드를 추가하십시오. 가지고 있는 API를 제공하면서 동시에 위의 일부 조합을 주입하는 라이브러리. 예. vue-router 플러그인 사용하기 Vue.use() 글로벌 메소드를 호출하여 플러그인을 사용하십시오. // `MyPlugin.install(Vue)` 호출 Vue.use(MyPlugin)
                        new Vue({ //... options }) 선택적으로 몇 가지 옵션을 전달할 수 있습니다. Vue.use(MyPlugin, { someOption: true }) Vue.use는 자동으로 같은 플러그인을 두 번 이상 사용하지 못하기 때문에 같은 플러그인에서 여러 번 호출하면 플러그인이 한 번만 설치됩니다. vue-router와 같은 Vue.js 공식 플러그인이 제공하는 일부 플러그인은Vue가 전역
                        변수로 사용 가능한 경우 자동으로Vue.use()를 호출합니다. 그러나 CommonJS와 같은 모듈 환경에서는 항상Vue.use()를 명시 적으로 호출해야합니다 : // Browserify 또는 Webpack을 통해 CommonJS를 사용할 때 var Vue = require('vue') var VueRouter = require('vue-router') // 잊지 마세요 Vue.use(VueRouter)
                        커뮤니티에서 기여한 많은 플러그인 및 라이브러리 컬렉션을 awesome-vue에서 확인하세요. 플러그인 작성하기 Vue.js 플러그인은install 메소드를 노출해야합니다. 이 메소드는 첫 번째 인자로 Vue 생성자와 함께 가능한 옵션과 함께 호출 될 것입니다. MyPlugin.install = function (Vue, options) { // 1. 전역 메소드 또는 속성 추가 Vue.myGlobalMethod
                        = function () { // 필요한 로직 ... } // 2. 전역 에셋 추가 Vue.directive('my-directive', { bind (el, binding, vnode, oldVnode) { // 필요한 로직 ... } ... }) // 3. 컴포넌트 옵션 주입 Vue.mixin({ created: function () { // 필요한 로직 ... } ... }) // 4. 인스턴스 메소드
                        추가 Vue.prototype.$myMethod = function (methodOptions) { // 필요한 로직 ... } }
                    </p>
                </div>
                <hr>
                <!-- ============== Review ============== -->
                <h4>Reviews</h4>
                <div class="article-review-area">
                    <table id='list_table'>
                        <thead>
                            <row>
                                <th>stu_id</th>
                                <th>com_id</th>
                                <th>category_id</th>
                                <th>rule</th>
                            </row>
                        </thead>
                        <tbody>
                            <tr v-for="info in infos">
                                <td v-html="info.stuId "></td>
                                <td v-html="info.comId "></td>
                                <td v-html="info.categoryId "></td>
                                <td v-html="info.rule "></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <ul v-for="review in reviews ">
                            <li>
                                <span>{{review.customer.email.trim()}}</span>
                                <span>{{review.customer.job.trim()}}</span>
                                <div>{{review.content}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>

            <!-- ============== Reservation ============== -->
            <aside v-for="info in infos">
                <div id="reservation-floating-banner">
                    <h2>예약하기</h2>
                    <form id=" reservation-form">
                        <!-- 캘린더 -->
                        <input type="text"><br>
                        <!-- 시간 -->
                        <input type="text"><br>
                        <!-- 인원수 -->
                        인원수
                        <!-- <button id="deletePeopleBtn" @click="deletePeople">-<img src=""></button>
                        <input type="text" :value="info.studioFilter.defaultCapacity">
                        <button id="addPeopleBtn" @click="addPeople">+<img src=""></button> -->
                        <hr>
                        <!-- 가격 계산 -->
                        총금액 :
                        <sapn>(일자/24+일자%24)*unitPrice +(max_pep-default_pep)*excharge
                        </sapn>
                        <button type="submit" @click.prevent="checkReservationDuplicate">예약하기</button>
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
      return {// Axios 전체 리스트 변수
            infos: [],
            stuid: 0,
            loading: true,
            errored: false,
            bookmark: 0,
            reviews:    [],
            tags: [],
            inavailabeDate: [],
            availabeDate: []
      }
  },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/getStudioInfo')
            .then(response => (this.infos = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/checkBookmark/3/10')
            .then(response => (this.bookmark = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getStudioReviews')
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getTags')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
        axios
            .get('http://127.0.0.1:7777/getSchedules')
            .then(response => (this.schedule = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
    }
}
</script>


<style lang="stylus">

body {
    margin: 5% 5% 5% 5%;
    width: 80%;
    padding: 20px;
}

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
