<template>
<div>
    <v-switch v-model="gridDraw" inset></v-switch>
</div>
</template>

<script>
import store from "../../store";

export default {
    name: "GridDraw",
    components: {},
    data() {
        return {
            gridDraw: false
        };
    },
    watch: {
        gridDraw(newValue) {
            this.$store.commit("setGridDraw", newValue);
        }
    },
    computed: {
        computeGridDraw() {
            this.gridDraw = store.getters.getGridDraw;
            return store.getters.getGridDraw;
        }
    }
};
</script>
