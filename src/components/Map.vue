<template>
    <mapbox 
        v-bind:accessToken="mapboxAccessToken" 
        v-bind:map-options="mapboxOptions"
    />
</template>

<script>
import Mapbox from "mapbox-gl-vue";

export default {
  name: "Map",
  components: {
    mapbox: Mapbox
  },
  data() {
    return {
      mapboxAccessToken:
        "pk.eyJ1IjoiYXJraXRzIiwiYSI6ImNqc3Bud29jMjAzcWc0OXJ6Y3YzOHltaTcifQ.EMMG5GSbT0T-lD8RGJgnAA",
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


