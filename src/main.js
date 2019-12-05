import Vue from "vue";
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
import App from "./App.vue";
import store from "./store";

import router from './router'
import vuetify from './plugins/vuetify';

const socket = io("wss://socket-io-tweet-stream.now.sh");
 
Vue.use(VueSocketIOExt, socket, { store });
  
store.$socket = Vue.prototype.$socket;

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");