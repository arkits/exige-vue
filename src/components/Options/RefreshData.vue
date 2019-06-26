<template>
<v-btn color="cyan" @click="refreshData" dark depressed round>
    Refresh Data
    <v-icon right dark>refresh</v-icon>
</v-btn>
</template>

<script>
import store from "../../store";
import axios from "axios";

export default {
    name: "RefreshData",
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {
        refreshData: function () {
            console.log("RefreshData");
            axios.get("https://jsonplaceholder.typicode.com/posts")
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style>
</style>
