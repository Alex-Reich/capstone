import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//heroku' : '//localhost:3000/';

vue.use(vuex)

var server = axios.create({
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
   
  },
  mutations:{

  },
  actions:{
    
    // login({commit, dispatch}, loginCredentials){
    //   auth.post('login', loginCredentials)
    //     .then(res=>{
    //       commit('setOwner', res.data)
    //       router.push({name: 'Home'})
    //     })
    // },
    // logout({commit, dispatch}){
    //   auth.delete('/logout')
    //   .then(res=>{
    //     commit('deleteUser')
    //     router.push({name: 'login'})
    //   })
    // },
    // register({commit, dispatch}, userData){
    //   auth.post('register', userData)
    //   .then(res=>{
    //     commit('setUser', res.data)
    //     router.push({name: 'Home'})
    //   })
    // },

  }
})