<template>
<div id="mappingOptions" class="white--text">
    <h2>Operation Layer Options</h2>
    <br />

     <v-btn color="primary">Hide Volumes layer</v-btn> <br /> <br /> 

    <v-flex xs12 sm6 d-flex>
        <v-select :items="volumeColors" v-on:change="updateOperationLayerColor" label="Operation layer color" solo></v-select>
    </v-flex>

    <br />
    <v-divider />
    <br />

    <h2>Positions Layer Options</h2>
    <br />

     <v-btn color="primary">Hide Positions layer</v-btn> <br /> <br /> 

    <v-flex xs12 sm6 d-flex>
        <v-select :items="positionColors" v-on:change="updatePositionLayerColor" label="Positions layer color" solo></v-select>
    </v-flex>
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
        }
    }
};
</script>
