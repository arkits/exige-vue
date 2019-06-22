import Vue from "vue";
import VueNativeSock from 'vue-native-websocket'

import "./plugins/vuetify";

import App from "./App.vue";
import store from "./store";

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
  
Vue.use(VueNativeSock, 'wss://echo.websocket.org', { 
    store: store,
    mutations: mutations,
    connectManually: true
})

store.$socket = Vue.prototype.$socket;

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");