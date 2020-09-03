
<template>
  <div class="container" id="reserveStudio">
    <aside v-for="(studio, index) in studios" v-bind:key="index">
      <div id="reservation-floating-banner">
        <form method="post" @submit.prevent="addReserve">
          <!-- ============== calender ============== -->
          <div class="input-reserve-info-field">
            <!-- 날짜 -->
            <div class="date-input-field">
              <div class="row">
              <div class="col s12 m6">
                <strong>예약 시작일</strong>
                <span class="start-date">
                  <md-datepicker 
                  v-model="start_date"
                  :md-disabled-dates="disabledDates"
                  min:today
                  max:maxDate
                  ></md-datepicker>
                </span>
                <br />
                <strong>예약 종료일</strong>
                <span class="end-date">
                  <md-datepicker 
                  v-model="end_date" 
                  :md-disabled-dates="disabledDates"></md-datepicker>
                </span>
              </div>
              </div>
            </div>
            <br />
            <!-- 시간 -->
            <div class="time-input-field">
              <md-field class="start-time">
                <label for="time">예약 시작 시간</label>
                  <md-select
                    id="start_time"
                    v-model="start_time"
                    required
                    style="width:45%">
                  <md-option
                    required="required"
                    v-for="time in times"
                    v-bind:key="time">
                    {{time}}</md-option>
                  </md-select>
                  </md-field>
                  <br/>
                  <span id="checkSchedule">{{ checkSchedule }}</span>
                  <br />
                  <md-field class="end-time">
                    <label for="time">예약 종료 시간</label>
                      <md-select id="end_time" 
                      v-model="end_time" 
                      required
                      style="width:45%"
                      >
                      <md-option
                        required="required"
                        v-for="time in times"
                        v-bind:key="time"
                        >{{ time }}</md-option
                      >
                      </md-select>
              </md-field>
            </div>
          <br />
          <br />
          <!-- 인원 -->
          <div>
            <table width="70%" align="center">
              <tr align="center" >
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
                  <input
                    type="text"
                    id="totalPeople"
                    name="totalPeople"
                    v-model="total_people"
                  />
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
        <hr width="90%" color="lightgray">
          <!-- 요금 계산 -->
          <div class="pricing-field">
            <vr/>
            <table align="center">
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
              <tr align="right">
                <td id="totalPrice">총금액 :</td>
                <td>
                  <span id="total_price"
                    >{{ totalPriceCalculate | currency }} 원</span
                  >
                </td>
              </tr>
            </table>

            <div>
              <md-button 
              type="submit" 
              align="center"
              class="md-raised md-primary"
              >예약하기
              </md-button>
            </div>
          </div>
        </form>
      </div>
    </aside>
       <!-- 모달 모아두기 -->
    <div>
      <modal name="success" adaptive="adaptive" resizable="resizable" width="30%" height="15%" :maxWidth=768>
        <div id="success">
          <p>예약이 완료 되었습니다.</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal name="regBook" adaptive="adaptive" resizable="resizable" width="30%" height="15%" :maxWidth=768>
        <div id="regBook">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
      <modal name="login-required" adaptive="adaptive" resizable="resizable" width="30%" height="15%" :maxWidth=768>
        <div id="login-required">
          <p>찜 목록에 등록했습니다</p>
          <button class="btn-small" @click="closePop()">확인</button>
        </div>
      </modal>
    </div>
  </div>
 </template>
<script scoped src="@/assets/js/studioInfo/Reservation.js"></script>

<style scoped>
.container {
  width: 100%;
}
aside {
  align-content: center;
}

#reservation-floating-banner {
  background-color: #ffff;
  /* box-shadow: 5px 9px rgb(196, 194, 194); */
  /* position: absolute; */
  width: 100%;
  padding: 3px 10px;
}
.input-reserve-info-field{  
  width:100%;
  margin: 5% auto;

}
.date-input-field{
  margin-left:10%;
  width:30%;
  float:left;
}
.time-input-field{
  width:30%;
  float:right;
  margin-right:10%;
}

#totalPeople{
  display:block;
  border-radius:10px;
  border:1px solid lightgray;
  text-align:center;
}
</style>
