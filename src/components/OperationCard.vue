<template>
    <v-card :color="cardBackgroud" class="white--text">
        <v-card-text dark>
            <div class="white--text">
                <span>{{operation.gufi}}</span> <br>
                <span>{{operation.uss_name}}</span> <br>
                <span>{{operation.flight_number}}</span> <br>
                <span>{{operation.state}}</span>
            </div>
        </v-card-text>
        <v-card-actions>
            <OperationDetailsDialog v-on:exige-hidePositionsOnMap="$emit('exige-hidePositionsOnMap', operation)" v-bind:operation="operation" />
            <v-btn text @click="hideOperation">Hide</v-btn>
            <v-btn text @click="$emit('exige-viewOperationOnMap', operation)">View on Map</v-btn>
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
    },
    methods:{
        hideOperation(){
            this.$emit("exige-hideOperationOnMap", this.operation);
        }
    }
};
</script>

<style scoped>
</style>
