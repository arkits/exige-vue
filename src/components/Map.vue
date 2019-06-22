<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapboxOptions" @map-load="mapLoaded" />
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import store from '../store'
import {constants} from "crypto";

export default {
    name: "Map",
    props: ["operations", "positions"],
    components: {
        mapbox: Mapbox
    },
    methods: {
        mapLoaded(map) {
            var store_operations = store.state.socket_operations;
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
            });

            this.positions.forEach(function (position) {
                var data = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: [
                                [-119.794921875, 45.55252525134013],
                                [-111.57714843749999, 46.830133640447386],
                                [-102.12890625, 45.67548217560647],
                                [-104.80957031249999, 39.53793974517628],
                                [-102.12890625, 33.394759218577995],
                                [-93.8232421875, 34.95799531086792],
                                [-86.3525390625, 33.211116472416855]
                            ]
                        }
                    }]
                };

                map.addLayer({
                    id: "yoooo",
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
    },
    computed: {
        getSocketOperations(state) {
            return store.state.socket_operations;
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
