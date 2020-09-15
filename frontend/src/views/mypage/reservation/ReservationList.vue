<template>
  <div id="reservation_container">
    <div id="month_header">
      <button @click="beforeMonth">
        <img src="@/assets/img/util/backward.svg">
      </button>
      <span>
        <vue-monthly-picker
          v-model="month"
          vlaue="month"
          dateFormat="MM월"
          :clearOption="false"
          alignment="center"
          @selected="changeMonth()">
        </vue-monthly-picker>
      </span>
      <button @click="afterMonth">
        <img src="@/assets/img/util/forward.svg">
      </button>
    </div>
    <div class="list_table">
      <table>
        <tr>
          <th>예약번호</th> <th>예약일자</th> <th>예약업체</th> <th>예약인원</th> <th>결제금액</th> <th>리뷰쓰기</th>
        </tr>
        <tr v-for="(reservation, idx) in resvList" :key="reservation">
          <td>{{idx+1}}</td> <td>{{reservation.startDate}} <br> ~ <br>{{reservation.endDate}}</td> <td>{{reservation.studio.name}}</td> <td>{{reservation.totalPeople}}</td> 
          <td>{{reservation.totalPrice}}원</td> <td><button class="list_btn" @click="showModal(reservation.resId, reservation.studio.name, reservation.stuId)">리뷰쓰기</button></td>
        </tr>
        <tr v-if="emptyFlag">
          <td colspan="6"><br>해당 월의 예약이 존재하지 않습니다.</td>
        </tr>
      </table>
      <modal name="reviewModal" :height="455">
        <h3 style="margin: 20px;">{{studioName}}</h3>
        <div id="star_rating">
          <star-rating
            v-model="rating"
            :star-size="40"
            :rounded-corners="true"
            :inline="true"
            active-color="#029BE0"
          ></star-rating>
        </div>
        <div class="reviewcontent">
          <form @submit.prevent>
            <textarea v-model="content" placeholder="리뷰를 작성해주세요 100자까지 작성 가능합니다" :maxlength="max"></textarea>
            <div class="filebox">
              <input type="text" :placeholder="filename" disabled>
              <label for="review_img">업로드</label>
              <input type="file" id="review_img" accept="image/*"  ref="reviewImg" @change="onFileChange('review_img',$event)">
            </div>
            <input @click="writingReview" type="submit" value="리뷰작성"/>
          </form>
        </div>
      </modal>
    </div>
  </div>
</template>

<script scoped src="@/assets/js/mypage/ReservationList.js"></script>
<style scoped src="@/assets/css/mypage/reservation_list.css" />
