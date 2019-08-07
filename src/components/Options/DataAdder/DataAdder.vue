<template>
<div>
    <v-dialog v-model="dialog" scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" text>
                Add Data
                <v-icon right dark>add</v-icon>
            </v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="green darken-2">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Add Data to Exige</v-list-item-title>
                        <v-list-item-subtitle>Add a new Operation or Position to Exige's Store. This is a front-end action and does reflect a USS's data!</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <v-tabs centered color="white" background-color="green darken-2" dark slider-color="white">
                <v-tab key="1" ripple>Operations</v-tab>
                <v-tab key="2" ripple>Positions</v-tab>
                <v-tab key="3" ripple>Misc</v-tab>

                <v-tab-item key="1">
                    <v-card-text>
                        <OperationAdder v-bind:dialog="dialog"/>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item key="2">
                    <v-card-text>
                        <PositionAdder v-bind:dialog="dialog"/>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item key="3">
                    <v-card-text>
                        <MiscAdder v-bind:dialog="dialog"/>
                    </v-card-text>
                </v-tab-item>
            </v-tabs>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-2" @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import OperationAdder from "./OperationAdder";
import PositionAdder from "./PositionAdder";
import MiscAdder from "./MiscAdder";

export default {
    name: "DataAdder",
    components:{
        OperationAdder,
        PositionAdder,
        MiscAdder
    },
    data() {
        return {
            dialog: false,
        };
    }
};
</script>
