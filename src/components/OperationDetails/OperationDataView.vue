<template>
<div id="operationDataView">
    <div v-if="viewRawOperation">
        <v-layout>
            <v-flex>
                <v-textarea outlined name="raw-json" label="Raw Operation JSON" :value="operationAsString"></v-textarea>
            </v-flex>
        </v-layout>
    </div>
    <div v-else>
        <v-simple-table dark>
            <tbody>
                <tr>
                    <td>GUFI</td>
                    <td>{{operation.gufi}}</td>
                </tr>

                <tr>
                    <td>Flight Number</td>
                    <td>{{operation.flight_number}}</td>
                </tr>

                <tr>
                    <td>State</td>
                    <td>{{operation.state}}</td>
                </tr>

                <tr>
                    <td>USS Name</td>
                    <td>{{operation.uss_name}}</td>
                </tr>

                <tr>
                    <td>Number of Volumes</td>
                    <td>{{operationVolumeLength}}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
    <v-divider></v-divider>
    <br />
    <center>
        <v-btn color="pink darken-1" @click="viewRawOperation = !viewRawOperation">View Raw</v-btn>
    </center>
</div>
</template>

<script>
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
