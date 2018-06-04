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

export default new vuex.Store({
  state: {
   
  },
  mutations:{

  },
  actions:{
    
  }
})