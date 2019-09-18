<template>
<v-container id="operations-grid">
    <div v-for="(operations, ussName) in createOperationTreeList" if="Object.keys(createOperationTreeList).length > 0" v-bind:key="ussName.id">
        <v-layout>
            <v-flex>
                <br />
                <v-row no-gutters>
                    <v-col>
                        <h3 class="text-uppercase">{{ ussName }}</h3>
                        <span class="white--text">TOTAL:{{operations.length}}</span>
                    </v-col>
                    
                    <v-col class="text-right">
                        <span class="green--text">ACTIVE:{{countState(operations, "ACTIVATED")}}</span> |
                         <span class="red--text">ROGUE:{{countState(operations, "ROGUE")}}</span> |
                        <span class="text-right">CLOSED:{{countState(operations, "CLOSED")}}</span>
                    </v-col>
                </v-row>
                <hr />
                <br />
                <v-container class="dark-grey">
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-left">GUFI</th>
                                <th class="text-left">Flight Number</th>
                                <th class="text-left">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:class="generateCardBg(operation.state)" v-for="operation in operations" :key="operation.gufi">
                                <td>{{ operation.gufi }}</td>
                                <td>{{ operation.flight_number }}</td>
                                <td>{{ operation.state }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
    <div v-if="Object.keys(createOperationTreeList).length === 0">
        <v-layout row wrap>
            <v-flex xs12>
                <center>
                    <br />
                    <br />
                    <br />
                    <h4 class="grey--text">waiting for the storm...</h4>
                </center>
            </v-flex>
        </v-layout>
    </div>
        <br><br><br><br>    <br><br><br><br>
</v-container>
</template>

<script>
import OperationCard from "./OperationCard";
import store from "../store";

export default {
    name: "OperationsGrid",
    props: ["operations"],
    components: {
        OperationCard
    },
    computed: {
        createOperationTreeList() {
            var operations = store.getters.getOperations;

            var ussToOperationMap = new Object();

            for (var operation of operations) {
                var ussName = operation["uss_name"];

                if (ussToOperationMap.hasOwnProperty(ussName)) {
                    var opList = ussToOperationMap[ussName];
                } else {
                    var opList = [];
                }

                opList.push(operation);
                ussToOperationMap[ussName] = opList;
            }

            return ussToOperationMap;
        }
    },
    methods: {
        countState(operations, stateName) {
            var n = 0;
            for (var operation of operations) {
                if (operation.state == stateName) {
                    n++;
                }
            }
            return n;
        },
        generateCardBg(opState) {
            if (opState == "ROGUE" || opState == "U") {
                return "red";
            } else if (
                opState == "ACTIVE" ||
                opState == "ACTIVATED" ||
                opState == "V"
            ) {
                return "green darken-1";
            } else if (opState == "ACCEPTED" || opState == "A") {
                return "teal";
            } else if (
                opState == "NONCONFORMING" ||
                opState == "NON-CONFORMING" ||
                opState == "F"
            ) {
                return "purple darken-1";
            } else if (opState == "REJECTED" || opState == "R") {
                return "yellow darken-3";
            } else {
                return "grey darken-4";
            }
        }
    }
};
</script>

<style>
#operations-cards-list {
    overflow-y: auto;
    height: 90vh;
}

@media screen and (max-width: 960px) {
    #operations-cards-list {
        height: 30vh;
    }
}
</style>
