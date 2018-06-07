import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Owner from '@/components/OwnerProfile'
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
    path:'/Owner/:ownerId',
    name: 'Owner',
    component: Owner
    },
    {
    path:'/Search',
    name: 'Search',
    component: Search
    }
  ]
})
