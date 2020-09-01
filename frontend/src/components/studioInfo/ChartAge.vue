

<script>
import { Doughnut } from "vue-chartjs";
import axios from "axios";

export default {
  // computed: {
  //   chartData() {
  //     var customer = this.customers;
  //     this.total =customer.length;
  //     this.female=0;
  //     for (var i = 0; i < this.total; i++) {
  //       if (this.customers[i].gender == "F") {
  //       //여자 수만큼 세기
  //         this.female++;
  //       }
  //     }
  //     alert(this.female+"|"+this.total);
  //     return [this.female,this.total];
  //   }
  // },
  extends: Doughnut,
  data() {
    return {
        female:0,
        total:0,

        datacollection: {
        datasets: [
          {
            data:chartData( ) ,
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
  },
  update(){
    //renderChart function renders the chart with the datacollection and options object.
   axios
      .get("http://127.0.0.1:7777/studio/genderRatio/10")
      .then(response => {
        alert("update");
        this.customers = response.data;        
        var customer = this.customers;
        this.total =customer.length;
        // var female=0;
        for (var i = 0; i < this.total; i++) {
        if (this.customers[i].gender == "F") {
          this.female+=1;
        }
      }
      this.data.datasets.data=[this.female,this.total-this.female];
      alert("update data");
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>