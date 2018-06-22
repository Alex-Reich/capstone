import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//heroku' : '//localhost:3000/';

vue.use(vuex)

var api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})
var auth = axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 3000,
  withCredentials: true
})

////// geoLoc and geoCode are for making google requests to get the lat and lng
var geoLoc = axios.create({
  baseURL: 'https://www.googleapis.com/geolocation/v1/geolocate',
  timeout: 3000,
  withCredentials: true
})

var geoCode = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})
/////// this is my-WD API Key do not reuse!!! 
var googleApiKey = '?key=AIzaSyCp89R6XqYSrTub4SbaoOnKj2IQ-iC2RoU'

////// this function is for formatting an object that is an address into a string that can be sent to google geocode.
function formatGeoCodeString(obj) {
  var outQuery = ''
  var commaCount = 0
  for (var key in obj) {
    var value = obj[key].split(' ').join('+')
    outQuery += commaCount < 2 ? value + ',+' : value
    commaCount++
  }
  return outQuery
}

////// this will return the position
function returnPosition(position){
  console.log("This is your latitude: "+position.coords.latitude+ "\nThis is your longitude: "+position.coords.longitude)
}

////// this function will check and see if there is a geo location to pull from the window
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(returnPosition);
  }
  else{
    var outString = "Geolocation is not supported by this browser."
    return outString
  }
}

export default new vuex.Store({
  state: {
    owner: {},
    foodtrucks: [],
    activeTruck: {},
    map: {},
    userGeoLocation: {},
    //entering new truck
    geoLocationTruck: {}
  },
  mutations: {
    /////////// Owner Mutations ////////////////
    setOwner(state, owner) {
      state.owner = owner
    },
    deleteOwner(state) {
      state.owner = {}
    },
    setActiveTruck(state, truck) {
      state.activeTruck = truck
    },
    setTrucks(state, trucks) {
      state.foodtrucks = trucks
    },
    updateOwnerTrucks(state, trucks){
      state.owner.foodtrucks=trucks
    },
    /////////// Map Mutations ////////////////
    setMap(state, payload) {
      console.log('You called the setMap mutation and didnt write it')
    },
    setUserGeoLoc(state, payload) {
      state.userGeoLocation = payload
      console.log('this is the user geoloc: ', state.userGeoLocation)
    },
    setGeoTruckLocation(state, truckLoc) {
      state.geoLocationTruck = truckLoc
    }
  },

  actions: {
    //////////////////// The AUTH Actions ///////////////////
    login({ commit }, loginCredentials) {
      auth.post('login', loginCredentials)
        .then(res => {
          console.log('Successfully logged in')
          console.log(res.data)
          commit('setOwner', res.data.data)
          router.push({ name: 'OwnerProfile' })
        })
    },
    logout({ commit }) {
      auth.delete('logout')
        .then(res => {
          commit('deleteOwner')
          router.push({ name: 'Home' })
        })
    },
    register({ commit }, userData) {
      console.log(userData)
      auth.post('register', userData)
        .then(res => {
          commit('setOwner', res.data)
          router.push({ name: 'OwnerProfile' })
        })
    },
    authenticate({ commit }) {
      auth.get('/authenticate')
        .then(res => {
          commit('setOwner', res.data)
          router.push({ name: 'OwnerProfile' })
        })
        .catch(res => {
          console.log(res)
        })
    },
    /////////////// The Owner Actions /////////////////////////
    deleteOwner({ commit }, id) {
      api.delete('api/owners/' + id)
        .then(res => {
          commit('setOwner', id)
        })
    },
    updateOwner({ commit }, owner){
      console.log(owner)
      api.put('api/owners/' + owner._id, owner)
      .then(res=>{
        console.log(res.data.message)
        commit('setOwner', owner._id)
      })
      .catch(res => {
        console.log(res)
      })
    },
    addTruck({ dispatch }, truck) {
      var query = formatGeoCodeString(truck.location)
      geoCode.get('/json?address=' + query + googleApiKey)
        .then(res=>{
          truck.location = res.data.results[0].geometry.location
          api.put('api/owners/' + truck.parentId+ '/trucks', truck)
            .then(res=> {
              dispatch('getTrucks', truck.parentId)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getAllTrucks({ commit }) {
      api.get('api/trucks')
        .then(res => {
          console.log("the store got back these trucks",res.data)
          commit('setTrucks', res.data)
          // router.push({name: "Search"})
        })
    },
    getTrucks({ commit }, ownerid){
      api.get('api/owner/'+ownerid+'/trucks')
        .then(res=>{
          commit('updateOwnerTrucks',res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    viewTruck({ commit }, id) {
      api.get('api/trucks/' + id)
        .then(res => {
          commit('setActiveTruck', res.data)
        })
    },
    editTruck({ dispatch }, truck){
      api.put('api/owners/'+truck.parentId+'/trucks/'+truck._id)
      .then(res=>{
        dispatch('getTrucks', truck.parentId)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteTruck({ dispatch, state }, id) {
      api.delete('/api/owner/' + state.owner._id + '/trucks/' + id)
        .then(res => {
          dispatch('getTrucks', state.owner._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ////////////////////// Google Map Actions /////////////////////
    getMap({ commit, dispatch }, payload) {
      console.log(payload.query)
      api.post('/api/google', payload)
        .then(res => {
          console.log(res)
        })
    },
    getGeoLocation() {
      // geoLoc.post(googleApiKey)
      //   .then(res => {
      //     commit('setUserGeoLoc', res.data.location)
      //   })
      getLocation();
    },
    convertGeoCode({ commit, dispatch }, payload) {
      var query = formatGeoCodeString(payload)
      geoCode.get('/json?address=' + query + googleApiKey)
        .then(res => {
          console.log(res.data.results[0].geometry.location)
          console.log('geocode was converted to the above but you still need to do something with it')
        })
    },
    renderStartMap({ commit, dispatch, state }) {

      // if (handlePermission()) {
      //   navigator.permissions.query({ name: 'geolocation' }).then(res => {
      //     switch (res.state) {
      //       case "granted":
      //         var test = navigator.geolocation.getCurrentPosition(position => {
      //           this.position = position
      //           this.windowGeoLoc = {
      //             lat: this.position.coords.latitude,
      //             lng: this.position.coords.longitude
      //           }
      //           this.$store.commit('setUserGeoLoc', this.windowGeoLoc)
      //         })
      //         break;
      //     }
      //   })
      // }
      // else {
      //   console.log('Geolocation is not supported by this browser.')
      // }      
    }

  }
})