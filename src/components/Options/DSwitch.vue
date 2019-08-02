<template>
<div>
    <v-switch v-model="dswitch" inset :label="`3D: ${dswitch.toString()}`"></v-switch>
</div>

</template>

<script>
import store from "../../store";

export default {
    name: "DSwitch",
    components: {},
    data() {
        return {
            dswitch: true
        };
    },
    watch:{
        dswitch(newValue){
            console.log("3D Render = " + newValue);
            store.state.dswitch = newValue;
        }
    }
};
</script>