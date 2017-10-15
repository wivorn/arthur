<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Alex+Brush');
@import '../node_modules/vue-material/dist/vue-material.css';

body {
  margin: 0;
  height: 100%;
  background: white;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #F9F9F9;
  height: 100%;

  button {
    cursor: pointer;
  }
}
</style>
