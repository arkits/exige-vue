import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Timeline from './views/Timeline.vue'

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
      path: '/exige/timeline',
      name: 'timeline',
      component: Timeline
    }
  ]
})
