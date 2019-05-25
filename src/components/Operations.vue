<template>
<v-container fluid grid-list-lg>
    <div id="operations-cards-list">
    <div v-for="operation in getSocketOperations" v-bind:key="operation.gufi">
        <v-layout row wrap>
            <v-flex xs12>
                <OperationCard v-bind:operation="operation" />
            </v-flex>
        </v-layout>
    </div>
    </div>
</v-container>
</template>

<script>
import OperationCard from "./OperationCard";
import store from '../store'

export default {
    name: "Operations",
    props: ["operations"],
    components: {
        OperationCard
    },
    computed: {
        getSocketOperations(state) {
            return store.state.socket_operations;
        }        
    }
};
</script>

<style>
#operations-cards-list{
    overflow-y:auto;
    height: 100vh;
}
</style>
