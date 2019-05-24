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
          <Operations v-bind:operations="operations"/>
        </v-flex>
        <v-flex xs9>
          <Map />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Operations from "./components/Operations";
import Map from "./components/Map";

export default {
  name: "App",
  components: {
    Operations,
    Map
  },
  data() {
    return {
      org_title: "NASA UAM · ",
      operations: [
        {
          gufi: 1,
          uss_name: "uamalpha",
          state: "ACTIVE"
        },
        {
          gufi: 2,
          uss_name: "uambeta",
          state: "ROGUE"
        },
        {
          gufi: 3,
          uss_name: "uamgamma",
          state: "CLOSED"
        }
      ]
    };
  }
};
</script>

<style>
</style>
