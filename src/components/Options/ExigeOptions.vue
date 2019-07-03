<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="orange" flat>
                Options
                <v-icon right dark>settings</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline orange darken-2" primary-title>Exige Options</v-card-title>

            <v-card-text>
                <v-tabs centered color="orange darken-2" dark slider-color="white">
                    <v-tab key="1" ripple>Exige Options</v-tab>
                    <v-tab key="2" ripple>WebSocket Options</v-tab>

                    <v-tab-item key="1">
                        <v-card-text>
                            <v-container>
                                <v-layout pt-1>
                                    <v-flex xs8>
                                        <h3>Lifecycle Demo</h3>
                                        <p>Description of the lifecycle demo.</p>
                                    </v-flex>
                                    <v-flex xs3>
                                        <LifecycleSample 
                                        v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', $event)"
                                        />
                                    </v-flex>
                                </v-layout>
                                <v-layout pt-1>
                                    <v-flex xs8>
                                        <h3>Load Sample Data</h3>
                                        <p>Load 3 sample Operations into Exige.</p>
                                    </v-flex>
                                    <v-flex xs3>
                                        <LoadSampleData />
                                    </v-flex>
                                </v-layout>
                                <v-layout pt-1>
                                    <v-flex xs8>
                                        <h3>Clear Data</h3>
                                        <p>Clear all store data - Operations and Positions.</p>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-btn block @click="clearStore">Clear Data</v-btn>
                                    </v-flex>
                                </v-layout>
                                <br />
                                <v-divider></v-divider>
                                <br />
                                <v-layout pt-1>
                                    <v-flex xs8>
                                        <h3>USS Data</h3>
                                        <p>Cached locally.</p>
                                        <v-text-field v-model="name" label="First name" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="2">
                        <v-card-text>
                            <center>
                                <h2>Status: {{getSocketState}}</h2>
                                <br />
                                <v-btn @click="websocketButton">{{websocketToggleButton}}</v-btn>
                            </center>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" @click="dialog = false">Close</v-btn>
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

import LoadSampleData from "./LoadSampleData";
import LifecycleSample from "./LifecycleSample";

export default {
    name: "ExigeOptions",
    components: {
        LoadSampleData,
        LifecycleSample
    },
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
            snackbarMessage: "Welcome to Exige!",
            name: ""
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
            this.$emit("exige-clearStore");
        },
        snackbarMaker: function (snackbarMessage, snackbarColor) {
            this.$data.snackbarMessage = snackbarMessage;
            this.$data.snackbarColor = snackbarColor;
            this.$data.snackbar = true;
        }
    },
    computed: {
        getSocketState(state) {
            if (store.state.socket.isConnected) {
                return "Connected";
            } else {
                return "Not Connected";
            }
        }
    },
    mounted() {
        if (localStorage.name) this.name = localStorage.name;
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
        }
    }
};
</script>
