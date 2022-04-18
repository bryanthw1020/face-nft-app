import MetaMaskOnboarding from '@metamask/onboarding'
import { v4 as uuid } from 'uuid'

export const state = () => ({
  metaMaskOnboarding: null,
  connected: false,
  account: null,
  balance: 0,
  networkId: null,
  totalMinted: 0,
  currentMintCost: 0,
  isContractOwner: false,
  items: [],
})

export const mutations = {
  setMetaMaskOnboarding(state, onboarding) {
    state.metaMaskOnboarding = onboarding
  },
  updateConnectStatus(state, status) {
    state.connected = status
  },
  updateAccount(state, account) {
    state.account = account
  },
  updateBalance(state, balance) {
    state.balance = balance
  },
  updateNetworkId(state, networkId) {
    state.networkId = networkId
  },
  updateTotalMinted(state, total) {
    state.totalMinted = total
  },
  updateCurrentMintCost(state, amount) {
    state.currentMintCost = amount
  },
  updateIsContractOWner(state, status) {
    state.isContractOwner = status
  },
  updateItems(state, items) {
    state.items = items
  },
}

export const actions = {
  startOnboarding({ commit, state }) {
    commit('setMetaMaskOnboarding', new MetaMaskOnboarding())
    state.metaMaskOnboarding.startOnboarding()
  },
  stopOnboarding({ commit, state }) {
    const { metaMaskOnboarding } = state

    if (metaMaskOnboarding) {
      metaMaskOnboarding.stopOnboarding()

      commit('setMetaMaskOnboarding', null)
    }
  },
  async getTotalMinted({ commit, dispatch }) {
    commit('updateTotalMinted', 0)

    const totalMinted = await this.$web3.contract().totalSupply()

    commit('updateTotalMinted', parseInt(totalMinted))

    await dispatch('getTotalItems')
  },
  async getTotalItems({ commit, state }) {
    let items = await Promise.all(
      Array(state.totalMinted + 1)
        .fill(0)
        .map(async (_, tokenId) => {
          return {
            id: uuid(),
            tokenId,
            isBurned: await this.$web3.contract().isTokenDeleted(tokenId),
          }
        })
    )

    commit(
      'updateItems',
      items.filter((item) => !item.isBurned)
    )
  },
  async getIsContractOwner({ commit, state }) {
    const ownerAccount = await this.$web3.contract().owner()

    commit(
      'updateIsContractOWner',
      parseInt(ownerAccount) == parseInt(state.account)
    )
  },
  async getCurrentMintCost({ commit }) {
    const amount = await this.$web3.contract().mintCost()

    commit('updateCurrentMintCost', Number(amount).toFixed(2))
  },
}
