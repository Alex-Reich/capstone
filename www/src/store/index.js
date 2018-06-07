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

var geoLoc = axios.create({
  baseURL: 'https://www.googleapis.com/geolocation/v1/geolocate',
  timeout: 3000,
  withCredentials: true
})

var geoCode = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})

var googleApiKey = '?key=AIzaSyCp89R6XqYSrTub4SbaoOnKj2IQ-iC2RoU'

function formatGeoCodeString(obj){
  var outQuery =''
  var commaCount = 0
  for(var key in obj){
    var value = obj[key].split(' ').join('+')
    outQuery+= commaCount<2 ? value+',+' : value
    commaCount++
  }
  return outQuery
}

// function handlePermission(){
//   navigator.permissions.query({name: 'geolocation'}).then(function(result){
//     if(result.state=='granted'){
//       report(result.state);
//       geoBtn.style.display='none';
//     }else if(result.state=='prompt'){
//       report(result.state);
//       geoBtn.style.display='none';
//       navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
//     }else if(result.state=='denied'){
//       report(result.state);
//       geoBtn.style.display='inline';
//     }
//     result.onchange=function(){
//       report(result.state);
//     }
//   })
//   return result.state
// }

// function report(state){
//   console.log('Permission '+state);
// }

export default new vuex.Store({
  state: {
   owner: {},
   foodtrucks: [],
   activeTruck: {},
   map:{},
   userGeoLocation:{}
  },
  mutations:{
    setOwner(state, owner){
      state.owner = owner
    },
    deleteOwner(state){
      state.owner = {}
    },
    setActiveTruck(state, truck){
      state.activeTruck = truck
    },
    setTrucks(state, trucks){
      state.foodtrucks = trucks
    },
    setMap(state,payload){
      console.log('You called the setMap mutation and didnt write it')
    },
    setUserGeoLoc(state,payload){
      state.userGeoLocation=payload
      console.log('this is the user geoloc: ',state.userGeoLocation)
    }
  },

  actions:{
    // Owner
    login({commit, dispatch}, loginCredentials){
      auth.post('login', loginCredentials)
        .then(res=>{
          commit('setOwner', res.data)
          router.push({name: 'OwnerProfile'})
        })
    },
    logout({commit, dispatch}){
      auth.delete('/home')
      .then(res=>{
        commit('deleteOwner')
        router.push({name: 'login'})
      })
    },
    register({commit, dispatch}, userData){
      console.log(userData)
      auth.post('register', userData)
      .then(res=>{
        commit('setOwner', res.data)
        router.push({name: 'OwnerProfile'})
      })
    },

    addTruck({commit, dispatch}, owner){
      api.put('api/owners/'+owner._id, owner)
      .then (res=>{
        dispatch('getTrucks')
      })
    },
    getTrucks({commit, dispatch}){
      api.get('api/owners')
      .then(res=>{
        commit('setTrucks', res.data)
        router.push({name: "Search"})
      })
    },
    deleteOwner({commit, dispatch}, id){
      api.delete('api/owner/'+id)
      .then(res=>{
        commit('setOwner', id)
      })
    },
    viewTruck({commit, dispatch, state}, id){
      api.get('api/trucks/'+ id)
      .then(res=>{
        commit('setActiveTruck', res.data)
      })
    },

    deleteTruck({commit, dispatch, state}, id){
      api.delete('/api/owner/'+state.owner._id+'trucks/'+id)
        .then(res=>{
          dispatch('getTrucks', id)
        })
        .catch(err=>{
          console.log(err)
        })
    },

    //////////// Google Map Stuff /////////////////////
    getMap({commit,dispatch},payload){
      console.log(payload.query)
      api.post('/api/google',payload)
        .then(res=>{
          console.log(res)
        })
    },
    getGeoLocation({commit,dispatch}){
      geoLoc.post(googleApiKey)
        .then(res=>{
          commit('setUserGeoLoc',res.data.location)
        })
    },
    convertGeoCode({commit,dispatch},payload){
      var query=formatGeoCodeString(payload)
      geoCode.get('/json?address='+query+googleApiKey)
        .then(res=>{
          console.log(res.data.results[0].geometry.location)
          console.log('geocode was converted to the above but you still need to do something with it')
        })
    },
    renderStartMap({commit,dispatch,state}){
      
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