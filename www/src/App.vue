<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Palanquin Dark', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.btn1{
  border-radius: 15%;
  border-color: #f1c550;
  background-color: #f1c550;
}
.btn2{
  border-radius: 15%;
  border-color: #ff6600;
  background-color: #ff6600;
}
</style>
