
<template>
  <div class="container" id="reserveStudio">
    <aside v-for="(studio, index) in studios" v-bind:key="index">
      <div id="reservation-floating-banner">
        <form method="post" @submit.prevent="addReserve">
          <!-- ============== calender ============== -->
          <!-- 날짜 -->
          <div class="row">
            <div class="col s12 m6">
              <div class="date-input-field">
                [대여 시작 일자]
                <!-- <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  v-model="start_date"
                  required="required"
                  min="this.today"
                 />
                </div> -->
                <div>
                  <md-datepicker 
                  v-model="selectedDate" 
                  :md-disabled-dates="disabledDates"></md-datepicker>
                </div>
                <br />
                <div class="date-input-field">
                  [대여 종료 일자]
                  <md-datepicker 
                  v-model="selectedDate" 
                  :md-disabled-dates="disabledDates"></md-datepicker>
                </div>
                <!-- <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  v-model="end_date"
                  required="required"
                  min="this.start_date"
                /> -->
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <!-- 시간 -->
          <div>
            [시작 시간]
            <span>
              <select
                id="start_time"
                v-model="start_time"
                required
                style="width:50%"
              >
                <option disabled value="예약 시작 시간"></option>
                <option
                  v-for="time in times"
                  v-bind:key="time"
                  required="required"
                  >{{ times[time - 1] }}</option
                >
              </select>
            </span>
            <div id="checkSchedule">{{ checkSchedule }}</div>
            <br /><br />
            [종료 시간]
            <span>
              <select id="end_time" v-model="end_time" style="width:50%">
                <option disabled value="예약 시작 시간"></option>
                <option v-for="time in times" v-bind:key="time">{{
                  times[time - 1]
                }}</option>
              </select>
            </span>
          </div>
          <br />
          <br />
          <!-- 인원 -->
          <div>
            <table width="70%" align="center">
              <tr>
                <td>
                  <button
                    id="deletePeopleBtn"
                    @click.prevent="deletePeople()"
                    style="display:inline"
                  >
                    -
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    id="totalPeople"
                    name="totalPeople"
                    width="0.2em"
                    style="border-radius:10px;"
                    align-center="true"
                    v-model="total_people"
                  />
                </td>

                <td>
                  <button
                    id="addPeopleBtn"
                    @click.prevent="addPeople()"
                    style="display:inline"
                  >
                    +
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <!-- 요금 계산 -->
          <div>
            <hr />
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
              <input type="submit" align="center" value="예약하기" />
            </div>
          </div>
        </form>
      </div>
    </aside>
  </div>
</template>
<script scoped src="@/assets/js/studioInfo/Reservation.js"></script>

<style scoped>
.container {
  width: 768px;
  
}
aside {
  margin-left: 5%;
  border: 1px solid ffff;
}
#reservation-floating-banner {
  background-color: #ffff;
  /* box-shadow: 5px 9px rgb(196, 194, 194); */
  /* position: absolute; */
  width: 100%;
  padding: 3px 10px;
  border-radius: 10px;
  
}
</style>
