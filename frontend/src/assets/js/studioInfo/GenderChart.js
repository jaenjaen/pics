import { Doughnut } from "vue-chartjs";
import axios from "axios";

export default {
    extends: Doughnut,
    data() {
        return {
            female: 0,
            total: 0,
            datacollection: {
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
                    label: "Gender Ratio"
                }],
                labels: ["Female", "Male"]
            },
            options: {
                responsive: true,
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Gender Ratio"
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
    },
    mounted() {
        console.log("aaa");
        axios
            .get("http://127.0.0.1:7777/studio/genderRatio/10")
            .then(response => {
                this.customers = response.data;
                // console.log(this.customers[0].gender + ": customer[0] gender");
                // console.log(this.customers[1].gender + ": customer[1] gender");
                var customer = this.customers;
                this.total = customer.length;
                // var female=0;
                // for (var i = 0; i < this.total; i++) {
                //     if (this.customers[i].gender === "F") {
                //         //여자 수만큼 세기
                //         this.female += 1;
                //     }
                // }
                this.chartData();
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
            console.log("ccc");
            // var customer = this.customers;
            // this.total = customer.length;
            // this.female = 0;
            for (var i = 0; i < this.total; i++) {
                if (this.customers[i].gender === "F") {
                    //여자 수만큼 세기
                    this.female++;
                }
            }
            this.$set(this.datacollection.datasets[0].data, 0, this.female);
            this.$set(this.datacollection.datasets[0].data, 1, this.total);
            console.log(this.female + " | " + this.total);
        }
    }
}