<template>
<div class="about">
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-5">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title class="app-title">About Exige</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        Exige is a proof-of-concept traffic visualizer for UAM / UTM data. 
                        </br></br>

                        Exige is a Vue.js 2.0 based front-end web-app which connects to a
                        UTM Service Suplier and display relevant data.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="primary" href="https://github.com/arkits/exige">GitHub</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

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
    color: whitesmoke;
}
</style>
