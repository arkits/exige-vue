<template>
<div class="options-list">
    <v-layout row wrap>
        <ExigeOptions 
        v-on:exige-clearStore="$emit('exige-clearStore')" 
        v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', $event)"/>
        <DataAdder />
    </v-layout>
</div>
</template>

<script>
import ExigeOptions from "./ExigeOptions";
import DataAdder from "./DataAdder/DataAdder";
import RefreshData from "./RefreshData";
export default {
    name: "OptionsList",
    components: {
        ExigeOptions,
        DataAdder,
        RefreshData
    },
    data() {
        return {};
    }
};
</script>
