<template>
<v-btn fab color="white darken-1" @click="refreshData">
    <v-icon color="blue darken-1" dark>refresh</v-icon>
</v-btn>
</template>

<script>
import store from "../../store";

export default {
    name: "RefreshData",
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {
        refreshData: function () {
            console.log("refreshData");
        }
    }
};
</script>

<style>
</style>
