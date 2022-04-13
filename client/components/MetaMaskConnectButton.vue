<template>
  <v-btn color="secondary" :disabled="disabled" outlined @click="connect">
    <v-icon left>mdi-wallet-outline</v-icon>
    Connect
  </v-btn>
</template>

<script>
import MetaMaskOnboarding from '@metamask/onboarding'

export default {
  name: 'MetaMaskConnectButton',
  data() {
    return {
      disabled: false,
    }
  },
  async mounted() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await this._listAccounts()
    }
  },
  methods: {
    async connect() {
      try {
        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
          return this._installExtension()
        }

        await this.$web3.getAccounts()
      } catch (error) {
        console.error(error)
      }
    },

    _installExtension() {
      this.disabled = true

      this.$store.dispatch('web3/startOnboarding')
    },
    async _listAccounts() {
      try {
        const accounts = await this.$web3.provider().listAccounts()

        this.$web3.updateMetaMaskState(accounts[0])
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
