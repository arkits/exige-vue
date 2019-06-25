<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapOptions" @map-load="mapLoaded" @map-init="mapInitialized" />
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import store from "../store";

import geojsonExtent from "@mapbox/geojson-extent";
import {
    constants
} from "crypto";

export default {
    name: "Map",
    props: ["operations", "positions"],
    components: {
        mapbox: Mapbox
    },
    methods: {
        mapInitialized(map) {
            this.map = map;
        },
        createOperationLayer(operation) {
            var operationFillColor;

            if (operation.state === "ACTIVE") {
                operationFillColor = "#388E3C";
            } else if (operation.state === "ROGUE") {
                operationFillColor = "#D32F2F";
            } else if (operation.state === "CLOSED") {
                operationFillColor = "#616161";
            }

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            var operationVolumes = operation.operation_volumes;

            operationVolumes.forEach(function (operationVolume) {
                var operationVolumeGeojson = {
                    geometry: operationVolume.flight_geography,
                    type: "Feature"
                };
                mapboxData.features.push(operationVolumeGeojson);
            });

            var operationLayerId = operation.gufi + "_operation";

            var mapLayer = {
                id: operationLayerId,
                type: "fill-extrusion",
                source: {
                    type: "geojson",
                    data: mapboxData
                },
                layout: {},
                paint: {
                    "fill-extrusion-color": operationFillColor,
                    "fill-extrusion-height": 10000,
                    "fill-extrusion-base": 0,
                    "fill-extrusion-opacity": 0.5
                }
            };

            if(this.map.getSource(operationLayerId)){
                console.log("Updating existing layer - " + operationLayerId);
                this.map.getSource(operationLayerId).setData(mapLayer);
            }else{
                console.log("Adding new layer - " + operationLayerId);
                this.map.addLayer(mapLayer);
            }

        },
        mapLoaded(map) {
            console.log("Map Loaded!");

            var store_operations = store.getters.getSocketOperations;

            for (var operation in store_operations) {
                this.createOperationLayer(store_operations[operation]);
            }
        },
        viewOperationOnMap(operationToView) {
            console.log(operationToView.operation_volumes);

            var operationVolumeFeatureCollection = {
                type: "FeatureCollection",
                features: []
            };

            operationToView.operation_volumes.forEach(function (operation_volume) {
                var geometry = {
                    type: "Feature",
                    properties: {},
                    geometry: operation_volume.flight_geography
                };

                operationVolumeFeatureCollection.features.push(geometry);
            });

            var bounds = geojsonExtent.bboxify(operationVolumeFeatureCollection);

            console.log(bounds);

            this.map.fitBounds(bounds.bbox);
        },
        clearMapAndStore() {
            console.log("clearMapStore from Map");

            var store_operations = store.state.socket_operations;
            var map = this.map;

            console.log("Removing operation layers...");
            store_operations.forEach(function (operation) {
                var operationLayerId = operation.gufi;
                var positionLayerId = operationLayerId + "_positions";
                map.removeLayer(operationLayerId);
                map.removeLayer(positionLayerId);
            });

            this.$store.commit("clearSocketOperations");
        }
    },
    data() {
        return {
            map: {},
            mapboxAccessToken: "pk.eyJ1IjoiYXJraXRzIiwiYSI6ImNqc3Bud29jMjAzcWc0OXJ6Y3YzOHltaTcifQ.EMMG5GSbT0T-lD8RGJgnAA",
            mapOptions: {
                style: "mapbox://styles/mapbox/dark-v9",
                center: [-100, 37],
                zoom: 4
            }
        };
    },
    computed: {
        computeStoreSocketOperations() {
            return store.getters.getSocketOperations;
        }
    },
    watch: {
        computeStoreSocketOperations(newStore, oldStore) {
            console.log("Watched change in Store Operations. Redrawing Map.");

            for (var i in newStore) {
                this.createOperationLayer(newStore[i]);
            }
        }
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 95vh;
}

@media screen and (max-width: 960px) {
    #map {
        width: 100%;
        height: 60vh;
    }
}
</style>
