import { Doughnut } from "vue-chartjs";
import axios from "axios";
export default {
  methods: {
    randomScalingFactor() {
      this.datacollection.total = this.customers.length;
      for (var i = 0; i < this.datacollection.customers.length; i++) {
        if (this.datacollection.customers[i].gender == "F") {
          //여자 수만큼 세기
          this.datacollection.female++;
        }
      }
    }
  },
  extends: Doughnut,
  data() {
    return {
      datacollection: {
        female: 0,
        total: 0,
        customers: [{}],

        datasets: [
          {
            data: this.randomScalingFactor(),
            backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            label: "Dataset 1"
          }
        ],
        labels: ["Female", "Male"]
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "쇼핑몰 별 상품수"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
    axios
      .get("http://127.0.0.1:7777/studio/genderRatio/10")
      .then(response => {
        this.customers = response.data;
        console.log(this.customers);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
    console.log(this.customers[1].gender + " : customer gender");
    console.log(this.datacollection.female + " : this.datacollection.female.");
    window.addEventListener("load", () => {
      this.datacollection.total = this.customers.length;
      for (var i = 0; i < this.datacollection.customers.length; i++) {
        if (this.datacollection.customers[i].gender == "F") {
          //여자 수만큼 세기
          this.datacollection.female++;
        }
      }
    });
  }
};
