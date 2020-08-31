import axios from "axios"; //axios
// import { Chart } from 'chart.js';
import { Doughnut } from 'chart.js';
// import { Bar } from 'chart.js';

export default {
    name: "doughnut-chart-area",
    extends: Doughnut,
    props: ["datacollection", "options"],
    data() {
        return {
            // studio 관련 변수 (GET)
            // 상태 체크 변수
            loading: true,
            errored: false,

            //차트 데이터 변수
            //1. 성별
            customers: {},
            female: 0,
            total: 0,

            datacollection: {
                //X축 데이터
                labels: ["Female", "Male"],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: [this.female / this.total, (this.total - this.female) / this.total]
                }]
            },
            //Chart.js options that controls the appearance of the chart
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '성별 이용 비율'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        }
    },
    mounted() {
        //renderChart function renders the chart with the datacollection and options object.
        this.renderChart(this.datacollection, this.options)
        axios
            .get("http://127.0.0.1:7777/studio/genderRatio/10")
            .then(response => {
                this.customers = response.data
                console.log(this.customers);
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });

        axios
        // .get("http://127.0.0.1:7777/studio/ageRatio/10")
        // .then(response => {
        //     this.customers = response.data
        //     console.log(this.schedule);
        // })
        // .catch(error => {
        //     console.log(error);
        //     this.errored = true;
        // })
        // .finally(() => {
        //     this.loading = false;
        // });

        window.addEventListener('load', () => {
            var count = 0;
            this.total = this.customers.length;
            for (var i = 0; i < this.customers.length; i++) {
                if (this.customers[i].gender == "F") { //여자 수만큼 세기
                    count++;
                }
            }
            this.female = count;
        })

    }
}