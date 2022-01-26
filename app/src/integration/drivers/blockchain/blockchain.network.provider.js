import { ethers } from 'ethers'
import { NetworkProvider } from 'application/general/network/index.js'

export class BlockchainNetworkProvider extends NetworkProvider {
  constructor ({ global = globalThis, _ethers = ethers } = {}) {
    super()
    this._provider = null
    this.global = global
    this.ethers = _ethers
  }

  get provider () {
    if (!this._provider) {
      throw new Error('Please connect to the blockchain first.')
    }
    return this._provider
  }

  async connect () {
    if (!this.global.ethereum) {
      throw new Error('You need Metamask to connect to the blockchain.')
    }
    this._provider = new this.ethers.providers.Web3Provider(
      this.global.ethereum)
  }

  async address () {
    const signer = this.provider.getSigner()
    return await signer.getAddress()
  }
}
