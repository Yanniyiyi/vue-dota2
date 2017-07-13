import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchResult from '@/components/SearchResult'
import PlayerProfile from '@/components/PlayerProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: SearchResult,
    },
    {
      path: '/playerprofile',
      name: 'PlayerProfile',
      component: PlayerProfile,
    },
  ]
})
