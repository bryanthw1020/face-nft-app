<template>
  <v-card>
    <template v-if="account">
      <v-card-title> All NFTs </v-card-title>
      <v-card-subtitle>
        Current Mint Cost: {{ currentMintCost }} ETH
      </v-card-subtitle>

      <div class="px-4 py-6 text-center">
        <v-row>
          <v-col cols="12" sm="3" v-for="item in items" :key="item.id">
            <collection-list-item
              :token-id="item.tokenId"
              :mint-cost="currentMintCost"
            />
          </v-col>
        </v-row>
      </div>
    </template>
    <template v-else>
      <v-card-text class="text-center py-10">
        Please connect your wallet to proceed
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CollectionList',
  watch: {
    account: function (account, oldAccount) {
      if (account !== oldAccount) {
        this.$store.dispatch('web3/getTotalMinted')
      }
    },
  },
  computed: {
    ...mapState('web3', ['account', 'currentMintCost', 'items']),
  },
}
</script>
