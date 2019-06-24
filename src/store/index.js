import Vuex from "vuex";
import Vue from "vue";

import {
    SOCKET_ONOPEN,
    SOCKET_ONCLOSE,
    SOCKET_ONERROR,
    SOCKET_ONMESSAGE,
    SOCKET_RECONNECT,
    SOCKET_RECONNECT_ERROR
} from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socket: {
            isConnected: false,
            message: "",
            reconnectError: false
        },
        socket_operations: [
            {
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                state: "ACTIVE",
                operation_volumes: [
                    {
                        "ordinal": 1,
                        "flight_geography": {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-120.89355468749999, 45.336701909968134],
                                    [-101.337890625, 45.336701909968134],
                                    [-101.337890625, 47.21956811231547],
                                    [-120.89355468749999, 47.21956811231547],
                                    [-120.89355468749999, 45.336701909968134]
                                ]
                            ]
                        }
                    },
                    {
                        "ordinal": 2,
                        "flight_geography": {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-105.29296874999999, 32.731840896865684],
                                    [-101.337890625, 32.731840896865684],
                                    [-101.337890625, 47.21956811231547],
                                    [-105.29296874999999, 47.21956811231547],
                                    [-105.29296874999999, 32.731840896865684]
                                ]
                            ]
                        }
                    },
                    {
                        "ordinal": 3,
                        "flight_geography": {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-105.205078125, 32.80574473290688],
                                    [-85.5615234375, 32.80574473290688],
                                    [-85.5615234375, 35.567980458012094],
                                    [-105.205078125, 35.567980458012094],
                                    [-105.205078125, 32.80574473290688]
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                state: "ROGUE",
                operation_volumes: [
                    {
                        "ordinal": 1,
                        "flight_geography": {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-124.4091796875, 38.65119833229951],
                                    [-123.134765625, 35.42486791930558],
                                    [-116.93847656250001, 29.611670115197377],
                                    [-110.654296875, 21.983801417384697],
                                    [-107.8857421875, 22.715390019335942],
                                    [-111.0498046875, 27.605670826465445],
                                    [-115.75195312499999, 32.0639555946604],
                                    [-118.30078125, 39.232253141714885],
                                    [-124.4091796875, 38.65119833229951]
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                gufi: "d8fa0933-9e51-4bd5-9529-27dd18c3aa1c",
                uss_name: "exige.archit.xyz",
                state: "CLOSED",
                operation_volumes: [
                    {
                        "ordinal": 1,
                        "flight_geography": {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-85.8251953125, 50.875311142200765],
                                    [-97.470703125, 46.70973594407157],
                                    [-93.33984375, 41.934976500546604],
                                    [-90.17578124999999, 41.31082388091818],
                                    [-91.8017578125, 45.398449976304086],
                                    [-86.0009765625, 48.40003249610685],
                                    [-84.90234375, 42.48830197960227],
                                    [-80.0244140625, 44.902577996288876],
                                    [-85.8251953125, 50.875311142200765]
                                ]
                            ]
                        }
                    }
                ]
            },
        ],
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
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-122.56347656249999, 38.13455657705411]
                }
            },
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-117.2900390625, 32.65787573695528]
                }
            },
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-114.47753906249999, 28.57487404744697]
                }
            },
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-109.8193359375, 23.120153621695614]
                }
            },
            {
                gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                uss_name: "exige.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-108.5009765625, 19.269665296502332]
                }
            }
        ]
    },
    mutations: {
        [SOCKET_ONOPEN](state, event) {
            console.log("WebSocket Connected!");
            state.socket.isConnected = true;
        },
        [SOCKET_ONCLOSE](state, event) {
            console.log("WebSocket Closed!");
            state.socket.isConnected = false;
        },
        [SOCKET_ONERROR](state, event) {
            console.log("WebSocket Closed with an error!");
            console.error(state, event);
        },
        [SOCKET_ONMESSAGE](state, message) {
            console.log("Received Message from WebSocket");
            try {
                var received_data = JSON.parse(message.data);
                state.socket_operations.push(received_data);
            } catch {
                console.log(
                    "An error occured when trying to parse WebSocket message..."
                );
            }
        },
        [SOCKET_RECONNECT](state, count) {
            console.log("WebSocket reconnecting...");
            console.info(state, count);
        },
        [SOCKET_RECONNECT_ERROR](state) {
            console.log("WebSocket reconnecting error!");
            state.socket.reconnectError = true;
        },
        addOperationToSocketOperations: function (state, op) {
            state.socket_operations.push(op);
        },
        clearSocketOperations: function (state) {
            state.socket_operations = [];
        }
    },
    actions: {},
    getters: {
        getSocketOperations: (state) => {
            return state.socket_operations;
        },
        getSocketPositions: (state) => {
            return state.socket_positions;
        },
        getSocketState: (state) => {
            return state.socket.isConnected;
        },
        getSocketPositionsForOperation: (state) => (operationGufi) => {
            var positionsToReturn = [];
            state.socket_positions.forEach(function (position) {
                if (position.gufi == operationGufi) {
                    positionsToReturn.push(position);
                }
            })
            return positionsToReturn;
        },
    }
});
