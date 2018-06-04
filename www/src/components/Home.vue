<template>
  <div class="home container-fluid">
    <div class="main-top-style">
      <h1>Trucking Hangry</h1>
      <img src="http://placehold.it/150x150">
    </div>
    <div class="main-bottom-style">
      <form @submit.prevent="search">
        <select name="proximity" >
          <option value=""></option>
        </select>
        <button type="submit">Find that truck</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-top-style{
    background-color: orange;
    color: white;
  }
  .main-bottom-style{
    background-color: rgb(230,220,240)
  }
</style>