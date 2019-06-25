<template>
<v-timeline align-top dense>
    <div v-for="(position, index) in getSocketPositionsForOperation" v-bind:key="index">
    <v-timeline-item color="pink" small>
        <v-layout pt-1>
            <v-flex xs2>
                 <v-icon dark>location_on</v-icon>
            </v-flex>
            <v-flex>
                <strong>{{position.location.coordinates[0]}}, {{position.location.coordinates[1]}}</strong>
                <div class="caption">{{position.uss_name}}</div>
            </v-flex>
        </v-layout>
    </v-timeline-item>
    </div>
</v-timeline>
</template>

<script>
import Vue from "vue";
import store from "../../store";

export default {
    name: "PositionsTimeline",
    props: ["operation"],
    data() {
        return {
            dialog: false,
            positions: []
        };
    },
    computed: {
        getSocketPositionsForOperation() {
            return store.getters.getSocketPositionsForOperation(this.operation.gufi);
        }
    }
};
</script>
