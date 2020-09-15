import { Line } from "vue-chartjs";
import axios from "axios";
// import Vue from 'vue'
// var eventBus = new Vue();

export default {
    name: "TimeChart",
    extends: Line,
    data() {
        return {
            stuId: 0,
            reservatedLength: 0,
            timeCount: new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            datacollection: {
                datasets: [{
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    pointBorderColor: "#029BE0",
                    borderColor: '#029BE0',
                    fill: false,
                    pointBackgroundColor: 'white',
                    label: "Reservation per Time"
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
                maintainAspectRatio: true,
            }
        }
    },
    props: ["stuIdData"],
    created: function() {
        this.stuId = this.stuIdData;
        console.log(this.stuId + "Props로 데이터 받음~~!! 여긴 TimeChart");
    },
    mounted() {
        axios
            .get("http://127.0.0.1:7777/studio/schedule/" + this.stuId)
            .then(response => {
                this.reservation = response.data;
                var reservation = this.reservation;
                this.reservationLength = reservation.length;
                this.chartData(this.reservation);
                this.renderChart(this.datacollection, this.options);
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
            for (let i = 0; i < this.reservationLength; i++) {
                let startTime = parseInt((new Date(this.reservation[i].startDate)).getHours());
                let endTime = parseInt((new Date(this.reservation[i].endDate)).getHours());
                for (let j = startTime; j < endTime; j++) {
                    this.timeCount[j] += 1;
                }
            }
            for (let i = 0; i < 24; i++) {
                this.$set(this.datacollection.datasets[0].data, i, this.timeCount[i]);
            }
        }
    }
}