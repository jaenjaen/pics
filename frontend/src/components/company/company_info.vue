<template>
  <div class="info_container">
    <div class="base_info">
      <p class="name">{{company.name}}</p>
      <img class="logoImg" :src="com_imgUrl(company.logoImg)" />
      <div>
        <p>{{company.description}}</p>
      </div>
    </div>
    <div class="host_info">
      <p>호스트 공간</p>
    </div>
  </div>
</template>

<script src="@/assets/js/company/company_info.js"></script>

<style scoped src="@/assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="@/assets/css/company/company_info.css">
</style>
