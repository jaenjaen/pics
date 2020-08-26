<template>
  <div>
    <vue-multi-select
      ref="multiSelect"
      v-model="option_save"
      search
      historyButton
      :options="option_flags"
      :filters="option_filters"
      :btnLabel="btnLabel"
      :selectOptions="option_list">
      <template v-slot:option="{option}">
        <input type="checkbox" name="optionCheck" :checked="option.selected"/>
        <span name="optionName">{{option.name}}</span>
      </template>
    </vue-multi-select>
  </div>
</template>

<script>
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';

export default {
  data() {
    return {
      btnLabel: option_save => `장비 및 옵션 (${option_save.length})`,
      option_save: [],
      option_list: [{
        name: '장비 및 옵션',
        list: [
          { name: '카메라' },
          { name: '조명' },
          { name: '반사판' },
          { name: '포토그래퍼' }
        ],
      }],
      option_filters: [{
        nameAll: '전체선택',
        nameNotAll: '전체선택 해제',
        func() {
          return true;
        },
      }],
      option_flags: {
        multi: true,
        groups: true,
      },
    };
  },
  components: {
    vueMultiSelect,
  },
};
/*
var optionName = document.getElementsByName('optionName');
      for(let i=0; i<optionName.length; i++){
        var optionCheck = document.getElementsByName('optionCheck');
        if(optionCheck[i].checked){
          alert(optionName[i].innerHTML);
        }
      }
*/
</script>
