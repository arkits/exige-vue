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
            org_title: "NASA UAM ~ ",
            operations: [{
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "uamalpha.arc.nasa.gov",
                    state: "ACTIVE",
                    operation_volumes: [{
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-118.91601562499999, 36.84446074079564],
                                    [-115.83984375, 36.84446074079564],
                                    [-115.83984375, 44.74673324024678],
                                    [-118.91601562499999, 44.74673324024678],
                                    [-118.91601562499999, 36.84446074079564]
                                ]
                            ]
                        },
                        {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-119.0478515625, 42.22851735620852],
                                    [-104.1064453125, 42.22851735620852],
                                    [-104.1064453125, 44.653024159812],
                                    [-119.0478515625, 44.653024159812],
                                    [-119.0478515625, 42.22851735620852]
                                ]
                            ]
                        }
                    ]
                },
                {
                    gufi: "76cbc094-55aa-4955-ac55-85b43edfabb2",
                    uss_name: "uamgamma.arc.nasa.gov",
                    state: "ROGUE",
                    operation_volumes: [{
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-111.62109375, 47.040182144806664],
                                    [-94.8779296875, 47.040182144806664],
                                    [-94.8779296875, 48.19538740833338],
                                    [-111.62109375, 48.19538740833338],
                                    [-111.62109375, 47.040182144806664]
                                ]
                            ]
                        },
                        {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-105.029296875, 42.261049162113856],
                                    [-102.26074218749999, 42.261049162113856],
                                    [-102.26074218749999, 48.22467264956519],
                                    [-105.029296875, 48.22467264956519],
                                    [-105.029296875, 42.261049162113856]
                                ]
                            ]
                        }
                    ]
                },
                {
                    gufi: "c8e40827-44c0-4b3f-9594-b256586cc64e",
                    uss_name: "utmuno.arc.nasa.gov",
                    state: "CLOSED",
                    operation_volumes: [{
                        type: "Polygon",
                        coordinates: [
                            [
                                [-102.919921875, 32.69486597787505],
                                [-81.73828125, 32.69486597787505],
                                [-81.73828125, 35.10193405724606],
                                [-102.919921875, 35.10193405724606],
                                [-102.919921875, 32.69486597787505]
                            ]
                        ]
                    }]
                }
            ]
        };
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
