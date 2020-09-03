<template>
  <div class="container" id="chart-gender">
    <Doughnut
      :chartdata="datacollection"
      :options="options"></Doughnut>
      <button @click="fillData()">Set Chart</button>
  </div>
</template>

<script>
import Doughnut from "@/assets/js/studioInfo/GenderChart.js";
import axios from "axios";

export default {
  name: 'ChartGender',
  components: {Doughnut}, 
    data:() =>({
      // return{
      female: 2,
      total: 1,
      customers:[{}],
      datacollection: {
          labels: ['Female', 'Male'],
          datasets: [{
              label: "Gender Ratio",
              backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
              data: [0,0]
          }]
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
              animateScale: true
          }
      // }
     }
  }),
    mounted() {
        console.log("ccc");
        axios
        .get("http://127.0.0.1:7777/studio/genderRatio/10")
        .then(response => {
          this.customers = response.data;
          var customer = this.customers;
          this.total = customer.length;
          // var female=0;
          for (var i = 0; i < this.total; i++) {
          if (this.customers[i].gender == "F") {
            //여자 수만큼 세기
            this.female+=1;
          }
        }
      })
        this.fillData();
    },
    methods:{
      fillData(){
        console.log(this.female,this.total);
        this.$set(this.datacollection.datasets[0].data,0,this.female);
        this.$set(this.datacollection.datasets[0].data,1,this.total);
        // this.datacollection.datasets[0].data=this.female;
        // this.datacollection.datasets[1].data=this.total
        console.log(this.datacollection.datasets[0].data+": Last");
      },
    }
}
    // },
    // methods: {
    //   fillData(){
    //     this.datacollection= {
    //           labels: ['Female', 'Male'],
    //           datasets: [{
    //               label: "Gender Ratio",
    //               backgroundColor: ["rgba(245, 99, 132, 1)", "rgba(56, 162, 235, 1)"],
    //               data: [this.female,this.total]
    //           }]
    //       },
    //       this.options= {
    //           responsive: true,
    //           legend: {
    //               position: "top"
    //           },
    //           title: {
    //               display: true,
    //               text: "Gender Ratio"
    //           },
    //           animation: {
    //               animateScale: true
    //           }
    //       }
    //   },
      // getGenderData(){
        // console.log("ccc");
        // axios
        // .get("http://127.0.0.1:7777/studio/genderRatio/10")
        // .then(response => {
        //   this.customers = response.data;
        //   var customer = this.customers;
        //   this.total = customer.length;
        //   // var female=0;
        //   for (var i = 0; i < this.total; i++) {
        //   if (this.customers[i].gender == "F") {
        //     //여자 수만큼 세기
        //     this.female+=1;
        //   }
        // }
        // })
    //     return [this.female,this.total]
    // }
  // }

</script>