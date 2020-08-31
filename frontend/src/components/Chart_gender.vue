<script>
//Importing Bar class from the vue-chartjs wrapper
import {Doughnut} from 'vue-chartjs'
import axios from "axios";
//Exporting this so it can be used in other components
export default {
  extends: Doughnut,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
            pointBackgroundColor: 'white',
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: [40, 20]
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          // // yAxes: [{
          // //   ticks: {
          // //     beginAtZero: true
          // //   },
          //   gridLines: {
          //     display: true
          //   }
          // }],
          // xAxes: [ {
          //   gridLines: {
          //     display: false
          //   }
          // }]
        },
        legend: {
            display: true
          },
        responsive: true,
        maintainAspectRatio: false
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
  },methods: {
          getGender(){
          var total = this.customers.length;
          var female=0;
          for (var i = 0; i <this.customers.length; i++) {
          if (this.customers[i].gender == "F") { //여자 수만큼 세기
              female++;
          }
        }return [female,total-female];
      }
  },

}
</script>
 