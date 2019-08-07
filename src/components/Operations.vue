<template>
<v-container id="operations-cards-list" grid-list-md>
    <div v-for="operation in getOperationsFromStore" if="getOperationsFromStore.length > 0" v-bind:key="operation.gufi">
        <v-layout row wrap>
            <v-flex xs12>
                <OperationCard v-bind:operation="operation" v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', operation)"
                v-on:exige-hideOperationOnMap="$emit('exige-hideOperationOnMap', operation)" 
                v-on:exige-hidePositionsOnMap="$emit('exige-hidePositionsOnMap', operation)" 
                />
            </v-flex>
        </v-layout>
    </div>
    <div v-if="getOperationsFromStore.length === 0">
        <v-layout row wrap>
            <v-flex xs12>
                <center>
                    <DataAdder />
                </center>
            </v-flex>
        </v-layout>
    </div>
</v-container>
</template>

<script>
import OperationCard from "./OperationCard";
import DataAdder from  "./Options/DataAdder/DataAdder";
import store from "../store";

export default {
    name: "Operations",
    props: ["operations"],
    components: {
        OperationCard,
        DataAdder
    },
    computed: {
        getOperationsFromStore() {
            return store.getters.getOperations;
        }
    }
};
</script>

<style>
#operations-cards-list {
    overflow-y: auto;
    height: 90vh;
}

@media screen and (max-width: 960px) {
    #operations-cards-list {
        height: 30vh;
    }
}
</style>
