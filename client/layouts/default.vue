<template>
  <v-app dark>
    <v-main>
      <layout-app-nav-bar />

      <v-container class="pa-4 pa-sm-6 pa-md-8" fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
