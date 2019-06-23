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
            uss_name: "exige.archit.xyz",
            state: "ACTIVE",
            operation_volumes: [{
                type: "Polygon",
                coordinates: [
                    [
                        [
                            -120.89355468749999,
                            45.336701909968134
                        ],
                        [
                            -101.337890625,
                            45.336701909968134
                        ],
                        [
                            -101.337890625,
                            47.21956811231547
                        ],
                        [
                            -120.89355468749999,
                            47.21956811231547
                        ],
                        [
                            -120.89355468749999,
                            45.336701909968134
                        ]
                    ]
                ]
            },
            {
                type: "Polygon",
                coordinates: [
                    [
                        [
                            -105.29296874999999,
                            32.731840896865684
                        ],
                        [
                            -101.337890625,
                            32.731840896865684
                        ],
                        [
                            -101.337890625,
                            47.21956811231547
                        ],
                        [
                            -105.29296874999999,
                            47.21956811231547
                        ],
                        [
                            -105.29296874999999,
                            32.731840896865684
                        ]
                    ]
                ]
            },
            {
                type: "Polygon",
                coordinates: [
                    [
                        [
                            -105.205078125,
                            32.80574473290688
                        ],
                        [
                            -85.5615234375,
                            32.80574473290688
                        ],
                        [
                            -85.5615234375,
                            35.567980458012094
                        ],
                        [
                            -105.205078125,
                            35.567980458012094
                        ],
                        [
                            -105.205078125,
                            32.80574473290688
                        ]
                    ]
                ]
            }
            ]
        }],
        socket_positions: [
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-119.794921875, 45.55252525134013]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-111.57714843749999, 46.830133640447386]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-102.12890625, 45.67548217560647]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-104.80957031249999, 39.53793974517628]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-102.12890625, 33.394759218577995]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-93.8232421875, 34.95799531086792]
                }
            },
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-86.3525390625, 33.211116472416855]
                }
            },

        ]

    },
    mutations: {
        [SOCKET_ONOPEN](state, event) {
            console.log("WebSocket Connected!");
            state.socket.isConnected = true
        },
        [SOCKET_ONCLOSE](state, event) {
            console.log("WebSocket Closed!");
            state.socket.isConnected = false
        },
        [SOCKET_ONERROR](state, event) {
            console.log("WebSocket Closed with an error!");
            console.error(state, event)
        },
        [SOCKET_ONMESSAGE](state, message) {
            console.log("Received Message from WebSocket");
            try {
                var received_data = JSON.parse(message.data);
                state.socket_operations.push(received_data);
            } catch {
                console.log("An error occured when trying to parse WebSocket message...");
            }
        },
        [SOCKET_RECONNECT](state, count) {
            console.log("WebSocket reconnecting...");
            console.info(state, count)
        },
        [SOCKET_RECONNECT_ERROR](state) {
            console.log("WebSocket reconnecting error!");
            state.socket.reconnectError = true;
        },
        addOperationToSocketOperations: function (state, op) {
            state.socket_operations.push(op);
        }
    },
    actions: {
    },
    getters: {
        getSocketOperations(state) {
            return state.socket_operations;
        },
        getSocketPositions(state) {
            return state.socket_positions;
        },
        getSocketState(state) {
            return state.socket.isConnected;
        },
    }
});