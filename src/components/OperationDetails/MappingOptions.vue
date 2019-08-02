<template>
<div id="mappingOptions" class="white--text">
    <h3 class="headline">Positions Color</h3>
    <br />
    <v-flex xs12 sm6 d-flex>
        <v-select :items="items" v-on:change="updatePositionLayerColor" label="Choose position color layer here" solo></v-select>
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
            items: ["red", "lime", "pink", "yellow", "orange", "teal"]
        };
    },
    methods: {
        updatePositionLayerColor(event) {
            var postionLayerColor = {
                gufi: this.operation.gufi,
                color: event
            };

            // console.log(postionLayerColor);

            this.$store.commit("addToPositionsLayerColorMap", postionLayerColor);
        }
    }
};
</script>
