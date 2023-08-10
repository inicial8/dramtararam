<template>
  <div class="e-nuxt-container">
    <Settings />
  </div>
</template>

<script>
import Settings from '@/components/Settings.vue'

export default {
  components: {
    Settings
  },
  data () {
    return {
      externalContent: ''
    }
  }
}
</script>

  <style>
  .e-nuxt-container {
    min-height: calc(100vh - 50px);
    background: linear-gradient(to bottom, #ece9e6, #ffffff);
    font-family: (-apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
  }
  ::-webkit-scrollbar {
      display: none;
  }
  </style>
