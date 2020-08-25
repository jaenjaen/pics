<template>
<div>
 <v-select
    multiple
    v-model="selected"
    :options="['카메라', '조명', '반사판', '포토그래퍼']"
    />
</div>
</template>
<style>
#app div *{
    margin: 2px 0;
}
span.vs__selected{
    padding: 3px 8px;
}
.style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
</style>
<script>
import Vue from 'vue'
import vSelect from 'vue-select' /* https://vue-select.org/ */
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';
export default {
  data() {
    return { 
        selected: []
        }
  }
}
</script>