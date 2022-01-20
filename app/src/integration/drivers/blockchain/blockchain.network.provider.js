import { ethers } from "ethers"
import { NetworkProvider } from 'application/general/network/index.js'

export class BlockchainNetworkProvider extends NetworkProvider {
  constructor({ global = globalThis, _ethers = ethers } = {}) {
    super()
    this.provider = null
    this.global = global
    this.ethers = _ethers
  }
  async connect() {
    if (!this.global.ethereum) {
      throw new Error('You need Metamask to connect to the blockchain.')
    }
    this.provider = new this.ethers.providers.Web3Provider(
      this.global.ethereum)
  }
}
