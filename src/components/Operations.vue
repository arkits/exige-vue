<template>
<v-container fluid grid-list-lg>
    <div id="operations-cards-list">
    <div v-for="operation in operations" v-bind:key="operation.gufi">
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

export default {
    name: "Operations",
    props: ["operations"],
    components: {
        OperationCard
    }
};
</script>

<style>
#operations-cards-list{
    overflow-y:auto;
    height: 100vh;
}
</style>
