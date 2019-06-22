<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="pink" dark fixed bottom left fab>
                <v-icon>settings</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline" primary-title>Exige Options</v-card-title>
            <v-card-text>
                <v-tabs color="blue" dark slider-color="yellow">

                    <v-tab key="1" ripple>WebSocket Options</v-tab>
                    <v-tab key="2" ripple>Other Options</v-tab>
                    <v-tab key="3" ripple>Dev Options</v-tab>

                    <v-tab-item key="1">
                            <v-card-text>
                                <h3>WebSocket Connections</h3>
                            </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="2">
                            <v-card-text>
                                <h3>Other options.</h3>
                            </v-card-text>
                    </v-tab-item>

                    <v-tab-item key="3">
                        <v-card flat>
                            <v-card-text>
                                <h3>You found the dev options!</h3>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "ExigeOptions",
    data() {
        return {
            dialog: false
        };
    }
};
</script>
