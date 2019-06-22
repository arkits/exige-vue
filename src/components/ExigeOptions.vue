<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="pink" dark fixed bottom left fab>
                <v-icon>settings</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline" primary-title>Exige Options</v-card-title>
            <v-card-text>
                <v-tabs color="blue" dark slider-color="yellow">
                    <v-tab key="1" ripple>WebSocket Options</v-tab>
                    <v-tab key="2" ripple>Other Options</v-tab>
                    <v-tab key="3" ripple>Dev Options</v-tab>

                    <v-tab-item key="1">
                        <v-card-text>
                            <center>
                                <v-btn depressed @click="websocketButton">{{websocketToggleButton}}</v-btn>
                            </center>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="2">
                        <v-card-text>
                            <h3>Other options.</h3>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="3">
                        <v-card flat>
                            <v-card-text>
                                <h3>You found the dev options!</h3>
                            </v-card-text>
                        </v-card>
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
import store from "../store";

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
        snackbarMaker: function (snackbarMessage, snackbarColor) {
            this.$data.snackbarMessage = snackbarMessage;
            this.$data.snackbarColor = snackbarColor;
            this.$data.snackbar = true;
        }
    }
};
</script>
