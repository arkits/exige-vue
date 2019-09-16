<template>
<div>
    <v-layout wrap>
        <v-flex>
            <OperationsGrid />
        </v-flex>
    </v-layout>
    <v-footer fixed height="auto">
        <v-layout>
            <v-flex row>
                <v-layout>
                    <OptionsList v-on:exige-clearStore="clearStore()" v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
                </v-layout>
                <v-layout justify-end>
                    <AboutPopup />
                </v-layout>
            </v-flex>
        </v-layout>
    </v-footer>
</div>
</template>

<script>
import OperationsGrid from "../components/OperationsGrid";
import AboutPopup from "../components/Options/AboutPopup";
import OptionsList from "../components/Options/OptionsList";

export default {
    name: "Timeline",
    components: {
        OperationsGrid,
        OptionsList,
        AboutPopup
    },
    data() {
        return {
            org_title: "~/"
        };
    },
    computed: {},
    methods: {}
};
</script>
