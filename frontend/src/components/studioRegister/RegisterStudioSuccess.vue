<template>
  <div class="app">
      층수 <input type="text" id="floor"><br/>
      면적 <input type="text" id="size"><br/>
      시간당 대여료 <input type="text" id="unitPrice"><br/>
      1인 추가시 대여료 <input type="text" id="excharge"><br/>
      기본 인원 <input type="text" id="defaultCapacity"><br/>
      최대 인원 <input type="text" id="maxCapacity"><br/>
      주차 대수 <input type="text" id="parking"><br/>
      <button @click="checkNumber">클릭</button>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods: {
    checkNumber(){
            let floor = document.getElementById('floor').value;
            let size = document.getElementById('size').value;
            let unitPrice = document.getElementById('unitPrice').value;
            let excharge = document.getElementById('excharge').value;
            let defaultCapacity = document.getElementById('defaultCapacity').value;
            let maxCapacity = document.getElementById('maxCapacity').value;
            let parking = document.getElementById('parking').value;
            let isNumeric = [{
                check: size,
                message: "면적을 1 이상의 숫자로 입력하세요."
            }, {
                check: parking,
                message: "주차 대수를 0 이상의 정수로 입력하세요"
            }, {
                check: floor,
                message: "층수를 1 이상의 정수로 입력하세요."
            }, {
                check: unitPrice,
                message: "시간당 대여료를 1 이상의 정수로 입력하세요."
            }, {
                check: excharge,
                message: "1인 추가시 대여료를 1 이상의 정수로 입력하세요."
            }, {
                check: defaultCapacity,
                message: "기본 인원을 1 이상의 정수로 입력하세요"
            }, {
                check: maxCapacity,
                message: "최대 인원을 1 이상의 정수로 입력하세요",
            }];
            for(let i=0; i<isNumeric.length; i++){
              let temp = Number(isNumeric[i].check);
              if(i == 0){ //면적
                if(isNaN(temp) || temp < 1){
                  alert(isNumeric[i].message);
                  return false;
                }
              }else if(i == 1){ //주차대수
                if(Number.isInteger(temp) && temp >= 0){
                  continue;
                }else{
                alert(isNumeric[i].message);
                return false;
                }
              }else{ //층수, 시간당 대여료, 1인 추가시 대여료, 기본 인원, 최대 인원
                if(Number.isInteger(temp) && temp >= 1){
                  continue;
                }else{
                alert(isNumeric[i].message);
                return false;
                }
              }
            }
        }
    }
  }
</script>