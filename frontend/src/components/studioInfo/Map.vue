<template>
 <vue-daum-map id="daum-map"
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:500px;height:400px;"/>
</template>

<style scoped></style>
