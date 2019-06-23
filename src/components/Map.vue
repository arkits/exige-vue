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
        mapLoaded(map) {
            console.log("Map Loaded!");

            var store_operations = store.state.socket_operations;
            var store_positions = store.state.socket_positions;

            store_operations.forEach(function (operation) {
                var operation_fill_color;

                if (operation.state === "ACTIVE") {
                    operation_fill_color = "#388E3C";
                } else if (operation.state === "ROGUE") {
                    operation_fill_color = "#D32F2F";
                } else if (operation.state === "CLOSED") {
                    operation_fill_color = "#616161";
                }

                var mapboxData = {
                    type: "FeatureCollection",
                    features: []
                };

                var operation_volumes = operation.operation_volumes;

                operation_volumes.forEach(function (operation_volume) {
                    var operation_volume_geojson = {
                        geometry: operation_volume,
                        type: "Feature"
                    };
                    mapboxData.features.push(operation_volume_geojson);
                });

                map.addLayer({
                    id: operation.gufi,
                    type: "fill-extrusion",
                    source: {
                        type: "geojson",
                        data: mapboxData
                    },
                    layout: {},
                    paint: {
                        "fill-extrusion-color": operation_fill_color,
                        "fill-extrusion-height": 10000,
                        "fill-extrusion-base": 0,
                        "fill-extrusion-opacity": 0.5
                    }
                });

                var operation_positions = [];

                store_positions.filter(function checker(position) {
                    if (position.gufi === operation.gufi) {
                        var location = position.location;
                        var coordinates = location.coordinates;
                        var data_to_map = [coordinates[0], coordinates[1]];
                        operation_positions.push(data_to_map);
                    }
                });

                var data = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: operation_positions
                        }
                    }]
                };

                map.addLayer({
                    id: operation.gufi + "_positions",
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
                });
            });
        },
        viewOperationOnMap(operationToView) {

            console.log(
                geojsonExtent.bboxify(operationToView.operation_volumes)
            );

            var bounds = geojsonExtent.bboxify(operationToView.operation_volumes);
            this.map.setPitch(70);
            this.map.fitBounds(bounds[0].bbox);
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
        getSocketOperations(state) {
            return store.state.socket_operations;
        },
        getSocketPositions(state) {
            return store.state.socket_positions;
        }
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>
