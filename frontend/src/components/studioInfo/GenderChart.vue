<template>
  <div class="container" id="chart-gender">
    <Doughnut
      :chartdata="datacollection"
      :options="options"></Doughnut>
      <!-- <button @click="fillData()">Set Chart</button> -->
  </div>
</template>


<script>
import axios from "axios";
import Doughnut from "@/assets/js/studioInfo/GenderChart.js";

export default {
    extends: Doughnut,
    data() {
        return {
            reservatedLength: 0,
            timeCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            datacollection: {
                datasets: [{
                    data: [],
                    backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
                    label: "Reservation Count per Time"
                }],
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        alert("aaa");
        axios
            .get("http://127.0.0.1:7777/studio/reservation/10")
            .then(response => {
                this.reservation = response.data;
                this.reservatedLength = response.data.length;
                console.log(this.reservated);
                this.chartData();
                console.log("b1 :: " + JSON.stringify(this.datacollection));
                this.renderChart(this.datacollection, this.options);
                console.log("bbb");
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        chartData() {
            // 라벨은 시간대 
            // this.timeCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            // 시간대별 reservation 개수
            for (let i = 0; i < 3; i++) {
                let startTime = parseInt((new Date(this.reservated[i].startDate)).getHours());
                let endTime = parseInt((new Date(this.reservated[i].endDate)).getHours());
                console.log(endTime);
                for (let j = startTime; j < endTime; j++) {
                    this.timeCount[j] += 1;
                }
            }
            for (let i = 0; i < this.times.length; i++) {
                this.$set(this.datacollection.datasets[0].data, i, this.timeCount[i]);
            }

            // this.$set(this.datacollection.datasets[0].data, 0, this.female);
            // this.$set(this.datacollection.datasets[0].data, 1, (this.total - this.female));

            console.log(this.timeCount);
        },
        // transDate(date) {
        //     if (date != null) {
        //         let splitDate = date.split('-');
        //         let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getTime();
        //         return resultDate;
        //     }
        // },
        // transWeekDay(date) {
        //     if (date != null) {
        //         let splitDate = date.split('-');
        //         let resultDate = (new Date(splitDate[0], splitDate[1], splitDate[2])).getDay();
        //         return resultDate;
        //     }
        // },
        // checkCloseDate() {
        //     this.endDay = this.transDay(this.end_date);
        //     if (this.repeatedDays.indexOf(week[this.endDay], 0) > -1) { //일치하는 요일의 종료 시간 가져오기
        //         console.log("week[this.endDay] : " + week[this.endDay] + "| this.repeatedDays" + this.repeatedDays)
        //         return 1;
        //     } else {
        //         return 0;
        //     }
        // },
    }
}
</script>