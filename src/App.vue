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
                <Map
            v-bind:operations="operations"
          />
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
                    gufi: 1,
                    uss_name: "uamalpha",
                    state: "ACTIVE",
                    operation_volume: {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [-122.414, 37.776]
                        },
                        properties: {
                            title: "Mapbox SF",
                            icon: "harbor"
                        }
                    }
                },
                {
                    gufi: 2,
                    uss_name: "uambeta",
                    state: "ROGUE",
                    operation_volume: {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [-122.414, 37.776]
                        },
                        properties: {
                            title: "Mapbox SF",
                            icon: "harbor"
                        }
                    }
                },
                {
                    gufi: 3,
                    uss_name: "uamgamma",
                    state: "CLOSED",
                    operation_volume: {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [-122.414, 37.776]
                        },
                        properties: {
                            title: "Mapbox SF",
                            icon: "harbor"
                        }
                    }
                }
            ]
        };
    }
};
</script>

<style>
</style>
