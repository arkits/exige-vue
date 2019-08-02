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

    <center>
        <div v-if="inputError">
            <p class="font-weight-bold red">{{inputError}}</p>
        </div>

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
                            "addOperation",
                            jsonUserInput[i]
                        );
                    }
                } else {
                    this.$store.commit("addOperation", jsonUserInput);
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
            this.$refs.operationAdderForm.reset();
        }
    }
};
</script>
