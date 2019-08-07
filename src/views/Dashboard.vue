<template>
<div>
    <v-layout wrap>
        <v-flex xs12 md3>
            <Operations v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" v-on:exige-hideOperationOnMap="hideOperationOnMap($event)" />
        </v-flex>
        <v-flex xs12 md9>
            <Map ref="Map" />
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
            org_title: "~/"
        };
    },
    computed: {},
    methods: {
        viewOperationOnMap: function (val) {
            var operationToView = val;
            this.$refs.Map.viewOperationOnMap(operationToView);
        },
        hideOperationOnMap: function (val) {
            var operation = val;
            this.$refs.Map.toggleOperationOnMap(operation);
        },
        clearStore: function () {
            this.$refs.Map.clearMapAndStore();
        }
    }
};
</script>
