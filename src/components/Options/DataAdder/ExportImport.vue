<template>
<div>
    <center>
        <br />
        <v-flex xs10>
            <v-form ref="exportAdderForm">
                <v-textarea outlined v-model="userInputExport" name="input-json-export" label="Exige Export" hint="Paste an exige_export.json here."></v-textarea>
            </v-form>
        </v-flex>
    </center>

    <div v-if="inputError">
        <v-alert type="error">{{inputError}}</v-alert>
    </div>

    <div v-if="inputSuccess">
        <v-alert dense type="success">
            <span style="white-space: pre-wrap;">
                {{inputSuccess}}
            </span>
        </v-alert>
    </div>

    <center>
        <v-btn color="green" @click="doImport">Import</v-btn>
    </center>
</div>
</template>

<script>
export default {
    name: "ExigeExport",
    props: ["dialog"],
    data() {
        return {
            userInputExport: "",
            inputError: "",
            inputSuccess: ""
        };
    },
    methods: {
        doImport: function () {
            var userInput = this.$data.userInputExport;

            try {
                var jsonUserInput = JSON.parse(userInput);

                this.inputSuccess = "\n Import Result: \n";

                var exige_operations = jsonUserInput.exige_operations;
                var exige_positions = jsonUserInput.exige_positions;
                var exige_positionsLayerColorMap =
                    jsonUserInput.exige_positionsLayerColorMap;
                var exige_points = jsonUserInput.exige_points;
                var exige_dswitch = jsonUserInput.exige_dswitch;

                if (exige_operations != null) {
                    for (var i in exige_operations) {
                        this.$store.commit("addOperation", exige_operations[i]);
                    }
                    this.inputSuccess =
                        this.inputSuccess + " > Added Operations - " + exige_operations.length + "\n ";
                }

                if (exige_positions != null) {
                    for (i in exige_positions) {
                        this.$store.commit("addPosition", exige_positions[i]);
                    }
                    this.inputSuccess =
                        this.inputSuccess + "> Added Positions - " + exige_positions.length + "\n ";
                }

                if (exige_positionsLayerColorMap != null) {
                    for (i in exige_positionsLayerColorMap) {
                        this.$store.commit(
                            "addToPositionsLayerColorMap",
                            exige_positionsLayerColorMap[i]
                        );
                    }
                    this.inputSuccess =
                        this.inputSuccess +
                        "> Added PLCM - " +
                        exige_positionsLayerColorMap.length + "\n ";
                }

                if (exige_points != null) {
                    for (i in exige_points) {
                        this.$store.commit("addPoint", exige_points[i]);
                    }
                    this.inputSuccess =
                        this.inputSuccess + "> Added Points  - " + exige_points.length + "\n ";
                }

                if (exige_dswitch != null) {
                    this.$store.commit("setDSwitch", exige_dswitch);
                    this.inputSuccess =
                        this.inputSuccess +
                        "> Set 3D Switch to - " +
                        exige_dswitch + "\n ";
                }
            } catch (error) {
                this.inputError =
                    "Error occured when adding Operation to Store... " + error;
                console.log("Error occured when adding Operation to Store!");
                console.error(error);
            }
        }
    },
    watch: {
        dialog: function () {
            this.inputError = "";
            this.inputSuccess = "";
            this.$refs.exportAdderForm.reset();
        }
    }
};
</script>
