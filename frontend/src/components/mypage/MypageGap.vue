<template>
  <div class="gap">
    <span clss="categroy_name"> 
    <a :href="cateogryURL"> {{categoryName}} ></a>
    </span>
  </div>
</template>

<script>
export default {
  name: "MypageGap",
  props: {
    categoryName: String,
    cateogryURL: String,
  }
};
</script>

<style scoped src="@/assets/css/mypage/gap.css"></style>