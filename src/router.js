import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/exige',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/exige/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
