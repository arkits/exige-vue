<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapOptions" @map-load="mapLoaded" @map-init="mapInitialized" />
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import store from "../store";
import geojsonExtent from "@mapbox/geojson-extent";

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
        mapLoaded() {
            console.log("Map Loaded!");
        },
        createOperationLayer(operation) {

            var operationFillColor = operation.exige_op_color;
            
            var renderIn3d = store.state.dswitch;

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

            var mapLayer

            if(renderIn3d){
                mapLayer = {
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
            } else {
                mapLayer = {
                    id: operationLayerId,
                    type: "fill",
                    source: {
                        type: "geojson",
                        data: mapboxData
                    },
                    layout: {},
                    paint: {
                        "fill-color": operationFillColor,
                        "fill-opacity": 0.5
                    }
                };
            }

            if (this.map.getSource(operationLayerId)) {
                console.log("Updating existing layer - " + operationLayerId);
                this.map.removeLayer(operationLayerId);
                this.map.removeSource(operationLayerId);
            }

            console.log("Adding layer - " + operationLayerId);
            this.map.addLayer(mapLayer);
        },
        createPositionLayer(positions, layerColor) {
            var positionLayerId = positions[0].gufi + "_positions";
            var operationLayerId = positions[0].gufi + "_operation";
            var renderIn3d = store.state.dswitch;

            var layers = this.map.getStyle().layers;
            var placeBelowOperationLayer = false;
            for (var i = 0; i < layers.length; i++) {
                if (operationLayerId == layers[i].id) {
                    placeBelowOperationLayer = true;
                    break;
                }
            }

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            for (i in positions) {
                var coordinates = positions[i].location.coordinates;

                var topAlt = 5000;
                var baseAlt = 500;
                if (positions[i].altitude_gps_wgs84_ft != null) {
                    topAlt = positions[i].altitude_gps_wgs84_ft + 10;
                    baseAlt = positions[i].altitude_gps_wgs84_ft - 10;
                }

                var positionVolumeGeojson = {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [coordinates[0], coordinates[1]],
                                [coordinates[0] - 0.0002, coordinates[1]],
                                [coordinates[0] - 0.0002, coordinates[1] + 0.0002],
                                [coordinates[0], coordinates[1] + 0.0002],
                                [coordinates[0], coordinates[1]]
                            ]
                        ]
                    },
                    properties: {
                        height: topAlt,
                        base_height: baseAlt
                    }
                };

                mapboxData.features.push(positionVolumeGeojson);
            }

            var mapLayer;

            if(renderIn3d){
                mapLayer = {
                    id: positionLayerId,
                    type: "fill-extrusion",
                    source: {
                        type: "geojson",
                        data: mapboxData
                    },
                    paint: {
                        "fill-extrusion-color": layerColor,
                        "fill-extrusion-height": ["get", "height"],
                        "fill-extrusion-base": ["get", "base_height"]
                    }
                };
            } else {
                mapLayer = {
                    id: positionLayerId,
                    type: "symbol",
                    source: {
                        type: "geojson",
                        data: mapboxData
                    },
                    layout: {
                       "icon-image": "airport-15",
                    },
                };
            }

            if (this.map.getSource(positionLayerId)) {
                console.log("Updating existing layer - " + positionLayerId);
                this.map.getSource(positionLayerId).setData(mapboxData);
            } else {
                console.log("Adding new layer - " + positionLayerId);
                if (placeBelowOperationLayer) {
                    console.log("Placing below opLayer - " + positionLayerId);
                    this.map.addLayer(mapLayer, operationLayerId);
                } else {
                    this.map.addLayer(mapLayer);
                }
            }
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

            this.map.fitBounds(bounds.bbox);
        },
        clearMapAndStore() {
            console.log("clearMapStore from Map");

            var storeOperations = store.getters.getOperations;

            console.log("Removing operation layers...");

            for (var i in storeOperations) {
                var operation = storeOperations[i];
                var operationLayerId = operation.gufi + "_operation";
                var positionLayerId = operation.gufi + "_positions";
                console.log("Removing layer - " + operationLayerId);
                console.log("Removing layer - " + positionLayerId);
                this.map.removeLayer(operationLayerId);
                this.map.removeLayer(positionLayerId);
                this.map.removeSource(operationLayerId);
                this.map.removeSource(positionLayerId);
            }

            this.$store.commit("clearOperations");
        },
        clearPositionsLayer(gufi) {
            console.log("clearPositionsLayer from Map");
            var positionLayerId = gufi + "_positions";
            this.map.removeLayer(positionLayerId);
            this.map.removeSource(positionLayerId);
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
        computeOperations() {
            return store.getters.getOperations;
        },
        computePositions() {
            return store.getters.getPositions;
        },
        computePositionLayerColor() {
            return store.getters.getPositionLayerColorMap;
        }
    },
    watch: {
        computeOperations() {
            console.log("Watched change in Store Operations.");

            var updatedStoreOperations = store.getters.getOperations;

            for (var i in updatedStoreOperations) {
                this.createOperationLayer(updatedStoreOperations[i]);
            }
        },
        computePositions() {
            console.log("Watched change in Store Positions.");

            var storePositions = store.getters.getPositions;

            var sortedPositions = [];

            for (var i in storePositions) {
                var position = storePositions[i];

                if (sortedPositions.hasOwnProperty(position.gufi)) {
                    sortedPositions[position.gufi].push(position);
                } else {
                    sortedPositions[position.gufi] = [];
                    sortedPositions[position.gufi].push(position);
                }
            }

            var positionLayerColor = "yellow";

            for (i in sortedPositions) {
                this.createPositionLayer(sortedPositions[i], positionLayerColor);
            }
        },
        computePositionLayerColor(newValue) {
            console.log("Watched change in Store PositionLayerColors.");
            for (var i in newValue) {
                var storePositions = store.getters.getPositionsForOperation(
                    newValue[i].gufi
                );

                this.clearPositionsLayer(newValue[i].gufi);
                this.createPositionLayer(storePositions, newValue[i].color);
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
