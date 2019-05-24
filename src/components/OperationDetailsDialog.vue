<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">Operation Details</v-btn>
        </template>

        <v-card>
            <v-card-title>
                <span class="headline">Operation Details</span>
            </v-card-title>
            <v-card-text>
                <pre>{{operation}}</pre>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
        
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "OperationDetailsDialog",
    props: ["operation"],
    data() {
        return {
            dialog: false
        };
    }
};
</script>
