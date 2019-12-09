<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on"><v-icon>view_list</v-icon></v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="blue darken-2">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Operation Details</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <v-tabs centered color="white" background-color="blue darken-2" dark slider-color="white">
                <v-tab key="1" ripple>Operation Details</v-tab>
                <v-tab key="2" ripple>Position Details</v-tab>
                <v-tab key="3" ripple>Mapping Options</v-tab>
                <v-tab-item key="1">
                    <v-card flat>
                        <v-card-text>
                            <OperationDataView v-bind:operation="operation" />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item key="2">
                    <v-card flat>
                        <v-card-text>
                            <PositionsTimeline v-bind:operation="operation" />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item key="3">
                    <v-card flat>
                        <v-card-text>
                            <MappingOptions v-on:exige-hidePositionsOnMap="$emit('exige-hidePositionsOnMap', operation)" v-bind:operation="operation" />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="pink darken-1" @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import OperationDataView from "./OperationDataView";
import PositionsTimeline from "./PositionsTimeline";
import MappingOptions from "./MappingOptions";

export default {
    name: "OperationDetailsDialog",
    props: ["operation"],
    components: {
        OperationDataView,
        PositionsTimeline,
        MappingOptions
    },
    data() {
        return {
            dialog: false
        };
    }
};
</script>
