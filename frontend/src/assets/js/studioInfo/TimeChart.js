import { Line } from "vue-chartjs";
import axios from "axios";

export default {
    name: "TimeChart",
    extends: Line,
    data() {
        return {
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
                            display: false
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
    mounted() {
        console.log("aaa");
        axios
            .get("http://127.0.0.1:7777/studio/reservation/10")
            .then(response => {
                this.reservation = response.data;
                var reservation = this.reservation;
                this.reservationLength = reservation.length;
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
            for (let i = 0; i < this.reservationLength; i++) {
                let startTime = parseInt((new Date(this.reservation[i].startDate)).getHours());
                let endTime = parseInt((new Date(this.reservation[i].endDate)).getHours());
                console.log(endTime);
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