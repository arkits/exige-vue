<template>
<div class="options-list">
    <v-layout row wrap>
        <ExigeOptions 
        v-on:exige-clearStore="$emit('exige-clearStore')" 
        v-on:exige-viewOperationOnMap="$emit('exige-viewOperationOnMap', $event)"/>
        <OperationAdder />
        <RefreshData />
    </v-layout>
</div>
</template>

<script>
import ExigeOptions from "./ExigeOptions";
import OperationAdder from "./OperationAdder";
import RefreshData from "./RefreshData";
export default {
    name: "OptionsList",
    components: {
        ExigeOptions,
        OperationAdder,
        RefreshData
    },
    data() {
        return {};
    }
};
</script>
