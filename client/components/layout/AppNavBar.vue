<template>
  <v-app-bar app>
    <v-toolbar-title class="mr-6">Face NFT</v-toolbar-title>

    <v-spacer />

    <connected-wallet v-if="connected" />
    <meta-mask-connect-button v-else />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNavBar',
  computed: {
    ...mapState('web3', ['connected']),
  },
}
</script>
