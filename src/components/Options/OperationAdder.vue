<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" text>
                Add Data
                <v-icon right dark>add</v-icon>
            </v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="green">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Add Data to Exige</v-list-item-title>
                        <v-list-item-subtitle>Add a new Operation or Position to Exige's Store. This is a front-end action and does reflect a USS's data!</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <div v-if="showRawJsonForm">
                <center>
                    <br />
                    <v-flex xs10>
                        <v-form ref="operationAdderForm">
                            <v-textarea outlined v-model="userInputOperation" name="input-json-op" label="JSON Operation" hint="Enter an Operation or list of Operations. v2 and v4 data model accepted. Refer to UTM API."></v-textarea>
                            <v-textarea outlined v-model="userInputPosition" name="input-json-pos" label="JSON Position" hint="Enter a Position or list of Positions. Refer to UTM API."></v-textarea>
                        </v-form>
                    </v-flex>
                </center>
            </div>
            <div v-else></div>

            <center>
                <div v-if="inputError">
                    <p class="font-weight-bold red">{{inputError}}</p>
                </div>
            </center>

            <v-card-actions>
                <v-btn color="green" @click="addOperationToStore">Add Operation</v-btn>
                <v-btn color="green" @click="addPositionToStore">Add Position</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "OperationAdder",
    data() {
        return {
            userInputOperation: "",
            userInputPosition: "",
            showRawJsonForm: true,
            dialog: false,
            inputError: ""
        };
    },
    methods: {
        closeDialog: function () {
            this.dialog = false;
            this.$refs.operationAdderForm.reset();
        },
        addOperationToStore: function () {
            var userInput = this.$data.userInputOperation;
            try {
                var jsonUserInput = JSON.parse(userInput);
                if (Array.isArray(jsonUserInput)) {
                    for (var i in jsonUserInput) {
                        this.$store.commit(
                            "addOperationToSocketOperations",
                            jsonUserInput[i]
                        );
                    }
                } else {
                    this.$store.commit("addOperationToSocketOperations", jsonUserInput);
                }
            } catch (error) {
                this.inputError =
                    "Error occured when adding Operation to Store... " + error;
                console.log("Error occured when adding Operation to Store!");
                console.error(error);
            }
        },
        addPositionToStore: function () {
            var userInput = this.$data.userInputPosition;
            try {
                var jsonUserInput = JSON.parse(userInput);
                if (Array.isArray(jsonUserInput)) {
                    for (var i in jsonUserInput) {
                        this.$store.commit(
                            "addPositionToSocketPositions",
                            jsonUserInput[i]
                        );
                    }
                } else {
                    this.$store.commit("addPositionToSocketPositions", jsonUserInput);
                }
            } catch (error) {
                this.inputError =
                    "Error occured when adding Position to Store... " + error;
                console.log("Error occured when adding Position to Store!");
                console.error(error);
            }
        }
    }
};
</script>
