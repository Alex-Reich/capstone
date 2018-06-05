<template>
  <div class="google-map" :id="truck-locations">
    
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
   export default {
     name: 'Map',
     data(){
       return
     }
   }
</script>

<style>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>