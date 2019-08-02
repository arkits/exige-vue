<template>
<div>
    <div v-if="showRawJsonForm">
        <center>
            <br />
            <v-flex xs10>
                <v-form ref="positionAdderForm">
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

        <v-btn color="green" @click="addPositionToStore">Add Position</v-btn>
    </center>
</div>
</template>

<script>
export default {
    name: "PositionAdder",
    data() {
        return {
            userInputOperation: "",
            userInputPosition: "",
            showRawJsonForm: true,
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
