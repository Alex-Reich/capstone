<template>
  <div class="home container-fluid">
    <div class="main-top-style">

<<<<<<< HEAD
      <!-- <button type="button" class='btn btn-link' data-toggle="modal" data-target="#createLoginModal">Login</button>
          Modal -->
      <!-- <div class="modal fade" id="createLoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
=======
<<<<<<< HEAD
<button type="button" class='btn btn-link' data-toggle="modal" data-target="#createLoginModal">Login</button>
          <!-- Modal -->
=======
<!-- <button type="button" class='btn btn-link' data-toggle="modal" data-target="#createLoginModal">Login</button>
          Modal -->
>>>>>>> aaba149532541943cdea025e0d21b37e13ea93b6
          <!-- <div class="modal fade" id="createLoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
>>>>>>> e22b9aaa8c146254528425514d199bde3316ced3
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form v-on:submit.prevent="login">
                    <div class="form-group">
                      <input type="text" name="loginUsername" v-model="
                          user.username" class="form-control" id="formGroupExampleInput" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                      <input type="text" name="Password" v-model="
                              user.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" @click="login" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
              </div>
            </div>
          </div> -->

      <button type="submit">Register</button>
      <h1>Trucking Hangry</h1>
      <img src="http://placehold.it/150x150">
    </div>
    <div class="main-bottom-style">
      <form @submit.prevent="search">
<<<<<<< HEAD
        <div class="form-group row">
          <div class="col-10">
            <select class="form-control" name="proximity">
              <option>0-5 miles</option>
              <option>5-10 miles</option>
              <option>10-15 miles</option>
              <option>15-20 miles</option>
            </select>
            <input class="form-control" type="search" placeholder="Zip Code" value="Zip Code" id="search-input">
            <input class="form-control" type="search" value="Truck Name" id="search-input">
            <input class="form-control" type="search" value="Cuisine Type" id="search-input">
            <select class="form-control" name="Cuisine" placeholder="Cuisine Type">
                <option>Asian</option>
                <option>Mexican</option>
                <option>American</option>
                <option>Soul Food</option>
                <option>Italian</option>
                <option>Other</option>
              </select>
            <button type="submit">Find that truck</button>
          </div>
        </div>
=======
        <select name="proximity">
          <option value=""></option>
        </select>
        <button type="submit">yo</button>
>>>>>>> e22b9aaa8c146254528425514d199bde3316ced3
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
  .main-top-style {
    background-color: orange;
    color: white;
  }

  .main-bottom-style {
    background-color: rgb(230, 220, 240)
  }
</style>