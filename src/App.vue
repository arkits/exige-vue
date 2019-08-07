<template>
<v-app id="exige">
    <v-app-bar app dark>
        <v-toolbar-title class="headline">
            <span class="org-title">{{org_title}}</span>
            <span>
                <a href="/exige" class="app-title white--text">Exige</a>
            </span>
        </v-toolbar-title>
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
    color: white;
}

.app-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: italic;
    color: white;
    text-decoration: none;
}
</style>
