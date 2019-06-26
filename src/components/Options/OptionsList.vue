<template>
<div class="options-list">
    <v-layout row wrap>
        <ExigeOptions v-on:exige-clearStore="$emit('exige-clearStore')" />
        <OperationAdder />
    </v-layout>
</div>
</template>

<script>
import ExigeOptions from "./ExigeOptions";
import OperationAdder from "./OperationAdder";

export default {
    name: "OptionsList",
    components: {
        ExigeOptions,
        OperationAdder
    },
    data() {
        return {
        };
    }
};
</script>
