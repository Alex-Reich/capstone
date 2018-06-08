import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OwnerProfile from '@/components/OwnerProfile'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    path:'/Owner',
    name: 'OwnerProfile',
    component: OwnerProfile
    },
    {
    path:'/Search',
    name: 'Search',
    component: Search
    }
  ]
})
