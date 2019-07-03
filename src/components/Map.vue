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

            if (operation.state === "ACTIVE" || operation.state === "A" || operation.state === "V") {
                operationFillColor = "#388E3C";
            }
            else if (operation.state === "ROGUE" || operation.state === "U") {
                operationFillColor = "#FF5722";
            }
            else if (operation.state === "REJECTED" || operation.state === "R") {
                operationFillColor = "#D32F2F";
            }
            else if (operation.state === "CLOSED" || operation.state === "C" || operation.state === "G") {
                operationFillColor = "#616161";
            };

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            var operationVolumes = operation.operation_volumes;

            operationVolumes.forEach(function (operationVolume) {
                var operationVolumeGeojson = {};

                if (operationVolume.hasOwnProperty("operation_geography")) {

                    operationVolumeGeojson = {
                        type: "Feature",
                        geometry: operationVolume.operation_geography,
                        properties: {
                            height: operationVolume.max_altitude.altitude_value,
                            base_height: operationVolume.min_altitude.altitude_value
                        }
                    };
                } else if (operationVolume.hasOwnProperty("flight_geography")) {

                    operationVolumeGeojson = {
                        type: "Feature",
                        geometry: operationVolume.flight_geography,
                        properties: {
                            height: operationVolume.max_altitude_wgs84_ft,
                            base_height: operationVolume.min_altitude_wgs84_ft
                        }
                    };
                }

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
                    "fill-extrusion-height": ["get", "height"],
                    "fill-extrusion-base": ["get", "base_height"],
                    "fill-extrusion-opacity": 0.5
                }
            };

            if (this.map.getSource(operationLayerId)) {
                console.log("Updating existing layer - " + operationLayerId);
                this.map.removeLayer(operationLayerId);
                this.map.removeSource(operationLayerId);
            }

            console.log("Adding layer - " + operationLayerId);
            this.map.addLayer(mapLayer);
        },
        createPositionLayer(positions) {
            var positionLayerId = positions[0].gufi + "_positions";

            var positionsToMap = [];

            for (var i in positions) {
                var position = positions[i];
                var location = position.location;
                var coordinates = location.coordinates;
                var tempPos = [coordinates[0], coordinates[1]];
                positionsToMap.push(tempPos);
            }

            var data = {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: positionsToMap
                    }
                }]
            };

            var mapLayer = {
                id: positionLayerId,
                type: "line",
                source: {
                    type: "geojson",
                    data: data
                },
                paint: {
                    "line-color": "yellow",
                    "line-opacity": 0.7,
                    "line-width": 5
                }
            };

            if (this.map.getSource(positionLayerId)) {
                console.log("Updating existing layer - " + positionLayerId);
                this.map.getSource(positionLayerId).setData(data);
            } else {
                console.log("Adding new layer - " + positionLayerId);
                this.map.addLayer(mapLayer);
            }
        },
        mapLoaded(map) {
            console.log("Map Loaded!");
        },
        viewOperationOnMap(operationToView) {

            var operationVolumeFeatureCollection = {
                type: "FeatureCollection",
                features: []
            };

            operationToView.operation_volumes.forEach(function (operationVolume) {
                var geometry = {};

                if (operationVolume.hasOwnProperty("operation_geography")) {
                    geometry = {
                        type: "Feature",
                        properties: {},
                        geometry: operationVolume.operation_geography
                    };
                } else if (operationVolume.hasOwnProperty("flight_geography")) {
                    geometry = {
                        type: "Feature",
                        properties: {},
                        geometry: operationVolume.flight_geography
                    };
                }

                operationVolumeFeatureCollection.features.push(geometry);
            });

            var bounds = geojsonExtent.bboxify(operationVolumeFeatureCollection);


            this.map.setPitch(70);

            this.map.fitBounds(bounds.bbox);
        },
        clearMapAndStore() {
            console.log("clearMapStore from Map");

            var storeOperations = store.getters.getSocketOperations;
            var map = this.map;

            console.log("Removing operation layers...");

            for (var i in storeOperations) {
                var operation = storeOperations[i];
                var operationLayerId = operation.gufi + "_operation";
                var positionLayerId = operation.gufi + "_positions";
                console.log("Removing layer - " + operationLayerId);
                console.log("Removing layer - " + positionLayerId);
                map.removeLayer(operationLayerId);
                map.removeLayer(positionLayerId);
            }

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
        },
        computeStoreSocketPositions() {
            return store.getters.getSocketPositions;
        }
    },
    watch: {
        computeStoreSocketOperations() {
            console.log("Watched change in Store Operations.");
            var updatedStoreOperations = store.getters.getSocketOperations;
            for (var i in updatedStoreOperations) {
                this.createOperationLayer(updatedStoreOperations[i]);
            }
        },
        computeStoreSocketPositions() {
            console.log("Watched change in Store Positions.");
            var storeOperations = store.getters.getSocketOperations;
            for (var i in storeOperations) {
                var operation = storeOperations[i];

                var positions = store.getters.getSocketPositionsForOperation(
                    operation.gufi
                );

                if (positions.length > 0) {
                    this.createPositionLayer(positions);
                }
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
