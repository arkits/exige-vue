<template>
<div class="options-list">
    <v-layout wrap>
        <v-flex>
            <ExigeOptions v-on:exige-clearStore="$emit('exige-clearStore')" v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', $event)" />
        </v-flex>
        <v-flex>
            <DataAdder />
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import ExigeOptions from "./ExigeOptions";
import DataAdder from "./DataAdder/DataAdder";

export default {
    name: "OptionsList",
    components: {
        ExigeOptions,
        DataAdder,
    },
    data() {
        return {
        };
    }
};
</script>
