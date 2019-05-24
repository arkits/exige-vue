<template>
<div v-if="operation.state === 'ACTIVE'">
    <v-card color="green darken-2" class="white--text">
        <v-card-title primary-title>
            <div>
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat dark>View on Map</v-btn>
            <OperationDetailsDialog v-bind:operation="operation" />
        </v-card-actions>
    </v-card>
</div>
<div v-else-if="operation.state === 'CLOSED'">
    <v-card color="blue  darken-2" class="white--text">
        <v-card-title primary-title>
            <div>
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat dark>View on Map</v-btn>
            <OperationDetailsDialog v-bind:operation="operation" />
        </v-card-actions>
    </v-card>
</div>
<div v-else-if="operation.state === 'ROGUE'">
    <v-card color="red darken-2" class="white--text">
        <v-card-title primary-title>
            <div>
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat dark>View on Map</v-btn>
            <OperationDetailsDialog v-bind:operation="operation"/>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import OperationDetailsDialog from "./OperationDetailsDialog";

export default {
    name: "OperationCard",
    props: ["operation"],
    components: {
        OperationDetailsDialog
    }
};
</script>

<style scoped>
</style>
