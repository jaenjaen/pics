<style>
body{background:white}
input[id="cb2"] + label {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid #BDBDBD;
  cursor: pointer;
}
input[id="cb2"]:checked + label {
  background-color: #CEF279;
}
input[id="cb2"] {
  display: none;
}
</style>
<template>
<div>
  <h3>Circle Checkbox</h3> 
  <input type="checkbox" id="cb2"> 
  <label for="cb2"></label>
</div>
</template>
