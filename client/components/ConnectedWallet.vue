<template>
  <div class="components__connectedWallet">
    <v-menu dark offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary" outlined v-bind="attrs" v-on="on">
          <v-icon left>mdi-account-outline</v-icon>
          {{ address }}
          <v-icon right>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Wallet Balance</v-list-item-title>
            <v-list-item-subtitle>
              <div>{{ balance }} ETH</div>
              <small>Network ID: {{ networkId }}</small>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.prevent="refreshBalance">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item @click="copyAddress">
          <v-list-item-icon>
            <v-icon>mdi-content-copy</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Copy Address </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ConnectedWallet',
  computed: {
    ...mapState('web3', ['account', 'balance', 'networkId']),
    items() {
      return [
        {
          title: 'Copy Address',
          url: '',
        },
      ]
    },
    address() {
      let address = '-'

      if (this.account) {
        const firstPart = this.account.substring(0, 5)
        const lastPart = this.account.slice(-4)

        address = `${firstPart}...${lastPart}`
      }

      return address
    },
  },
  methods: {
    async copyAddress() {
      try {
        await this.$copyText(this.account)

        this.$toast.show('Wallet address copied to clipboard.', {
          icon: 'check',
        })
      } catch (error) {
        console.log(error)
      }
    },
    async refreshBalance() {
      await this.$web3.getBalance()
    },
  },
}
</script>
