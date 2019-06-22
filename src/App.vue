<template>
<v-app dark>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span class="org-title">{{org_title}}</span>
            <span class="app-title">Exige</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat @click="websocketButton">
            <span class="mr-2">{{websocketToggleButton}}</span>
        </v-btn>
    </v-toolbar>
    <v-content>
        <v-layout row wrap>
            <v-flex xs3>
                <Operations 
                    v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" 
                />
            </v-flex>
            <v-flex xs9>
                <Map ref="Map" v-bind:positions="positions"/>
        </v-flex>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :bottom="snackbarY === 'bottom'"
        :left="snackbarX === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="snackbarX === 'right'"
        :timeout="snackbarTimeout"
        :top="snackbarY === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ snackbarMessage }}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import Operations from "./components/Operations";
import Map from "./components/Map";
import {
    constants
} from "crypto";
import store from "./store";

export default {
    name: "App",
    components: {
        Operations,
        Map
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
        websocketButton: function () {
            if (store.state.socket.isConnected) {
                this.snackbarMaker("Disconnecting WebSocket...", "dark");
                Vue.prototype.$disconnect();
                this.$data.websocketToggleButton = "Connect WebSocket";
            } else {
                this.snackbarMaker("Connecting WebSocket...", "dark");
                Vue.prototype.$connect();
                this.$data.websocketToggleButton = "Disconnect WebSocket";
            }
        },
        viewOperationOnMap: function (val) {
            console.log("viewOperationOnMap");
            console.log(val);
            this.$refs.Map.viewOperationOnMap();
        },
        snackbarMaker: function (snackbarMessage, snackbarColor) {
            this.$data.snackbarMessage = snackbarMessage;
            this.$data.snackbarColor = snackbarColor;
            this.$data.snackbar = true;
        },      
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
