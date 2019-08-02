<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="500">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="text-none app-title">~/Exige by ArKits</v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="blue">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">About Exige</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <v-card-text class="white--text">
                <br />
                <div>
                    <p>Exige is a proof-of-concept traffic visualizer for UAM / UTM data.</p>
                    <p>Exige is a Vue.js 2.0 based front-end web-app which connects to a UTM Service Suplier and display relevant data.</p>
                </div>

                <v-divider />
                <br />
                <center>
                    <v-btn class="text-none" color="primary" href="https://github.com/arkits/exige">Exige on GitHub</v-btn>

                    <br />
                    <br />

                    <v-btn class="text-none" color="primary" href="https://github.com/arkits/">ArKits on GitHub</v-btn>
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
