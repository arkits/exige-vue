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
            var bg;

            if (this.operation.state === "ACTIVE" || this.operation.state === "A" || this.operation.state === "V") {
                bg = "#388E3C";
            }
            else if (this.operation.state === "ROGUE" || this.operation.state === "U") {
                bg = "#FF5722";
            }
            else if (this.operation.state === "REJECTED" || this.operation.state === "R") {
                bg = "#D32F2F";
            }
            else if (this.operation.state === "CLOSED" || this.operation.state === "C" || this.operation.state === "G") {
                bg = "#616161";
            }


            return bg;
        }
    }
};
</script>

<style scoped>
</style>
