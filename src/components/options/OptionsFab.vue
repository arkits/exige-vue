<template>
<div class="exige-options">
    <v-speed-dial v-model="fab" fixed bottom left direction="right" transition="slide-y-reverse-transition">
        <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
        </template>

        <ExigeOptions />

        <v-btn fab dark small color="white">
            <v-icon color="blue">play_circle_filled</v-icon>
        </v-btn>

        <OperationAdder />
        
    </v-speed-dial>
</div>
</template>

<script>
import ExigeOptions from "./ExigeOptions";
import OperationAdder from "./OperationAdder";

export default {
    name: "OptionsFab",
    components: {
        ExigeOptions,
        OperationAdder
    },
    data() {
        return {
            dialog: false,
            fab: false
        };
    }
};
</script>
