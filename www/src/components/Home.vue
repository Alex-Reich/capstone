<template>
  <div>
    <div class="home container-fluid">
      <div class="main-top-style">

        <!-- Login Modal -->
        <button type="button" class='btn btn-primary' data-toggle="modal" data-target="#loginModal">Login</button>
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="ownerLogin">
                  <div class="form-group">
                    <input type="text" name="ownerUsername" v-model="
                          login.username" class="form-control" id="formGroupExampleInput" placeholder="Username" required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="password" v-model="
                              login.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                  </div>
                  <button type="button" @click="ownerLogin" class="btn btn-primary" data-dismiss="modal">Login</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Register Modal -->
        <button type="button" class='btn btn-primary' data-toggle="modal" data-target="#registerModal">Register</button>
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="ownerRegister">
                  <div class="form-group">
                    <input type="text" name="ownerRegister" v-model="register.username" class="form-control" id="formGroupExampleInput" placeholder="Username"
                      required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="ownerRegister" v-model="register.businessName" class="form-control" id="formGroupExampleInput" placeholder="Business Name"
                      required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="email" v-model="register.email" class="form-control" id="formGroupExampleInput" placeholder="email">
                  </div>
                  <div class="form-group">
                    <input type="text" name="password" v-model="register.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                  </div>
                  <button type="button" @click="ownerRegister" class="btn btn-primary" data-dismiss="modal">Register</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <h1 class="Title">Trucking Hangry</h1>

        <img src="http://placehold.it/150x150">
      </div>
      <div class="main-bottom-style">
        <form @submit.prevent="getTrucks">
          <div class="form-group row">
            <div class="col-sm-10 offset-sm-1 text-center">
              <select class="form-control" name="proximity" v-model="search.distance" placeholder="Radius">
                  <option value="" disabled selected hidden>Radius</option>
                <option>0-5 miles</option>
                <option>5-10 miles</option>
                <option>10-15 miles</option>
                <option>15-20 miles</option>
              </select>
              <input class="form-control" type="search" placeholder="Zipcode" id="search-input" v-model="search.zipcode">
              <input class="form-control" type="search" placeholder="Truck Name" id="search-input" v-model="search.truckname">
              <select class="form-control" name="Cuisine" placeholder="Select Cuisine Type" v-model="search.cuisineType">
                <option value="" disabled selected hidden>Please Choose...</option>
                <option>Asian</option>
                <option>Mexican</option>
                <option>American</option>
                <option>Soul Food</option>
                <option>Italian</option>
                <option>Other</option>
              </select>
              <button type="submit" @click="getTrucks">Find that truck</button>
              <!--link to search component-->
            </div>
          </div>
        </form>
      </div>
    </div>
    <button @click="getGeoLocation">Geo</button>
    <form @submit.prevent="convertGeoCode">
      <input type="text" placeholder="Address" v-model="geocode.street" required>
      <input type="text" placeholder="City" v-model="geocode.city" required>
      <input type="text" placeholder="State" v-model="geocode.state" required>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>



<script>
  import router from '../router'
  import search from './Search'
  import ownerProfile from './OwnerProfile'
  export default {
    name: 'Home',
    components: {
      search,
      ownerProfile
    },
    mounted() {
      this.$store.dispatch('renderStartMap')
    },
    data() {
      return {
        login: {
          username: '',
          password: ''
        },
        register: {
          username: '',
          businessName: '',
          email: '',
          password: '',
        },
        search: {
          distance: '',
          zipcode: '',
          truckname: '',
          cuisineType: ''
        },
        userGeoLocation: {},
        geocode: {
          street: '',
          city: '',
          state: ''
        },
        windowGeoLoc: {
          lat: 0,
          lng: 0
        }
      }
    },
    computed: {

    },
    methods: {
      ownerLogin() {
        this.$store.dispatch('login', this.login)
      },
      ownerRegister() {
        this.$store.dispatch('register', this.register)
      },
      getTrucks() {
        this.$store.dispatch('getTrucks', this.search)
      },
      getGeoLocation() {
        this.$store.dispatch('getGeoLocation')
      },
      convertGeoCode() {
        this.$store.dispatch('convertGeoCode', this.geocode)
        this.geocode = { street: '', city: '', state: '' }
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

  .Title {
    font-family: 'Cabin Sketch', cursive;
  }
</style>