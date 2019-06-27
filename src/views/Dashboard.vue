<template>
<div>
    <v-layout row wrap>
        <v-flex xs12 md3>
            <Operations v-on:exige-viewOperationOnMap="viewOperationOnMap($event)" />
        </v-flex>
        <v-flex xs12 md9>
            <Map ref="Map"/>
      </v-flex>
    </v-layout>
    <v-footer absolute height="auto" color="primary lighten-1">
      <v-layout grey darken-3 row wrap>
        <v-flex grey darken-4 white--text xs12>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <OptionsList v-on:exige-clearStore="clearStore()"/>
            </v-flex>
            <v-flex xs12 md6>
              <AboutPopup/>
            </v-flex>
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
import {
    constants
} from "crypto";
import store from "../store";

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
            console.log("viewOperationOnMap");
            var operationToView = val;
            this.$refs.Map.viewOperationOnMap(operationToView);
        },
        clearStore: function () {
            console.log("clearStore");
            this.$refs.Map.clearMapAndStore();
        }
    }
};
</script>

<style>
.org-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: italic;
}

.app-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
}
</style>
