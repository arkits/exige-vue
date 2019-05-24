<template>
<mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapboxOptions" @map-load="mapLoaded" />
</template>

<script>
import Mapbox from "mapbox-gl-vue";
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
        mapLoaded(map) {
            this.operations.forEach(function (operation) {
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
                                [
                                    -122.019807,
                                    45.632433
                                ],
                                [
                                    -122.019767,
                                    45.632453
                                ],
                                [
                                    -122.01971,
                                    45.632472
                                ],
                                [
                                    -122.01971,
                                    45.632505
                                ],
                                [
                                    -122.019739,
                                    45.632531
                                ],
                                [
                                    -122.019781,
                                    45.632549
                                ],
                                [
                                    -122.019815,
                                    45.63257
                                ]
                            ]
                        }
                    }]
                };



                map.addLayer({
                    id: "yoooo",
                    type: "line",
                    source: {
                        type: 'geojson', 
                        data: data
                    },
                    paint: {
                        "line-color": "yellow",
                        "line-opacity": 1,
                        "line-width": 50
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
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>
