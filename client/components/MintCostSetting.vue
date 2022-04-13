<template>
  <v-card>
    <v-card-title>Set Mint Cost</v-card-title>

    <v-form @submit.prevent="save">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="amount"
              type="number"
              color="secondary"
              label="Mint Cost"
              step="1"
              min="0"
              hide-details="auto"
              :disabled="loading"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="secondary"
          type="submit"
          :block="$vuetify.breakpoint.xsOnly"
          :loading="loading"
          :disabled="loading"
          small
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MintCostSetting',
  data() {
    return {
      loading: false,
      amount: 0,
    }
  },
  computed: mapState('web3', ['currentMintCost']),
  mounted() {
    this.amount = this.currentMintCost
  },
  methods: {
    async save() {
      try {
        this.loading = true
        const result = await this.$web3
          .contract()
          .setMintCost(Number(this.amount))

        await result.wait()

        this.$toast.show('Successfully updated mint cost.', {
          icon: 'mdi-check-outline',
        })
        this.$store.dispatch('web3/getCurrentMintCost')
      } catch (error) {
        console.error(error)
        this.$toast.error('Error updating mint cost', {
          icon: 'mdi-alert-outline',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
