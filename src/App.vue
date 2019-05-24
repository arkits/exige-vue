<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-light">{{org_title}}</span>
        <span class="font-weight-bold">Exige</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-layout row wrap>
        <v-flex xs3>
          <br>
          <OperationCard v-bind:operations="operations"/>
        </v-flex>
        <v-flex xs9>
          <mapbox v-bind:accessToken="mapboxAccessToken" v-bind:map-options="mapboxOptions"/>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import OperationCard from "./components/OperationCard";
import Mapbox from "mapbox-gl-vue";

export default {
  name: "App",
  components: {
    OperationCard,
    mapbox: Mapbox
  },
  data() {
    return {
      org_title: "NASA UAM · ",
      mapboxAccessToken:
        "pk.eyJ1IjoiYXJraXRzIiwiYSI6ImNqc3Bud29jMjAzcWc0OXJ6Y3YzOHltaTcifQ.EMMG5GSbT0T-lD8RGJgnAA",
      mapboxOptions: {
        style: "mapbox://styles/mapbox/dark-v9",
        center: [-100, 37],
        zoom: 4
      },
      operations: [
        {
          gufi: 1,
          uss_name: "uamalpha"
        },
        {
          gufi: 2,
          uss_name: "uambeta"
        },
        {
          gufi: 3,
          uss_name: "uamgamma"
        }
      ]
    };
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
