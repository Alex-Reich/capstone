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

export default new vuex.Store({
  state: {
   owner: {},
   foodtrucks: [],
   activeTruck: {}
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
    }
  },

  actions:{
    // Owner
    login({commit, dispatch}, loginCredentials){
      auth.post('login', loginCredentials)
        .then(res=>{
          commit('setOwner', res.data)
          router.push({name: 'Home'})
        })
    },
    logout({commit, dispatch}){
      auth.delete('/logout')
      .then(res=>{
        commit('deleteOwner')
        router.push({name: 'login'})
      })
    },
    register({commit, dispatch}, userData){
      auth.post('register', userData)
      .then(res=>{
        commit('setOwner', res.data)
        router.push({name: 'Home'})
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
      })
    },
    deleteOwner({commit, dispatch}, id){
      api.delete('api/owner/'+id)
      .then(res=>{
        commit('updateOwners', id)
      })
    },
    viewTruck({commit, dispatch, state}, truckId){
      api.get('api/trucks/'+truckId)
      .then(res=>{
        commit('setActiveTruck', res.data)
      })
    },
    updateOwners({state}, foodtruckid){
      var index=state.owner.foodtrucks.findIndexById(foodtruck =>{
        return foodtruck._id == foodtruckid
      })
      state.owner.splice(index, 1)
    },
    deleteTruck({commit, dispatch, state}, id){
      api.delete('/api/owner/'+state.owner._id+'trucks/'+id)
        .then(res=>{
          dispatch('getTrucks', id)
        })
        .catch(err=>{
          console.log(err)
        })
    }

  }
})