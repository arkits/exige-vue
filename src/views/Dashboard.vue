<template>
<div>
    <v-layout wrap>
        <v-flex xs12 md3>
            <Operations v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
        </v-flex>
        <v-flex xs12 md9>
            <Map ref="Map" />
        </v-flex>
    </v-layout>
    <v-footer fixed height="auto">
        <v-layout>
            <v-flex row grey darken-4 white--text xs12>
                <v-layout align-end justify-start>
                    <OptionsList v-on:exige-clearStore="clearStore()" v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
                </v-layout>
                <v-layout align-end justify-end>
                    <AboutPopup />
                </v-layout>
            </v-flex>
        </v-layout>
    </v-footer>
</div>
</template>

<script>
import Operations from "../components/Operations";
import Map from "../components/Map";
import AboutPopup from "../components/Options/AboutPopup";
import OptionsList from "../components/Options/OptionsList";

export default {
    name: "Dashboard",
    components: {
        Operations,
        Map,
        OptionsList,
        AboutPopup
    },
    data() {
        return {
            org_title: "~/",
            snackbar: false,
            snackbarY: "bottom",
            snackbarX: "right",
            mode: "",
            snackbarTimeout: 6000,
            snackbarColor: "success",
            snackbarMessage: "Welcome to Exige!",
            websocketToggleButton: "Connect WebSocket"
        };
    },
    computed: {},
    methods: {
        viewOperationOnMap: function (val) {
            var operationToView = val;
            this.$refs.Map.viewOperationOnMap(operationToView);
        },
        clearStore: function () {
            this.$refs.Map.clearMapAndStore();
        }
    }
};
</script>
