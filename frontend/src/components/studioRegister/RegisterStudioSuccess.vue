<template>
  <div class="app">
      <div class="grid12-6">
      <img src="@/assets/img/upload/preview.png">
          <button @click="clickEvent">삭제</button>
    </div>
  </div>
</template>
<style scoped>
  .grid12-6{
     position:relative;
}
.grid12-6 button{
   position:absolute;
     top:90%;
     left:50%;
     transform:translate(-50%,-50%);
     text-align:center;
     background:#aaa;
     color:#fff;
     font-weight:bold;
     font-size:16px;
     border:none;
     padding:10px 30px;
}
</style>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    clickEvent(){
      alert("안뇽");
    }
  }
}
</script>