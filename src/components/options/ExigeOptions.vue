<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" persistent scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="orange" dark fab>
                <v-icon>settings</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline blue"  primary-title>
                Exige Options
            </v-card-title>
            
            <v-card-text >
                <v-tabs centered color="blue" dark slider-color="yellow">
                    <v-tab key="1" ripple>WebSocket Options</v-tab>
                    <v-tab key="2" ripple>Exige Options</v-tab>

                    <v-tab-item key="1">
                        <v-card-text>
                            <center>
                                <h2>Status: {{getSocketState}} </h2>
                                <br>
                                <v-btn @click="websocketButton">{{websocketToggleButton}}</v-btn>
                            </center>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="2">
                        <v-card-text>
                            <v-container>
                                <v-layout row wrap>
                            <v-flex xs9 >
                                <h3>Clear the Store</h3>
                                <p>Will clear all stored Operations and Positions.</p>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn depressed @click="clearStore">Clear Store</v-btn>
                            </v-flex>
                                   </v-layout>
                            </v-container>

                        </v-card-text>
                    </v-tab-item>

                </v-tabs>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :bottom="snackbarY === 'bottom'" :left="snackbarX === 'left'" :multi-line="mode === 'multi-line'" :right="snackbarX === 'right'" :timeout="snackbarTimeout" :top="snackbarY === 'top'" :vertical="mode === 'vertical'">
        {{ snackbarMessage }}
        <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</div>
</template>

<script>
import Vue from "vue";
import store from "../../store";

export default {
    name: "ExigeOptions",
    data() {
        return {
            dialog: false,
            websocketToggleButton: "Connect WebSocket",
            snackbar: false,
            snackbarY: "bottom",
            snackbarX: "right",
            mode: "",
            snackbarTimeout: 6000,
            snackbarColor: "success",
            snackbarMessage: "Welcome to Exige!"
        };
    },
    methods: {
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
        clearStore: function () {
            console.log("Clearing Store...");
            // this.$store.commit('clearSocketOperations');
            this.$emit('exige-clearStore');
        },
        snackbarMaker: function (snackbarMessage, snackbarColor) {
            this.$data.snackbarMessage = snackbarMessage;
            this.$data.snackbarColor = snackbarColor;
            this.$data.snackbar = true;
        }
    },
    computed: {
        getSocketState(state) {
            if(store.state.socket.isConnected){
                return "Connected";
            } else {
                return "Not Connected";
            }
        }
    }
};
</script>
