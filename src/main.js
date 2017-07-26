// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import Vuex from 'vuex'
import store from './store/store.js'

import axios from 'axios'

import VueLazyload from 'vue-lazyload'




Vue.use(VueLazyload)
Vue.use(Vuex)
Vue.use(ElementUI, { locale })



Vue.prototype.$axios = axios
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
