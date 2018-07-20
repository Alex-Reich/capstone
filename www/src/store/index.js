import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//onwheels.herokuapp.com/' : '//localhost:3000/';

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

////// this function will check and see if there is a geo location to pull from the window
var getLocation = function(options){
  if(navigator.geolocation){
    return new Promise(function(resolve,reject){
      navigator.geolocation.getCurrentPosition(resolve,reject,options);

    })
  }
}

export default new vuex.Store({
  state: {
    owner: {},
    foodtrucks: [],
    activeTruck: {},
    map: {},
    userGeoLocation: {lat:0,lng:0},
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
      state.userGeoLocation.lat=payload.latitude
      state.userGeoLocation.lng=payload.longitude
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
    //  console.log("started registration")
      auth.post('register', userData)
        .then(res => {
          commit('setOwner', res.data)
        //  console.log("completed registration")
          router.push({ name: 'OwnerProfile' })
        })
        .catch(err=>{
          console.log("Error here in store",err)
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
        commit('setOwner', owner)
      })
      .catch(res => {
        console.log(res)
      })
    },
    updatePassword({ commit, dispatch}, changePassword){
      auth.post('updatePassword', changePassword)
      .then (res=>{
        console.log("Password successfully updated")
      })
    },

    addTruck({ dispatch }, truck) {
      var query = formatGeoCodeString(truck.location)
      // console.log("query= "+query)
      geoCode.get('/json?address=' + query + googleApiKey)
        .then(res=>{
          // console.log(res.data.results[0].geometry.location)
          truck.location.location = res.data.results[0].geometry.location
          // console.log("Successfully added truck")
          // console.log(res.data.results[0].geometry.location)
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
    getGeoLocation({commit}) {
      getLocation()
        .then((postion)=>{
          commit('setUserGeoLoc',postion.coords)
        })
      .catch((err)=>{
        console.log("Browser does not support geolocation")
      })
      
      //state.userGeoLocation=location
    },
    convertGeoCode({ commit, dispatch }, payload) {
      var query = formatGeoCodeString(payload)
      geoCode.get('/json?address=' + query + googleApiKey)
        .then(res => {
          console.log(res.data.results[0].geometry.location)
          console.log('geocode was converted to the above but you still need to do something with it')
        })
    }
  }
})