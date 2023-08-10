<template>
  <v-app id="inspire">
    <app-header />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader },
  data: () => ({ drawer: null })
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
