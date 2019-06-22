<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" persistent scrollable width="800">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" small dark fab>
                <v-icon>add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline green" primary-title>Operation Adder</v-card-title>

            <v-card-text>

                 <v-text-field   v-model="userInputOperation" label="Operation as a JSON" required></v-text-field>
            
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="addToStore">Add</v-btn>
                <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
            
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Vue from "vue";
import store from "../../store";

export default {
    name: "OperationAdder",
    data() {
        return {
            userInputOperation: "",
            dialog: false,
        };
    },
    methods: {
        addToStore: function(){
            var userInput = this.$data.userInputOperation
            try {
                var jsonUserOperation = JSON.parse(userInput);
                console.log(jsonUserOperation);
                this.$store.commit('addOperationToSocketOperations', jsonUserOperation);
            } catch (error) {
                console.log("Error occured when addToStore!");
                console.error(error);
            }
        }

    }
};
</script>
