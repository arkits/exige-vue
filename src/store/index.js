import Vuex from "vuex";
import Vue from "vue";
import uuid from "uuid/v1";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socket_operations: [],
        socket_positions: [],
        positionsLayerColorMap: [],
        dswitch: true
    },
    mutations: {
        addOperationToSocketOperations: function (state, op) {
            var validOperation = validateOperationData(op);

            var index = state.socket_operations.findIndex(function (operation) {
                return operation.gufi === validOperation.gufi;
            });

            if (index != -1) {
                console.log("Update Operation");
                Vue.set(state.socket_operations, index, validOperation);
            } else {
                console.log("Add Operation");
                state.socket_operations.push(validOperation);
            }
        },
        addPositionToSocketPositions: function (state, pos) {
            console.log("Adding to Position to Store.");
            state.socket_positions.push(pos);
        },
        clearSocketOperations: function (state) {
            state.socket_operations = [];
        },
        addToPositionsLayerColorMap: function (state, posLayerColor) {
            var index = state.positionsLayerColorMap.findIndex(function (plc) {
                return plc.gufi === posLayerColor.gufi;
            });

            if (index != -1) {
                console.log("Update PLC");
                Vue.set(state.positionsLayerColorMap, index, posLayerColor);
            } else {
                console.log("Add PLC");
                state.positionsLayerColorMap.push(posLayerColor);
            }
        }
    },
    actions: {},
    getters: {
        getSocketOperations: state => {
            return state.socket_operations;
        },
        getSocketPositions: state => {
            return state.socket_positions;
        },
        getSocketPositionsForOperation: state => operationGufi => {
            var positionsToReturn = [];
            state.socket_positions.forEach(function (position) {
                if (position.gufi == operationGufi) {
                    positionsToReturn.push(position);
                }
            });
            return positionsToReturn;
        },
        getPositionLayerColorForGufi: state => gufi => {
            var colorToReturn;
            state.positionsLayerColorMap.forEach(function (posLayerColor) {
                if (posLayerColor.gufi == gufi) {
                    colorToReturn = posLayerColor.color;
                }
            });
            return colorToReturn;
        },
        getPositionLayerColorMap: state => {
            return state.positionsLayerColorMap;
        },
        getDSwitch: state => {
            return state.dswitch;
        }
    }
});

function validateOperationData(operation) {
    var goodOperation = {};

    if (operation.gufi) {
        goodOperation.gufi = operation.gufi;
    } else {
        console.log("OpVal: gufi not found. Generating a random uuid.");
        goodOperation.gufi = uuid();
    }

    if (operation.uss_name) {
        goodOperation.uss_name = operation.uss_name;
    } else {
        console.log("OpVal: uss_name not found. Using default.");
        goodOperation.uss_name = "exige.archit.xyz";
    }

    if (operation.state) {
        goodOperation.state = operation.state;
    } else {
        console.log("OpVal: state not found. Using CLOSED.");
        goodOperation.state = "CLOSED";
    }

    if (operation.operation_volumes) {
        goodOperation.operation_volumes = operation.operation_volumes;
    } else {
        console.log("OpVal: operation_volumes not found. Using default.");
        goodOperation.operation_volumes = [{
            ordinal: 1,
            min_altitude: {
                altitude_value: 500,
                vertical_reference: "W84",
                units_of_measure: "FT",
                source: "OTHER"
            },
            max_altitude: {
                altitude_value: 1500,
                vertical_reference: "W84",
                units_of_measure: "FT",
                source: "OTHER"
            },
            operation_geography: {
                type: "Polygon",
                coordinates: [
                    [
                        [-107.9296875, 52.05249047600099],
                        [-110.830078125, 53.904338156274704],
                        [-112.5, 52.802761415419674],
                        [-112.763671875, 50.90303283111257],
                        [-107.40234375, 48.16608541901253],
                        [-102.65625, 51.12421275782688],
                        [-102.39257812499999, 53.12040528310657],
                        [-105.205078125, 53.69670647530323],
                        [-107.9296875, 52.05249047600099]
                    ]
                ]
            }
        }];
    }

    return goodOperation;
}