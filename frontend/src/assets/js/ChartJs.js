// // import { Doughnut } from 'vue-chartjs'
// // import axios from "axios";

// export const genderChartData = {
//         type: "Doughnut",
//         data: {
//             //Data to be represented on x-axis
//             labels: ['Female', 'Male'],
//             datasets: [{
//                 label: 'User Proportion By Gender',
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                 ],
//                 pointBackgroundColor: 'white',
//                 pointBorderColor: '#249EBF',
//                 //Data to be represented on y-axis
//                 data: [30, 20]

//             }]
//         },
//         //Chart.js options that controls the appearance of the chart
//         options: {
//             scales: {},
//             legend: {
//                 display: true
//             },
//             responsive: true,
//             maintainAspectRatio: false
//         }
//     }
//     // mounted() {
//     //     //renderChart function renders the chart with the datacollection and options object.
//     //     this.renderChart(this.datacollection, this.options)
//     // },
//     // methods: {
//     //     getGender: function() {
//     //         axios
//     //             .get("http://127.0.0.1:7777/studio/genderRatio/10")
//     //             .then(response => {
//     //                 this.customers = response.data
//     //                 var customers = this.customers
//     //                 this.total = customers.length
//     //                 alert(this.total) //2
//     //                 console.log("mounted는 넘긴 total: +" + this.total)
//     //             })
//     //         alert("메소드 들왔고만")
//     //         for (var i = 0; i < this.total; i++) {
//     //             if (this.customers[i].gender == "F") { //여자 수만큼 세기
//     //                 alert("if문까지 왔고만")
//     //                 this.female += 1;
//     //             }
//     //             console.log("리턴 직전의 메서드 : +" + this.female, this.total)
//     //             return [this.female, this.total];
//     //         }
//     //     }
//     // },

// // }
// export default genderChartData;