<template>
<div>
    <center>
        <br />
        <v-flex xs10>
            <v-form ref="positionAdderForm">
                <v-textarea outlined v-model="userInputPosition" name="input-json-pos" label="JSON Position" hint="Enter a Position or list of Positions. Refer to UTM API."></v-textarea>
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
        <v-btn color="green" @click="addPositionToStore">Add Position</v-btn>
    </center>
</div>
</template>

<script>
export default {
    name: "PositionAdder",
    props: ["dialog"],
    data() {
        return {
            userInputPosition: "",
            inputError: "",
            inputSuccess: ""
        };
    },
    methods: {
        addPositionToStore: function () {
            var userInput = this.$data.userInputPosition;
            try {
                var jsonUserInput = JSON.parse(userInput);
                if (Array.isArray(jsonUserInput)) {
                    for (var i in jsonUserInput) {
                        this.$store.commit("addPosition", jsonUserInput[i]);
                        this.inputSuccess = "Added " + jsonUserInput.length + " Positions!";
                    }
                } else {
                    this.$store.commit("addPosition", jsonUserInput);
                    this.inputSuccess = "Added Position!";
                }
            } catch (error) {
                this.inputError =
                    "Error occured when adding Position to Store... " + error;
                console.log("Error occured when adding Position to Store!");
                console.error(error);
            }
        }
    },
    watch: {
        dialog: function () {
            this.inputError = "";
            this.inputSuccess = "";
            this.$refs.positionAdderForm.reset();
        }
    }
};
</script>
