<template>
<div>
    <center>
        <br />
        <v-flex xs10>
            <v-form ref="operationAdderForm">
                <v-textarea outlined v-model="userInputOperation" name="input-json-op" label="JSON Operation" hint="Enter an Operation or list of Operations. v2 and v4 data model accepted. Refer to UTM API."></v-textarea>
            </v-form>
        </v-flex>
    </center>

    <div v-if="inputError">
        <v-alert type="error">{{inputError}}</v-alert>
    </div>

    <div v-if="inputSuccess">
        <v-alert type="success">{{inputSuccess}}</v-alert>
    </div>

    <center>
        <v-btn color="green" @click="addOperationToStore">Add Operation</v-btn>
    </center>
</div>
</template>

<script>
export default {
    name: "OperationAdder",
    props: ["dialog"],
    data() {
        return {
            userInputOperation: "",
            inputError: "",
            inputSuccess: ""
        };
    },
    methods: {
        addOperationToStore: function () {
            var userInput = this.$data.userInputOperation;
            try {
                var jsonUserInput = JSON.parse(userInput);
                if (Array.isArray(jsonUserInput)) {
                    for (var i in jsonUserInput) {
                        this.$store.commit("addOperation", jsonUserInput[i]);
                    }
                    this.inputSuccess = "Added " + jsonUserInput.length + " Operations!";
                } else {
                    this.$store.commit("addOperation", jsonUserInput);
                    this.inputSuccess = "Added Operation!";
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
            this.$refs.operationAdderForm.reset();
        }
    }
};
</script>
