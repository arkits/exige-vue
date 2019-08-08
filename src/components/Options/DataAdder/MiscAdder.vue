<template>
<div>
    <v-container grid-list-md>
        <h2 class="headline white--text">Add a Point</h2>
        <br />
        <v-form ref="pointAdderForm">
            <v-layout>
                <v-flex xs4>
                    <v-text-field outlined v-model="userInputLat" name="input-lat" label="Lat" hint="Enter a Lat"></v-text-field>
                </v-flex>

                <v-flex xs4>
                    <v-text-field outlined v-model="userInputLong" name="input-long" label="Long" hint="Enter a Long"></v-text-field>
                </v-flex>

                <v-flex xs4>
                    <v-text-field outlined v-model="userInputLabel" name="input-label" label="Label" hint="Enter a Label"></v-text-field>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>

    <div v-if="inputError">
        <v-alert type="error">{{inputError}}</v-alert>
    </div>

    <div v-if="inputSuccess">
        <v-alert type="success">{{inputSuccess}}</v-alert>
    </div>

    <center>
        <v-btn color="green" @click="addPointToStore">Add A Point</v-btn>
    </center>
    <br />
</div>
</template>

<script>
export default {
    name: "MiscAdder",
    props: ["dialog"],
    data() {
        return {
            userInputLat: "",
            userInputLong: "",
            userInputLabel: "",
            inputError: "",
            inputSuccess: ""
        };
    },
    methods: {
        addPointToStore: function () {
            var inputLat = this.$data.userInputLat;
            var inputLong = this.$data.userInputLong;
            var inputLabel = this.$data.userInputLabel;

            var point = {};

            if (inputLat) {
                point.lat = inputLat;
            } else {
                point.lat = "41";
            }

            if (inputLong) {
                point.long = inputLong;
            } else {
                point.long = "-100";
            }

            if (inputLabel) {
                point.label = inputLabel;
            } else {
                point.label = point.lat + "," + point.long;
            }

            try {
                this.$store.commit("addPoint", point);
                this.inputSuccess = "Added Point!";
            } catch (error) {
                this.inputError =
                    "Error occured when adding Point to Store... " + error;
                console.log("Error occured when adding Point to Store!");
                console.error(error);
            }
        }
    },
    watch: {
        dialog: function () {
            this.inputSuccess = "";
            this.inputError = "";
            this.$refs.pointAdderForm.reset();
        }
    }
};
</script>
