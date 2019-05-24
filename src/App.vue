<template>
<v-app dark>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span class="font-weight-light">{{org_title}}</span>
            <span class="font-weight-bold">Exige</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
            <span class="mr-2">Login</span>
        </v-btn>
    </v-toolbar>
    <v-content>
        <v-layout row wrap>
            <v-flex xs3>
                <Operations v-bind:operations="operations" />
            </v-flex>
            <v-flex xs9>
                <Map v-bind:operations="operations"/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Operations from "./components/Operations";
import Map from "./components/Map";

export default {
    name: "App",
    components: {
        Operations,
        Map
    },
    data() {
        return {
            org_title: "NASA UAM · ",
            operations: [{
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "uamalpha",
                    state: "ACTIVE",
                    operation_volume: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [-117.42187500000001, 35.746512259918504],
                                [-116.01562499999999, 35.746512259918504],
                                [-116.01562499999999, 44.59046718130883],
                                [-117.42187500000001, 44.59046718130883],
                                [-117.42187500000001, 35.746512259918504]
                            ]
                        ]
                    }
                },
                {
                    gufi: "67af7ea6-250d-4396-bfa7-e287575a452b",
                    uss_name: "uamgamma",
                    state: "ROGUE",
                    operation_volume: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [-103.447265625, 42.032974332441405],
                                [-89.033203125, 42.032974332441405],
                                [-89.033203125, 43.26120612479979],
                                [-103.447265625, 43.26120612479979],
                                [-103.447265625, 42.032974332441405]
                            ]
                        ]
                    }
                },
                {
                    gufi: "de260085-2eed-498f-a3f5-0095d0c7e763",
                    uss_name: "utmuno",
                    state: "CLOSED",
                    operation_volume: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [-106.171875, 27.293689224852407],
                                [-98.96484375, 27.293689224852407],
                                [-98.96484375, 32.62087018318113],
                                [-106.171875, 32.62087018318113],
                                [-106.171875, 27.293689224852407]
                            ]
                        ]
                    }
                }
            ]
        };
    }
};
</script>

<style>
</style>
