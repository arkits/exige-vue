<template>
    <mapbox 
        v-bind:accessToken="mapboxAccessToken" 
        v-bind:map-options="mapboxOptions" 
        @map-load="mapLoaded"
    />
</template>

<script>
import Mapbox from "mapbox-gl-vue";

export default {
    name: "Map",
    props: ["operations"],
    components: {
        mapbox: Mapbox
    },
    methods: {
        mapLoaded(map) {

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            this.operations.forEach(function (operation) {
                var operation_volume = operation.operation_volume;
                // console.log(operation_volume);
                mapboxData.features.push(operation_volume);
            });

            map.addLayer({
                id: "points",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: mapboxData
                },
                layout: {
                    "icon-image": "{icon}-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });
        }
    },
    data() {
        return {
            mapboxAccessToken: "pk.eyJ1IjoiYXJraXRzIiwiYSI6ImNqc3Bud29jMjAzcWc0OXJ6Y3YzOHltaTcifQ.EMMG5GSbT0T-lD8RGJgnAA",
            mapboxOptions: {
                style: "mapbox://styles/mapbox/dark-v9",
                center: [-100, 37],
                zoom: 4
            }
        };
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>
