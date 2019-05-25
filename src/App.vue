<template>
<v-app dark>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span class="org-title">{{org_title}}</span>
            <span class="app-title">Exige</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
            <span class="mr-2">Login</span>
        </v-btn>
    </v-toolbar>
    <v-content>
        <v-layout row wrap>
            <v-flex xs3>
                <Operations />
            </v-flex>
            <v-flex xs9>
                <Map v-bind:positions="positions"/>
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
            org_title: "~/",
            positions: [{
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "uamalpha.arc.nasa.gov",
                location: {
                    type: "Point",
                    coordinates: [-106.43348693847656, 46.800999519926314]
                }
            }]
        };
    },
    computed:{
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
