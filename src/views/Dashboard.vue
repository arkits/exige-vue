<template>
<v-layout row wrap>
    <OptionsFab />
    <v-flex xs3>
        <Operations v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
    </v-flex>
    <v-flex xs9>
        <Map ref="Map"/>
    </v-flex>
  </v-layout>

</template>

<script>
import Operations from "../components/Operations";
import Map from "../components/Map";
import OptionsFab from "../components/options/OptionsFab";
import {
    constants
} from "crypto";
import store from "../store";

export default {
    name: "Dashboard",
    components: {
        Operations,
        Map,
        OptionsFab
    },
    data() {
        return {
            org_title: "~/",
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
            var operationToView = val;
            this.$refs.Map.viewOperationOnMap(operationToView);
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
