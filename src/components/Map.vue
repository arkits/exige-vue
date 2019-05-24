<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapboxOptions" @map-load="mapLoaded" />
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
                var operation_volume_geojson = {
                    geometry: operation.operation_volume,
                    type: "Feature"
                };

                mapboxData.features.push(operation_volume_geojson);
            });

            map.addLayer({
                id: "maine",
                type: "fill-extrusion",
                source: {
                    type: "geojson",
                    data: mapboxData
                },
                layout: {},
                paint: {
                    "fill-extrusion-color": "#088",
                    "fill-extrusion-height": 100,
                    "fill-extrusion-base": 0,
                    "fill-extrusion-opacity": 0.5
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
