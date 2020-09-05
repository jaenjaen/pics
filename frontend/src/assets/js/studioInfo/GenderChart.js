// import { Doughnut } from "vue-chartjs";
// export default {
//     extends: Doughnut,
//     data() {
//         return {
//             datacollection: {
//                 labels: ['Female', 'Male'],
//                 datasets: [{
//                     label: "Gender Ratio",
//                     backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
//                     data: [10, 1]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 legend: {
//                     position: "top"
//                 },
//                 title: {
//                     display: true,
//                     text: "Gender Ratio"
//                 },
//                 animation: {
//                     animateScale: true,

//                 }
//             }
//         }
//     },

//     mounted() {
//         console.log("js file loaded");
//         this.renderChart(this.datacollection, this.options)
//         console.log("js file loaded : " + this.datacollection);
//     },
// }
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.datacollection, this.options)
    }
}