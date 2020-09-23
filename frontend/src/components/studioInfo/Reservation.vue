<template>
  <div class="container" id="reserveStudio">
    <aside v-for="(studio, index) in studios" v-bind:key="index">
      <div id="reservation-floating-banner">
        <form method="post" @submit.prevent="addReserve">
          <!-- ============== calender ============== -->
          <div class="calender_container">
            <div class="input-reserve-info-field">
              <!-- 날짜 -->
              <div class="date-input-field">
                <div class="row">
                  <div class="col s12 m6">
                    <span class="start-date">
                      <strong>예약 시작일</strong>
                      <md-datepicker
                        id="start_date"
                        v-model="start_date"
                        :md-model-type="String"
                        :md-immediately="true"
                        :disable-passed-days="true"
                        :md-disabled-dates="disabledDates"
                        :value="start_date"
                      ></md-datepicker>
                    </span>
                    
                    <span class="end-date">
                      <strong>예약 종료일</strong>
                      <md-datepicker
                        id="end_date"
                        v-model="end_date"
                        :md-model-type="String"
                        :md-immediately="true"
                        :disable-passed-days="true"
                        :md-disabled-dates="disabledDates"
                        :value="end_date"
                      ></md-datepicker>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 시간 -->
              <div class="time-input-field">
                <span class="start-time">
                  <p><strong>예약 시작 시간</strong></p>
                  <select class="time-picker" v-model="start_time" required>
                    <option
                      required="required"
                      v-for="(startTime,index) in startTimes"
                      v-bind:key="index"
                      :value="parseInt(startTime)"
                    >{{startTime}}시</option>
                  </select>
                </span>
                <span class="end-time">
                  <p><strong>예약 종료 시간</strong></p>
                  <select class="time-picker" v-model="end_time" required>
                    <option
                      required="required"
                      v-for="(endTime,index) in endTimes"
                      v-bind:key="index"
                      :value="parseInt(endTime)"
                    >{{endTime}}시</option>
                  </select>
                </span>
              </div>
              <br>
              <!-- 인원 -->
              <div class="people-cnt">
                <table width="70%">
                  <tr>
                    <td>
                      <md-button
                        id="deletePeopleBtn"
                        @click.prevent="deletePeople()"
                        style="display:inline"
                        class="md-primary"
                      >
                        <strong>-</strong>  
                      </md-button>
                    </td>
                    <td>
                      <input type="text" id="totalPeople" name="totalPeople" v-model="total_people" />
                    </td>
                    <td>
                      <md-button
                        id="addPeopleBtn"
                        @click.prevent="addPeople()"
                        style="display:inline"
                        class="md-primary"
                      >
                        <strong>+</strong>
                      </md-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 요금 계산 -->
            <div class="pricing-field">
              <table align="center" v-for="studio in studios" v-bind:key="studio.stuId">
                <tr align="right">
                  <td id="unitPrice">시간 당 비용 :</td>
                  <td>{{ studio.studioFilter.unitPrice | currency }} 원</td>
                  <td></td>
                </tr>
                <tr align="right">
                  <td id="unitPrice">인원 추가 비용 :</td>
                  <td>{{ studio.studioFilter.excharge | currency }} 원</td>
                  <td></td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr align="right">
                  <td id="totalPrice">총금액 :</td>
                  <td>
                    <span id="total_price">{{ totalPriceCalculate | currency }} 원</span>
                  </td>
                </tr>
              </table>
              <div>
                <button
                  id="reservation-btn"
                  type="submit"
                  align="center"
                >예약하기</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </aside>
    <!-- 모달 모아두기 -->
     <div>
      <!-- <modal
        name="success"
        adaptive="adaptive"
        resizable="resizable"
        width="25%"
        height="15%"
        :maxWidth="768"
      >
        <div id="success">
          <p>예약이 완료 되었습니다.</p>
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
          <p>로그인 먼저 진행해주세요.</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal> -->
    </div>
  </div> 
</template>
<script scoped src="@/assets/js/studioInfo/Reservation.js"></script>
<style scoped src="@/assets/css/studioInfo/reservation.css"></style>