<template>
  <v-card color="accent">
    <v-img :src="isMinted ? imageURI : '/images/placeholder.png'">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>

    <v-card-title>Face #{{ tokenId }}</v-card-title>

    <v-card-actions>
      <v-btn
        color="secondary"
        :disabled="isMinted"
        block
        @click="mint"
        v-if="!isMinted || !isOwner"
      >
        <template v-if="isMinted"> Taken </template>
        <template v-else> Mint </template>
      </v-btn>
      <v-btn
        color="info"
        block
        v-else-if="isMinted && isOwner"
        @click="showURI"
      >
        Show URI
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ethers } from 'ethers'
import { mapState } from 'vuex'

export default {
  name: 'CollectionListItem',
  props: ['tokenId', 'mintCost'],
  mounted() {
    if (this.account) {
      this.getMintedStatus()
    }
  },
  data() {
    return {
      isMinted: false,
      isOwner: false,
    }
  },
  computed: {
    ...mapState('web3', ['account']),
    contentId() {
      return this.$config.contentId
    },
    metadataURI() {
      return `${this.contentId}/${this.tokenId}.json`
    },
    imageURI() {
      return `https://gateway.pinata.cloud/ipfs/${this.contentId}/${this.tokenId}.png`
    },
  },
  methods: {
    async showURI() {
      if (!this.isMinted || !this.isOwner) {
        return
      }

      try {
        const uri = await this.$web3.contract().tokenURI(this.tokenId)

        alert(uri)
      } catch (error) {
        console.error(error)
      }
    },
    async getMintedStatus() {
      this.isMinted = await this.$web3
        .contract()
        .isContentOwned(this.metadataURI)

      await this._getOwner()
    },
    async _getOwner() {
      if (!this.isMinted) {
        return
      }

      this.isOwner = await this.$web3.contract().isContentOwner(this.tokenId)
    },
    async mint() {
      if (this.isMinted) {
        return
      }

      if (!this.account) {
        return this.$toast.show('Please connect your wallet', {
          icon: 'mdi-alert-outline',
        })
      }

      try {
        const contract = this.$web3.contract()
        const address = await contract.signer.getAddress()
        const result = await contract.payToMint(address, this.metadataURI, {
          value: ethers.utils.parseEther(this.mintCost),
        })

        await result.wait()
        this.$store.dispatch('web3/getTotalMinted')
      } catch (error) {
        const { code } = error

        if (code && code == 4001) {
          return
        }

        this.$toast.error('Error minting. Please try again later.', {
          icon: 'mdi-alert-outline',
        })
      }
    },
  },
}
</script>
