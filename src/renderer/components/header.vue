
<template>
  <div class="drag">
    <v-app-bar
      dense
      dark
      elevation="0"
    >
      <v-app-bar-nav-icon>
        <v-avatar dark size="36">
          <img style="color: white;" src="~/assets/32x32.png">
        </v-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex justify-space-between h1"><small>pre</small><b>dock</b></v-toolbar-title>

      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            icon
            class="ma-2 no-drag"
            large link
            to="/"
            v-on="on"
          >
            <v-icon large>mdi-cube-outline</v-icon>
          </v-btn>
        </template>
        <span>View Docker containers</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            icon
            class="ma-2 no-drag"
            link
            to="/settings"
            large v-on="on"
          >
            <v-icon>mdi-cogs</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
      <v-spacer />

      <v-spacer />
      <v-spacer />

      <v-btn icon small class="no-drag">
        <v-icon small @click="minimize_app">mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn icon small class="no-drag">
        <v-icon small @click="maximize_app">mdi-square-rounded-outline</v-icon>
      </v-btn>
      <v-btn icon small class="no-drag">
        <v-icon id="close-btn" small @click="close_app">mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  methods: {
    close_app () {
      ipcRenderer.send('closeApp')
    },
    minimize_app () {
      ipcRenderer.send('minimizeApp')
    },
    maximize_app () {
      ipcRenderer.send('maximizeApp')
    }
  }
}
</script>

<style scoped>
    .drag{
      -webkit-app-region: drag;
    }
    .no-drag{
      -webkit-app-region: no-drag;
    }
</style>
