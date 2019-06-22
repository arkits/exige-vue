<template>
<v-app dark>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span class="org-title">{{org_title}}</span>
            <span class="app-title">Exige</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat @click="websocketButton">
            <span class="mr-2">WebSocket Toggle</span>
        </v-btn>

        <v-btn flat @click="snackbar = true">
            <span class="mr-2">snackbar Toggle</span>
        </v-btn>
    </v-toolbar>
    <v-content>
        <v-layout row wrap>
            <v-flex xs3>
                <Operations v-on:view-map="emitViewMap" />
            </v-flex>
            <v-flex xs9>
                <Map ref="Map" v-bind:positions="positions"/>
        </v-flex>
      </v-layout>

      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
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
            y: "bottom",
            x: "right",
            mode: "",
            timeout: 6000,
            snackbarColor: "success",
            text: "Hello, I'm a snackbar"
        };
    },
    computed: {},
    methods: {
        websocketButton: function (val) {
            if (store.state.socket.isConnected) {
                console.log("WebSocket is conneted... trying to disconnect...");
                Vue.prototype.$disconnect();
            } else {
                console.log("WebSocket is not conneted... trying to connect...");
                Vue.prototype.$connect();
            }
        },
        emitViewMap: function () {
            console.log("Emiting MapEmit From App");
            this.$refs.Map.handleMapEmit();
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
