<template>
  <div class="app">
    <input class="tgl tgl-flip" id="cb5" @change="checkFlip" type="checkbox"/>
    <label class="tgl-btn" data-tg-off="㎡" data-tg-on="평" for="cb5"></label>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    checkFlip(){
      let check = document.getElementById('cb5');
      if(check.checked){ //평
        alert("지금 평이당");
      }else{ //제곱미터
        alert("지금 제곱미터당");
      }
    }
  }
}
</script>
<style scoped>
</style>