<template>
    <div>
        <input type=file id="cadImg" style='display: none;'> 
        <img src="../assets/img/upload/preview.png" class="uploadImg" onclick='document.getElementById("cadImg").click()'>
    </div>
</template>
<style>
.uploadImg{
    width:200px; 
    height:200px;
    }
.uploadImg:hover{
  	opacity: 0.60;
  }
</style>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>