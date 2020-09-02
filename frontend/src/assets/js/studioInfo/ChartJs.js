import Chart from 'chart.js'
import { Doughnut } from "vue-chartjs";
// import axios from "axios";

export default {
    name: 'ChartGender',
    extends: Doughnut,
    components: { Chart },
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
        console.log("bbb");
    }
}