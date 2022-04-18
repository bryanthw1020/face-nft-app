<template>
  <v-dialog v-model="show" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon @click="show = true">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <div class="px-6 py-3">
        <v-alert class="mb-0" type="warning" border="left" dense>
          Warning! This process cannot be undone.
        </v-alert>
      </div>

      <v-card-title class="text-h5"> Confirm burn token? </v-card-title>

      <v-card-text>
        <div>Token ID: #{{ this.tokenId }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false"> Cancel </v-btn>
        <v-btn color="secondary" text @click="burn"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BurnTokenButton',
  props: ['burn', 'tokenId'],
  data() {
    return {
      show: false,
    }
  },
}
</script>
