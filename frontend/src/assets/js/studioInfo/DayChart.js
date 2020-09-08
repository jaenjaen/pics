import { Bar } from "vue-chartjs";
import axios from "axios";

const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export default {
    extends: Bar,
    data() {
        return {
            reservatedLength: 0,
            repeatDateLength: 0,
            dayCount: new Array(0, 0, 0, 0, 0, 0, 0),
            datacollection: {
                datasets: [{
                    data: [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: [
                        "rgba(245, 99, 132, 1)",
                        "rgba(245, 99, 132, 2)",
                        "rgba(245, 99, 132, 3)",
                        "rgba(245, 99, 132, 4)",
                        "rgba(245, 99, 132, 5)",
                        "rgba(245, 99, 132, 6)",
                        "rgba(245, 99, 132, 7)"
                    ],
                    label: "Reservation Count per Time"
                }],
                labels: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
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
        console.log("aaa");
        axios
            .get("http://127.0.0.1:7777/studio/schedule/10")
            .then(response => {
                this.schedule = response.data;
                var reservation = this.schedule.reservation;
                this.reservationLength = reservation.length;
                var repeatDate = this.schedule.repeatDate;
                this.repeatDateLength = repeatDate.length;

                console.log()
                this.chartData(this.reservation);
                console.log(JSON.stringify(this.datacollection));
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
            // 시작 일자와 끝나는 날 차이 구함... countDay에 1일씩 더해가면서 요일 구함
            for (let i = 0; i < this.reservationLength; i++) {
                let startDay = (new Date(this.reservation[i].startDate));
                let endDay = (new Date(this.reservation[i].endDate));
                let diff = (startDay.getTime() - endDay.getTime()) / (1000 * 60 * 60);

                // 예약 시작일의 요일 숫자로 구함
                // 요일숫자 % 7
                console.log(endTime);
                for (let j = startDay; j < diff % 7; j++) {
                    // if () {

                    // }
                }
            }
            for (let i = 0; i < 24; i++) {
                this.$set(this.datacollection.datasets[0].data, i, this.timeCount[i]);
            }
        }
    },
    transDate(date, diff) {
        let startDate = new Date((new Date(date)).getFullYear, (new Date(date)).getMonth, (new Date(date)).getDate);
        let nextDate = tempDay.setDate(startDate.getDate() + i);
        return nextDate.getDay();

    }

}