import Vuex from "vuex";
import Vue from "vue";
import uuid from "uuid/v1";
import _ from "lodash"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socket: {
            isConnected: false,
            message: "",
            reconnectError: false
        },
        operations: [],
        positions: {},
        messages: [],
        points: [],
        positionsLayerColorMap: [],
        dswitch: true,
        gridDraw: false
    },
    mutations: {
        SOCKET_CONNECT(state) {
            console.log("Connected");
            state.socket.isConnected = true;
        },
        SOCKET_OPERATIONS(state, message) {

            // Parse String operation into a JSON
            var operationToStore = JSON.parse(message);
            operationToStore = validateOperationData(operationToStore);

            // Find whether the Operation exists based on the gufi
            var index = state.operations.findIndex(function (operation) {
                return operation.gufi === operationToStore.gufi;
            });

            // if the Operations exists, update it, else add it as a new one
            if (index != -1) {
                console.log("Update Operation");
                Vue.set(state.operations, index, operationToStore);
            } else {
                console.log("Add Operation");
                state.operations.push(operationToStore);
            }
        },
        SOCKET_MESSAGES(state, message) {
            var messageToStore = JSON.parse(message);

            // Add to Store messages
            state.messages.push(messageToStore);

            // Handle Operation State changes
            if ("inform_message" in messageToStore){

                var gufi = messageToStore["gufi"];
                
                var index = state.operations.findIndex(function (operation) {
                    return operation.gufi === gufi;
                });
        
                if (index != -1) {
                    console.log("Update Operation");
                    var operationToUpdate = state.operations[index];
                    operationToUpdate["state"] = messageToStore["inform_message"];
                    Vue.set(state.operations, index, operationToUpdate);
                } 
            }

        },
        SOCKET_POSITIONS(state, message) {
            
            // Parse String message into a JSON
            var inputPosition = JSON.parse(message);

            // To mutate Store positions properly, we will need to make a deep copy
            var positionsCopy = _.cloneDeep(state.positions);

            var listOfPos = [];

            if (state.positions.hasOwnProperty(inputPosition.gufi)){
                listOfPos = state.positions[inputPosition.gufi];
            } 

            listOfPos.push(inputPosition);

            // Only keep the last 50 positions
            if(listOfPos.length > 50){
                listOfPos.shift();
            }

            positionsCopy[inputPosition.gufi] = listOfPos;
            state.positions = Object.assign({}, positionsCopy);

        },
        addOperation: function (state, op) {

            var validOperation = validateOperationData(op);

            var index = state.operations.findIndex(function (operation) {
                return operation.gufi === validOperation.gufi;
            });

            if (index != -1) {
                console.log("Update Operation");
                Vue.set(state.operations, index, validOperation);
            } else {
                console.log("Add Operation");
                state.operations.push(validOperation);
            }
        },
        clearOperations: function (state) {
            state.operations = [];
        },
        addPosition: function (state, inputPosition) {
            console.log("Adding to Position to Store.");

            var positionsCopy = _.cloneDeep(state.positions);

            var listOfPos = [];

            if (state.positions.hasOwnProperty(inputPosition.gufi)){
                listOfPos = state.positions[inputPosition.gufi];
            } 

            listOfPos.push(inputPosition);

            positionsCopy[inputPosition.gufi] = listOfPos;

            state.positions = Object.assign({}, positionsCopy);
        },
        setDSwitch: function (state, newDSwitch) {
            console.log("Setting DSwitch to - " + newDSwitch);
            state.dswitch = newDSwitch;
        },
        setGridDraw: function (state, newGridDraw) {
            console.log("Setting gridDraw to - " + newGridDraw);
            state.gridDraw = newGridDraw;
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
        },
        addPoint: function (state, point) {
            console.log("Adding to Point to Store.");
            var goodPoint = validatePoint(point);
            state.points.push(goodPoint);
        },
    },
    getters: {
        getOperations: state => {
            return state.operations;
        },
        getPositions: state => {
            return state.positions;
        },
        getPositionsForOperation: state => operationGufi => {
            var positionsToReturn = [];
            if (state.positions.hasOwnProperty(operationGufi)){
                positionsToReturn = state.positions[operationGufi];
            } 
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
        },
        getGridDraw: state => {
            return state.gridDraw;
        },
        getPoints: state => {
            return state.points;
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
        goodOperation.uss_name = "exige.xyz";
    }

    if (operation.state) {
        goodOperation.state = operation.state;
    } else {
        console.log("OpVal: state not found. Using CLOSED.");
        goodOperation.state = "CLOSED";
    }

    if (operation.flight_number) {
        goodOperation.flight_number = operation.flight_number;
    } else {
        console.log("OpVal: flight_number not found. Using EXIGE123.");
        goodOperation.flight_number = "EXIGE123";
    }

    if(operation.exige_op_color){
        goodOperation.exige_op_color = operation.exige_op_color
    } else {
        var randomColor = generateRandomColor();
        goodOperation.exige_op_color = randomColor;
        console.log("OpVal: exige_op_color not found. Using " + randomColor);
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

function validatePoint(point){
    var goodPoint = point;
    goodPoint.exige_point_color = generateRandomColor();
    return goodPoint;
}

function generateRandomColor(){
    var colorArray = ["#F44336", "#9C27B0", "#2196F3", "#4CAF50", "#FF5722"];    
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    return randomColor;
}