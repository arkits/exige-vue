<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">Details</v-btn>
        </template>
        <v-card>
            <v-card-title class="blue">
                <span class="headline">Advanced Details</span>
            </v-card-title>
            <v-card-text>
                <v-tabs color="blue" centered dark slider-color="yellow">
                    <v-tab key="1" ripple>Operation Details</v-tab>
                    <v-tab key="2" ripple>Position Details</v-tab>
                    <v-tab-item key="1">
                        <v-card flat>
                            <v-card-text>
                                <pre>{{operation}}</pre>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item key="2">
                        <v-card flat>
                            <v-card-text>
                                <pre>
                                    {{getSocketPositionsForOperation}}
                                </pre>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Vue from "vue";
import store from "../store";

export default {
    name: "OperationDetailsDialog",
    props: ["operation"],
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        getSocketPositionsForOperation() {
            return store.getters.getSocketPositionsForOperation(this.operation.gufi);
        }
    }
};
</script>
