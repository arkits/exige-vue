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
                        <p>Exige is a proof-of-concept traffic visualizer for UAM / UTM data.</p>

                        <p>
                          Exige is a Vue.js 2.0 based front-end web-app which connects to a
                            UTM Service Suplier and display relevant data.
                        </p>

                        <center>
                            <v-btn depressed class="text-none" color="primary" href="https://github.com/arkits/exige">
                                View Exige on GitHub
                                <v-icon right dark>favorite</v-icon>
                            </v-btn>

                            <br>

                            <v-btn depressed class="text-none" color="primary" href="https://github.com/arkits/">
                                View ArKits on GitHub
                                <v-icon right dark>favorite</v-icon>
                            </v-btn>
                        </center>
                    </v-card-text>
                    <v-divider></v-divider>
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
