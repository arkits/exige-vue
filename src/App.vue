<template>
<v-app id="exige">
    <v-app-bar app dark>
        <v-toolbar-title class="headline">
            <span class="org-title">{{org_title}}</span>
            <span>
                <a href="/exige" class="app-title white--text">Exige</a>
            </span>
        </v-toolbar-title>
              <div class="flex-grow-1"></div>
              <router-link :to="{ name: 'dashboard' }" class="white--text nav-butt">Dashboard</router-link>
              <router-link :to="{ name: 'timeline' }" class="white--text nav-butt" >Timeline</router-link>
    </v-app-bar>

    <v-content>
        <router-view />
    </v-content>
</v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            org_title: "~/"
        };
    },
    methods: {}
};
</script>

<style>
.org-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: italic;
}

.app-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
    text-decoration: none;
}

.nav-butt {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
    text-decoration: none;
    padding: 10px;
}
</style>
