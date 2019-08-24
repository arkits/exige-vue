import Vue from "vue";
import VueNativeSock from 'vue-native-websocket';

import App from "./App.vue";
import store from "./store";

import router from './router'
import vuetify from './plugins/vuetify';

import {
    SOCKET_ONOPEN,
    SOCKET_ONCLOSE,
    SOCKET_ONERROR,
    SOCKET_ONMESSAGE,
    SOCKET_RECONNECT,
    SOCKET_RECONNECT_ERROR
  } from './store/mutation-types'

const mutations = {
    SOCKET_ONOPEN,
    SOCKET_ONCLOSE,
    SOCKET_ONERROR,
    SOCKET_ONMESSAGE,
    SOCKET_RECONNECT,
    SOCKET_RECONNECT_ERROR
  }
  
  Vue.use(VueNativeSock, 'ws://localhost:1234/testbed/sndem/uamposition', { 
      store: store,
      mutations: mutations,
      connectManually: true
  })
  
  store.$socket = Vue.prototype.$socket;

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");