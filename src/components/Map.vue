<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapOptions" @map-load="mapLoaded" @map-init="mapInitialized" />
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import axios from "axios";
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
        mapLoaded() {
            console.log("Map Loaded!");
            this.createPointsLayer();
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

            var mapLayer;

            if (renderIn3d) {
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

                var topAlt;
                var baseAlt;

                if (positions[i].altitude_gps_wgs84_ft != null) {
                    topAlt = positions[i].altitude_gps_wgs84_ft + 10;
                    baseAlt = positions[i].altitude_gps_wgs84_ft - 10;
                } else if (positions[i].altitude_gps.altitude_value != null) {
                    topAlt = positions[i].altitude_gps.altitude_value + 10;
                    baseAlt = positions[i].altitude_gps.altitude_value - 10;
                } else {
                    console.warn("Can't parse Position for " + positionLayerId);
                    topAlt = 650;
                    baseAlt = 640;
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

            if (renderIn3d) {
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
                        "icon-image": "star-15"
                    }
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
        createPointsLayer() {
            var pointsLayerId = "exigePointsLayer";

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            var mapLayer = {
                id: pointsLayerId,
                type: "symbol",
                source: {
                    type: "geojson",
                    data: mapboxData
                },
                layout: {
                    "icon-image": "star-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                },
                paint: {
                    "text-color": ["get", "color"]
                }
            };

            this.map.addLayer(mapLayer);
        },
        createGridLayer() {
            var gridLayerId = "exigeGridLayer";
            var map = this.map;

            axios
                .get(
                    "https://raw.githubusercontent.com/arkits/exige/master/grid/gridTiles.json"
                )
                .then(function (response) {
                    console.log("Got Grid Adaptation!");

                    var mapboxData = response.data;

                    var mapLayer = {
                        id: gridLayerId,
                        type: "fill",
                        source: {
                            type: "geojson",
                            data: mapboxData
                        },
                        paint: {
                            "fill-color": "rgba(255,255,255,0.0)",
                            "fill-outline-color": "rgba(51, 181, 229,1.0)",
                            "fill-opacity": 1
                        }
                    };

                    console.log("Creating Grid Layer!");
                    map.addLayer(mapLayer);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addToPointLayer(points) {
            var pointsLayerId = "exigePointsLayer";

            var mapboxData = {
                type: "FeatureCollection",
                features: []
            };

            for (var i in points) {
                var point = points[i];

                if (point.label === "") {
                    point.label = point.lat + "," + point.long;
                }

                var pointGeoJson = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [point.long, point.lat]
                    },
                    properties: {
                        title: point.label,
                        color: point.exige_point_color
                    }
                };

                mapboxData.features.push(pointGeoJson);
            }

            this.map.getSource(pointsLayerId).setData(mapboxData);
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
        toggleOperationOnMap(operation) {
            console.log("toggleOperationOnMap - " + operation.gufi);

            var operationLayerId = operation.gufi + "_operation";

            var visibilityOp = this.map.getLayoutProperty(
                operationLayerId,
                "visibility"
            );

            if (visibilityOp === "visible" || typeof visibilityOp === "undefined") {
                console.log("toggleOperationOnMap - Hide " + operationLayerId);
                this.map.setLayoutProperty(operationLayerId, "visibility", "none");
            } else {
                console.log("toggleOperationOnMap - Show " + operationLayerId);
                this.map.setLayoutProperty(operationLayerId, "visibility", "visible");
            }
        },
        togglePositionsOnMap(operation) {
            console.log("togglePositionsOnMap - " + operation.gufi);

            var positionLayerId = operation.gufi + "_positions";

            var visibilityPos = this.map.getLayoutProperty(
                positionLayerId,
                "visibility"
            );

            if (visibilityPos === "visible" || typeof visibilityPos === "undefined") {
                console.log("togglePositionsOnMap - Hide " + positionLayerId);
                this.map.setLayoutProperty(positionLayerId, "visibility", "none");
            } else {
                console.log("togglePositionsOnMap - Show " + positionLayerId);
                this.map.setLayoutProperty(positionLayerId, "visibility", "visible");
            }
        },
        clearMapAndStore() {
            console.log("clearMapStore from Map");

            var storeOperations = store.getters.getOperations;

            console.log("Removing operation layers...");

            for (var i in storeOperations) {
                var operation = storeOperations[i];
                var operationLayerId = operation.gufi + "_operation";
                var positionLayerId = operation.gufi + "_positions";

                try {
                    console.log("Removing layer - " + operationLayerId);
                    this.map.removeLayer(operationLayerId);
                    this.map.removeSource(operationLayerId);
                    console.log("Removing layer - " + positionLayerId);
                    this.map.removeLayer(positionLayerId);
                    this.map.removeSource(positionLayerId);
                } catch (error) {
                    console.log("Caught error when clearing store!");
                    console.error(error);
                }
            }

            this.$store.commit("clearOperations");
        },
        clearPositionsLayer(gufi) {
            console.log("clearPositionsLayer from Map");
            var positionLayerId = gufi + "_positions";
            try {
                this.map.removeLayer(positionLayerId);
                this.map.removeSource(positionLayerId);
            } catch (error) {
                console.log("Caught error when clearing store!");
                console.error(error);
            }
        },
        removeGridLayer() {
            console.log("Removing Grid Layer from Map");
            var gridLayerId = "exigeGridLayer";
            this.map.removeLayer(gridLayerId);
            this.map.removeSource(gridLayerId);
        }
    },
    data() {
        return {
            map: {},
            mapboxAccessToken: "pk.eyJ1IjoiYXJraXRzIiwiYSI6ImNqc3Bud29jMjAzcWc0OXJ6Y3YzOHltaTcifQ.EMMG5GSbT0T-lD8RGJgnAA",
            mapOptions: {
                style: "mapbox://styles/arkits/cjvhbvo4z0edh1cmtjmpg9ii8?optimize=true",
                center: [-122.3465, 37.6977],
                zoom: 9
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
        },
        computePoints() {
            return store.getters.getPoints;
        },
        computeGridDraw() {
            return store.getters.getGridDraw;
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
        computePositions(newPositions, oldPositions) {
            console.log("Watched change in Store Positions.");

            var newPositionGufis = Object.keys(newPositions);
            var positionLayerColor = "yellow";

            for (var i in newPositionGufis) {
                var newGufi = newPositionGufis[i];

                if (oldPositions[newGufi]) {
                    // oldPositions has this gufi
                    if (oldPositions[newGufi].length != newPositions[newGufi]) {
                        // Change in length of old and new
                        this.createPositionLayer(newPositions[newGufi], positionLayerColor);
                    }
                } else {
                    // oldPositons does not have this gufi
                    this.createPositionLayer(newPositions[newGufi], positionLayerColor);
                }
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
        },
        computePoints(points) {
            console.log("Watched change in Store Points.");
            this.addToPointLayer(points);
        },
        computeGridDraw(newValue) {
            console.log("Watched change in GridDraw - " + newValue);
            if (newValue) {
                this.createGridLayer();
            } else {
                this.removeGridLayer();
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
