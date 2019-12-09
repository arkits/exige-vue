<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="orange" text>
                Options
                <v-icon right dark>settings</v-icon>
            </v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="headline orange darken-2" primary-title>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Exige Options</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <v-tabs centered color="white" background-color="orange darken-2" dark slider-color="white">
                <v-tab key="1" ripple>Exige Options</v-tab>

                <v-tab-item key="1">
                    <v-card-text>
                        <v-container class="white--text">
                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>Lifecycle Demo</h3>
                                    <p>Loads a sample Operation and Positions.</p>
                                </v-flex>
                                <v-flex xs3>
                                    <LifecycleSample v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', $event)" />
                                </v-flex>
                            </v-layout>

                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>Render in 3D</h3>
                                    <p>
                                        Toggles between rendering 3D or 2D.
                                        <br />Turning off may help improve performance.
                                    </p>
                                </v-flex>
                                <v-flex xs3>
                                    <DSwitch />
                                </v-flex>
                            </v-layout>

                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>Display Grid</h3>
                                    <p>
                                        Displays borders of Slippy tiles at zoom level 10.
                                        <br />Turning off may help improve performance.
                                    </p>
                                </v-flex>
                                <v-flex xs3>
                                    <GridDraw />
                                </v-flex>
                            </v-layout>

                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>WebSocket Connect</h3>
                                    <p>Status: {{getSocketState}}</p>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn color="green darken-2" block @click="websocketButton">{{getSocketButtonText}}</v-btn>
                                </v-flex>
                            </v-layout>

                            <v-divider />
                            <br />

                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>Export Data</h3>
                                    <p>Export current data as JSON.</p>
                                </v-flex>
                                <v-flex xs3>
                                    <ExportData />
                                </v-flex>
                            </v-layout>
                            <v-layout pt-1>
                                <v-flex xs8>
                                    <h3>Clear Data</h3>
                                    <p>Clear all Exige data - Operations and Positions.</p>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn block @click="clearStore">Clear Data</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-tab-item>
            </v-tabs>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-2" @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Vue from "vue";

import LifecycleSample from "./LifecycleSample";
import DSwitch from "./DSwitch";
import ExportData from "./ExportData";
import GridDraw from "./GridDraw";

export default {
    name: "ExigeOptions",
    components: {
        LifecycleSample,
        DSwitch,
        ExportData,
        GridDraw
    },
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        websocketButton: function () {
            console.log("Toggling WebSocket...");
            if (Vue.prototype.$socket.connected) {
                Vue.prototype.$socket.client.disconnect();
            } else {
                Vue.prototype.$socket.client.connect();
            }
        },
        clearStore: function () {
            console.log("Clearing Store...");
            this.$emit("exige-clearStore");
        }
    },
    computed: {

        getSocketState() {
            if (Vue.prototype.$socket.connected) {
                return "Connected";
            } else {
                return "Not Connected";
            }
        },

        getSocketButtonText() {
            if (Vue.prototype.$socket.connected) {
                return "Disconnect";
            } else {
                return "Connected";
            }
        }
        
    }
};
</script>
