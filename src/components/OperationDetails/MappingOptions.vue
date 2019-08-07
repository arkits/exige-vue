<template>
<div id="mappingOptions" class="white--text">
    <v-container class="white--text">
        <h2 class="headline">Operation Layer Options</h2>
        <br />
        <v-layout pt-1>
            <v-flex xs8>
                <h3>Operation Volumes Color</h3>
                <p>Choose the color of the Operation Volumes layer.</p>
            </v-flex>
            <v-flex xs3>
                <v-select :items="volumeColors" v-on:change="updateOperationLayerColor" label="Volume Color" solo></v-select>
            </v-flex>
        </v-layout>
        <v-divider />
        <br />
        <h2 class="headline">Position Layer Options</h2>
        <br />
        <v-layout pt-1>
            <v-flex xs8>
                <h3>Hide Position Markers</h3>
                <p>Hides the Position Markers layer.</p>
            </v-flex>
            <v-flex xs3>
                <v-btn color="primary" @click="hidePositions">Hide Positions</v-btn>
            </v-flex>
        </v-layout>
        <v-layout pt-1>
            <v-flex xs8>
                <h3>Position Marker Color</h3>
                <p>Choose the color of the positions markers.</p>
            </v-flex>
            <v-flex xs3>
                <v-select :items="positionColors" v-on:change="updatePositionLayerColor" label="Marker Color" solo></v-select>
            </v-flex>
        </v-layout>
    </v-container>

    <v-flex xs12 sm6 d-flex></v-flex>
</div>
</template>

<script>
import store from "../../store";

export default {
    name: "MappingOptions",
    props: ["operation"],
    data() {
        return {
            dialog: false,
            positionColors: ["red", "lime", "pink", "yellow", "orange", "teal"],
            volumeColors: ["#F44336", "#9C27B0", "#2196F3", "#4CAF50", "#FF5722"]
        };
    },
    methods: {
        updatePositionLayerColor(event) {
            var postionLayerColor = {
                gufi: this.operation.gufi,
                color: event
            };
            this.$store.commit("addToPositionsLayerColorMap", postionLayerColor);
        },
        updateOperationLayerColor(event) {
            var newOperation = this.operation;
            newOperation.exige_op_color = event;
            this.$store.commit("addOperation", newOperation);
        },
        hidePositions(){
             this.$emit("exige-hidePositionsOnMap", this.operation);
        }
    }
};
</script>
