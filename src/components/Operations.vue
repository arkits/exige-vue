<template>
<v-container id="operations-cards-list" grid-list-md>
    <div v-for="operation in getSocketOperationsFromStore" if="getSocketOperationsFromStore.length > 0" v-bind:key="operation.gufi">
        <v-layout row wrap>
            <v-flex xs12>
                <OperationCard v-bind:operation="operation" v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', operation)" />
            </v-flex>
        </v-layout>
    </div>
    <div v-if="getSocketOperationsFromStore.length === 0">
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
        getSocketOperationsFromStore() {
            return store.getters.getSocketOperations;
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
