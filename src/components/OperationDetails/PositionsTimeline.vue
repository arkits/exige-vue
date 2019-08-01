<template>
<div id="positionsDataView">
    <div v-if="viewRawPositions">
        <v-layout>
            <v-flex>
                <v-textarea outlined auto-grow name="raw-json" label="Raw Operation JSON" :value="positionsAsString"></v-textarea>
            </v-flex>
        </v-layout>
    </div>
    <div v-else>
        <v-timeline align-top dense>
            <div v-for="(position, index) in getSocketPositionsForOperation" v-bind:key="index">
                <v-timeline-item color="pink" small>
                    <v-layout pt-1>
                        <v-flex xs2>
                            <v-icon dark>location_on</v-icon>
                        </v-flex>
                        <v-flex>
                            <strong>{{position.location.coordinates[0]}}, {{position.location.coordinates[1]}}</strong>
                            <div class="caption">{{position.gufi}}</div>
                            <div class="caption">{{position.uss_name}}</div>
                        </v-flex>
                    </v-layout>
                </v-timeline-item>
            </div>
        </v-timeline>
    </div>

    <v-divider></v-divider>
    <br>
    <center>
        <v-btn color="pink darken-1" @click="viewRawPositions = !viewRawPositions">View Raw</v-btn>
    </center>
</div>
</template>

<script>
import store from "../../store";

export default {
    name: "PositionsTimeline",
    props: ["operation"],
    data() {
        return {
            dialog: false,
            viewRawPositions: false,
            positions: []
        };
    },
    computed: {
        getSocketPositionsForOperation() {
            this.positions = store.getters.getSocketPositionsForOperation(this.operation.gufi);
            return this.positions;
        },
        positionsAsString() {
            var positionsString = JSON.stringify(this.positions, null, 4);
            return positionsString;
        }
    }
};
</script>
