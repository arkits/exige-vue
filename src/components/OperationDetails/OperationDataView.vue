<template>
<div id="operationDataView">
    <div v-if="viewRawOperation">
        <v-layout>
            <v-flex>
                <v-textarea outline height="50vh" name="raw-json" label="Raw Operation JSON" :value="operationAsString"></v-textarea>
            </v-flex>
        </v-layout>
    </div>
    <div v-else>
        <br>
        <br>
        <v-layout pt-1>
            <v-flex xs2>
                <h3>
                    <strong>GUFI:</strong>
                </h3>
            </v-flex>
            <v-flex>
                <h3>{{operation.gufi}}</h3>
            </v-flex>
        </v-layout>
        <v-layout pt-1>
            <v-flex xs2>
                <h3>
                    <strong>State:</strong>
                </h3>
            </v-flex>
            <v-flex>
                <h3>{{operation.state}}</h3>
            </v-flex>
        </v-layout>
        <v-layout pt-1>
            <v-flex xs2>
                <h3>
                    <strong>USS Name:</strong>
                </h3>
            </v-flex>
            <v-flex>
                <h3>{{operation.uss_name}}</h3>
            </v-flex>
        </v-layout>
        <v-layout pt-1>
            <v-flex xs2>
                <h3>
                    <strong>Operation Volumes:</strong>
                </h3>
            </v-flex>
            <v-flex>
                <h3>{{operationVolumeLength}}</h3>
            </v-flex>
        </v-layout>
        <br>
        <br>
    </div>

        <v-divider></v-divider>
        <br>
        <center>
            <v-btn color="pink darken-1" @click="viewRawOperation = !viewRawOperation">View Raw</v-btn>
        </center>
    </div>
</template>

<script>
import Vue from "vue";
import store from "../../store";

export default {
    name: "OperationDataView",
    props: ["operation"],
    data() {
        return {
            dialog: false,
            viewRawOperation: false
        };
    },
    computed: {
        operationVolumeLength() {
            return this.operation.operation_volumes.length;
        },
        operationAsString() {
            var operationString = JSON.stringify(this.operation, null, 4);
            return operationString;
        }
    }
};
</script>
