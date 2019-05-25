import Vuex from 'vuex';
import Vue from 'vue';

import {
    SOCKET_ONOPEN,
    SOCKET_ONCLOSE,
    SOCKET_ONERROR,
    SOCKET_ONMESSAGE,
    SOCKET_RECONNECT,
    SOCKET_RECONNECT_ERROR
} from './mutation-types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        socket_operations: [{
            gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
            uss_name: "uamalpha.arc.nasa.gov",
            state: "ACTIVE",
            operation_volumes: [{
                type: "Polygon",
                coordinates: [
                    [
                        [-118.91601562499999, 36.84446074079564],
                        [-115.83984375, 36.84446074079564],
                        [-115.83984375, 44.74673324024678],
                        [-118.91601562499999, 44.74673324024678],
                        [-118.91601562499999, 36.84446074079564]
                    ]
                ]
            },
            {
                type: "Polygon",
                coordinates: [
                    [
                        [-119.0478515625, 42.22851735620852],
                        [-104.1064453125, 42.22851735620852],
                        [-104.1064453125, 44.653024159812],
                        [-119.0478515625, 44.653024159812],
                        [-119.0478515625, 42.22851735620852]
                    ]
                ]
            }
            ]
        }
        ]
    },
    mutations: {
        [SOCKET_ONOPEN](state, event) {
            state.socket.isConnected = true
        },
        [SOCKET_ONCLOSE](state, event) {
            state.socket.isConnected = false
        },
        [SOCKET_ONERROR](state, event) {
            console.error(state, event)
        },
        [SOCKET_ONMESSAGE](state, message) {
            var received_data = JSON.parse(message.data);
            state.socket_operations.push(received_data);
        },
        [SOCKET_RECONNECT](state, count) {
            console.info(state, count)
        },
        [SOCKET_RECONNECT_ERROR](state) {
            state.socket.reconnectError = true;
        }
    },
    actions: {
        sendMessage: function (context, message) {
            Vue.prototype.$socket.send(message)
        }
    },
    getters: {
        getSocketOperations(state) {
            return state.socket_operations;
        }
    }
});