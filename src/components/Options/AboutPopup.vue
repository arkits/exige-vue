<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="500">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" flat class="text-none app-title">
                ~/Exige by ArKits
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="blue">
                <h1 class="app-title">About Exige</h1>
            </v-card-title>

            <v-card-text>


                        <p>Exige is a proof-of-concept traffic visualizer for UAM / UTM data.</p>

                        <p>
                          Exige is a Vue.js 2.0 based front-end web-app which connects to a
                            UTM Service Suplier and display relevant data.
                        </p>

                        <center>
                            <v-btn depressed class="text-none" color="primary" href="https://github.com/arkits/exige">
                                View Exige on GitHub
                            </v-btn>

                            <br>

                            <v-btn depressed class="text-none" color="primary" href="https://github.com/arkits/">
                                View ArKits on GitHub
                            </v-btn>
                        </center>

            </v-card-text>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "AboutPopup",
    data() {
        return {
            dialog: false
        };
    }
};
</script>

<style>
.app-title {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 600;
  font-style: italic;
}
</style>

