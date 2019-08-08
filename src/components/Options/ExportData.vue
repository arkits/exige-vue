<template>
<div>
   <v-btn block  color="orange darken-2" @click="exportData">Export Data</v-btn>
                             
</div>

</template>

<script>
import store from "../../store";

export default {
    name: "ExportData",
    components: {},
    data() {
        return {
        };
    },
    methods:{
        exportData: function(){
            console.log("Exporting Data!");

            var data = {
                exige_operations: store.state.operations,
                exige_positions: store.state.positions,
                exige_positionsLayerColorMap: store.state.positionsLayerColorMap,
                exige_points: store.state.points,
                exige_dswitch: store.state.dswitch,
            };

            data = JSON.stringify(data);

            this.createDownload(data);

        },
        createDownload: function(dataAsJsonString){
            const blob = new Blob([dataAsJsonString], {type: 'text/plain'});
            const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
            a.download = "exige_export.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    }
};
</script>