<template>
    <v-card :color="cardBackgroud" class="white--text">
        <v-card-title primary-title>
            <div>
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span> <br>
                <span>{{operation.state}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat dark @click="$emit('view-map', operation.gufi)">View on Map</v-btn>
            <OperationDetailsDialog v-bind:operation="operation" />
        </v-card-actions>
    </v-card>
</template>

<script>
import OperationDetailsDialog from "./OperationDetailsDialog";

export default {
    name: "OperationCard",
    props: ["operation"],
    components: {
        OperationDetailsDialog
    },
    computed: {
        cardBackgroud: function () {
            var bg;
            if(this.operation.state === "ACTIVE"){
                bg = "green darken-2";
            } else 
            if (this.operation.state === "ROGUE"){
                bg = "red darken-2";
            } else
            if(this.operation.state === "CLOSED"){
                bg = "grey darken-2";
            }
            return bg;
        }
    }
};
</script>

<style scoped>
</style>
