<template>
<div>

          <button class='btn btn-primary'>Edit Profile</button>


 <!-- Register Modal -->
          <button type="button" class='btn btn-primary' data-toggle="modal" data-target="#checkinModal">Check In</button>
          <div class="modal fade" id="checkinModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Check In</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form v-on:submit.prevent="register">
                    <div class="form-group">
                      <input type="text" name="ownerRegister" v-model="register.username" class="form-control" id="formGroupExampleInput" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                      <input type="text" name="email" v-model="register.email" class="form-control" id="formGroupExampleInput" placeholder="email">
                    </div>
                    <div class="form-group">
                      <input type="text" name="password" v-model="register.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="login" class="btn btn-primary" data-dismiss="modal">Login</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>

      <h1>Trucking Hangry</h1>

</div>
</template>



<script>

</script>



<style>

</style>