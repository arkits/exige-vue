<template>
  <v-layout>
    <v-flex>
      <div v-for="operation in operations" v-bind:key="operation.gufi">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{operation.uss_name}}</h3>
            </div>
          </v-card-title>
        </v-card>
        <br />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "OperationCard",
  props: ["operations"]
};
</script>

<style scoped>
</style>

