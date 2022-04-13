<template>
  <v-card>
    <v-card-title> All NFTs </v-card-title>
    <v-card-subtitle>
      Current Mint Cost: {{ currentMintCost }} ETH
    </v-card-subtitle>

    <div class="px-4 py-6 text-center">
      <v-row>
        <v-col cols="12" sm="3" v-for="(id, index) in totalItems" :key="id">
          <collection-list-item
            :token-id="index"
            :mint-cost="currentMintCost"
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { v4 as uuid } from 'uuid'

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
    ...mapState('web3', ['totalMinted', 'account', 'currentMintCost']),
    totalItems() {
      return Array(this.totalMinted + 1)
        .fill(0)
        .map(() => uuid())
    },
  },
}
</script>
