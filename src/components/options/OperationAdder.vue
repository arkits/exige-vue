<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" dark depressed round>
                Add Data
                <v-icon right dark>add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="green">
                <h1 class="font-weight-thin">Add Data to Store</h1>
                <h4 class="font-weight-thin font-italic">Add a new Operation or Position to Exige's Store. This is a front-end action and does reflect a USS's data!</h4>
            </v-card-title>

            <v-card-text>
                <div v-if="showRawJsonForm">
                    <center>
                        <br>
                        <v-flex xs10>
                            <v-textarea outline v-model="userInputOperation" name="input-json-op" label="JSON Operation" hint="Enter an Operation or list of Operations. Refer to UTM USS API Operation"></v-textarea>

                            <v-textarea outline v-model="userInputPosition" name="input-json-pos" label="JSON Position" hint="Enter a Position or list of Positions. Refer to UTM USS API Positions"></v-textarea>
                        </v-flex>
                    </center>
                </div>
                <div v-else></div>

                <center>
                    <div v-if="inputError">
                        <p class="font-weight-bold red">{{inputError}}</p>
                    </div>
                </center>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn color="green" depressed @click="addOperationToStore">Add Operation</v-btn>
                <v-btn color="green" depressed @click="addPositionToStore">Add Position</v-btn>
                <v-spacer></v-spacer>

                <v-btn color="green" depressed @click="dialog = false">Close</v-btn>
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
