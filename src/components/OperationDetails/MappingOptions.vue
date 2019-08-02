<template>
<div id="mappingOptions" class="white--text">
    <h2>Operation Layer Options</h2>
    <br />

     <v-btn color="primary">Hide Volumes layer</v-btn> <br /> <br /> 

    <v-flex xs12 sm6 d-flex>
        <v-select :items="items" v-on:change="updatePositionLayerColor" label="Operation layer color" solo></v-select>
    </v-flex>

    <br />
    <v-divider />
    <br />

    <h2>Positions Layer Options</h2>
    <br />

     <v-btn color="primary">Hide Positions layer</v-btn> <br /> <br /> 

    <v-flex xs12 sm6 d-flex>
        <v-select :items="items" v-on:change="updatePositionLayerColor" label="Positions layer color" solo></v-select>
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
