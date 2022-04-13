<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <mint-cost-setting class="mb-4" v-if="isContractOwner" />

      <collection-list />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  watch: {
    account: function (account, oldAccount) {
      if (account !== oldAccount) {
        this.$store.dispatch('web3/getIsContractOwner')
      }
    },
  },
  mounted() {
    this.$store.dispatch('web3/getCurrentMintCost')
  },
  computed: mapState('web3', ['account', 'isContractOwner']),
}
</script>
