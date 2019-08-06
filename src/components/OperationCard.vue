<template>
    <v-card :color="cardBackgroud" class="white--text">
        <v-card-text dark>
            <div class="white--text">
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span> <br>
                <span>{{operation.state}}</span>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn text @click="$emit('exige-viewOperationOnMap', operation)">View on Map</v-btn>
            <OperationDetailsDialog v-bind:operation="operation" />
        </v-card-actions>
    </v-card>
</template>

<script>
import OperationDetailsDialog from "./OperationDetails/OperationDetailsDialog";

export default {
    name: "OperationCard",
    props: ["operation"],
    components: {
        OperationDetailsDialog
    },
    computed: {
        cardBackgroud: function () {
            var bg = this.operation.exige_op_color;
            return bg;
        }
    }
};
</script>

<style scoped>
</style>
