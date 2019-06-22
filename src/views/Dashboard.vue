<template>
<v-layout row wrap>
    <ExigeOptions />
    <v-flex xs3>
        <Operations v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
    </v-flex>
    <v-flex xs9>
        <Map ref="Map" v-bind:positions="positions"/>
    </v-flex>
  </v-layout>

</template>

<script>
import Operations from "../components/Operations";
import Map from "../components/Map";
import ExigeOptions from "../components/ExigeOptions";
import {
    constants
} from "crypto";
import store from "../store";

export default {
    name: "Dashboard",
    components: {
        Operations,
        Map,
        ExigeOptions
    },
    data() {
        return {
            org_title: "~/",
            positions: [{
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "uam.archit.xyz",
                location: {
                    type: "Point",
                    coordinates: [-106.43348693847656, 46.800999519926314]
                }
            }],
            snackbar: false,
            snackbarY: "bottom",
            snackbarX: "right",
            mode: "",
            snackbarTimeout: 6000,
            snackbarColor: "success",
            snackbarMessage: "Welcome to Exige!",
            websocketToggleButton: "Connect WebSocket"
        };
    },
    computed: {},
    methods: {
        viewOperationOnMap: function (val) {
            console.log("viewOperationOnMap");
            console.log(val);
            this.$refs.Map.viewOperationOnMap();
        }
    }
};
</script>

<style>
.org-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: italic;
}

.app-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
}
</style>
