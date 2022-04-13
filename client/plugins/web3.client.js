import { ethers } from 'ethers'
import FaceNFT from '../../artifacts/contracts/FaceNFT.sol/FaceNFT.json'

export default ({ $config, store }, inject) => {
  let provider = null
  let contract = null
  let isListenerActive = false

  const getProvider = () => {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum)
    }

    return provider
  }

  const getAccounts = async () => {
    const accounts = await getProvider().send('eth_requestAccounts', [])

    updateMetaMaskState(accounts)
  }

  const getSigner = (address) => {
    return getProvider().getSigner(address)
  }

  const getBalance = async () => {
    const { account } = store.state.web3

    if (!account) {
      return '-'
    }

    const balance = await getProvider().getBalance(account)
    const formattedBalance = ethers.utils.formatEther(balance)

    store.commit('web3/updateBalance', Number(formattedBalance).toFixed(2))

    return formattedBalance
  }

  const updateMetaMaskState = (account) => {
    store.commit('web3/updateConnectStatus', account ? true : false)
    store.commit('web3/updateAccount', account)
    store.commit('web3/updateNetworkId', window.ethereum.networkVersion)
    getBalance()

    if (!isListenerActive) {
      _setupListener()
      isListenerActive = true
    }
  }

  const _setupListener = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      updateMetaMaskState(accounts[0])
    })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })
  }

  // CONTRACT
  const getContract = () => {
    if (!contract) {
      const contractAddress = $config.contractAddress
      const signer = getSigner()

      contract = new ethers.Contract(contractAddress, FaceNFT.abi, signer)
    }

    return contract
  }

  inject('web3', {
    provider: getProvider,
    getAccounts,
    getSigner,
    getBalance,
    updateMetaMaskState,
    contract: getContract,
  })
}
