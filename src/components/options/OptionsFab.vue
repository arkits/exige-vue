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
            <v-icon color="blue">edit</v-icon>
        </v-btn>

        <v-btn fab dark small color="green">
            <v-icon>add</v-icon>
        </v-btn>
    </v-speed-dial>
</div>
</template>

<script>
import Vue from "vue";
import store from "../../store";
import ExigeOptions from "./ExigeOptions";

export default {
    name: "OptionsFab",
    components: {
        ExigeOptions
    },
    data() {
        return {
            dialog: false,
            fab: false
        };
    }
};
</script>
