<script>
import { Doughnut } from "vue-chartjs";
import axios from "axios";

export default {
  methods: {
    chartData() {
      var customer = this.customers;
      var total =customer.length;
      var female=0;
      for (var i = 0; i < total; i++) {
        if (this.customers[i].gender == "F") {
        //여자 수만큼 세기
          female++;
        }
      }
      alert(female+"|"+total);
      return [female,total];
    }
  },
  extends: Doughnut,
  data() {
    return {
      female:0,
      total:0,
      datacollection: {
        datasets: [
          {
            data: this.chartData(),
            backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
            label: "Gender Ratio"
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
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
    axios
      .get("http://127.0.0.1:7777/studio/genderRatio/10")
      .then(response => {
        this.customers = response.data;
        console.log(this.customers[0].gender + " : customer[0] gender");
        console.log(this.customers[1].gender + " : customer[1] gender");        
        var customer = this.customers;
        this.total =customer.length;
        // var female=0;
        for (var i = 0; i < this.total; i++) {
        if (this.customers[i].gender == "F") {
          //여자 수만큼 세기
          this.female+=1;
        }
      }console.log(this.female + " : this.female");
        console.log(this.total + " : this.total");
        this.chartData();
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
    
    // window.addEventListener("load", () => {
    //   this.datacollection.total = this.customers.length;
    //   for (var i = 0; i < this.datacollection.customers.length; i++) {
    //     if (this.datacollection.customers[i].gender == "F") {
    //       //여자 수만큼 세기
    //       this.datacollection.female++;
    //     }
    //   }
    // });
  }
}
</script>