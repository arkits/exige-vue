<template>
<v-container id="operations-grid">
    <div v-for="(operations, ussName) in createOperationTreeList" if="Object.keys(createOperationTreeList).length > 0" v-bind:key="ussName.id">
        <v-layout>
            <v-flex>
                <br />
                <v-row no-gutters>
                    <v-col>
                        <h2 class="text-uppercase">{{ ussName }}</h2>
                    </v-col>
                    <v-col>
                        <span class="white--text">TOTAL:{{operations.length}}</span>
                    </v-col>
                    <v-col>
                        <span class="green--text">ACTIVE:{{countState(operations, "ACTIVATED")}}</span>
                    </v-col>
                    <v-col>
                        <span class="red--text">ROUGE:{{countState(operations, "ROUGE")}}</span>
                    </v-col>
                    <v-col>
                        <span class="yellow--text">CLOSED:{{countState(operations, "CLOSED")}}</span>
                    </v-col>
                </v-row>
                <br />
                <v-container class="dark-grey">
                    <v-row>
                        <v-col v-for="operation in operations" :key="operation.gufi">
                            <v-hover v-slot:default="{ hover }">
                                <v-card class="pa-2" min-width="140"  min-height="140" max-height="300" :elevation="hover ? 12 : 2" max-width="250">
                                    <v-card-text class="white--text">
                                        {{hover ? operation.gufi : operation.gufi.slice(0,8)}}
                                        <br />
                                        {{operation.state}}
                                        <br />
                                        {{operation.flight_number}}
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
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
    methods:{
        countState(operations, stateName) {
            var n = 0;
            for(var operation of operations){
                if(operation.state == stateName){
                    n++
                }
            }
            return n;
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
