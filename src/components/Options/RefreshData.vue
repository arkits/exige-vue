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
        return {
            name: ""
        };
    },
    computed: {},
    methods: {
        refreshData: function () {
            console.log("RefreshData");
            console.log(localStorage.name);
            axios
                .get("https://jsonplaceholder.typicode.com/posts")
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        if (localStorage.name) this.name = localStorage.name;
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
        }
    }
};
</script>

<style>
</style>
