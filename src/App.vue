<template>
<div id="app">
    <v-app dark>
        <v-toolbar app>
            <v-toolbar-title class="headline" href="/exige">
                <span class="org-title">{{org_title}}</span>
                <span>
            <a href="/exige" class="app-title">Exige</a>
          </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn flat to="/exige/about">About</v-btn>
            <v-btn flat @click="websocketButton">{{websocketToggleButton}}</v-btn>
        </v-toolbar>

        <v-content>
            <router-view />
            <v-snackbar v-model="snackbar" :color="snackbarColor" :bottom="snackbarY === 'bottom'" :left="snackbarX === 'left'" :multi-line="mode === 'multi-line'" :right="snackbarX === 'right'" :timeout="snackbarTimeout" :top="snackbarY === 'top'" :vertical="mode === 'vertical'">
                {{ snackbarMessage }}
                <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
            </v-snackbar>
        </v-content>
    </v-app>
</div>
</template>

<script>
import Vue from "vue";
import store from "./store";

export default {
    name: "App",
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
    methods:{
        websocketButton: function () {
            console.log("Toggling WebSocket...");
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
        snackbarMaker: function (snackbarMessage, snackbarColor) {
            this.$data.snackbarMessage = snackbarMessage;
            this.$data.snackbarColor = snackbarColor;
            this.$data.snackbar = true;
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
    color: whitesmoke;
    text-decoration: none;
}
</style>
