import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchResult from '@/components/SearchResult'
import PlayerProfile from '@/components/PlayerProfile'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: SearchResult,
    },
    {
      path: '/playerprofile/:accountId',
      name: 'PlayerProfile',
      component: PlayerProfile,
    },
  ]
});
router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next();
})

export default router;
