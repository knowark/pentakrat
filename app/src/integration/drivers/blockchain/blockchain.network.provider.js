import { ethers } from 'ethers'
import { NetworkProvider } from 'application/general/network/index.js'
import { abi } from './contract.abi.js'

export class BlockchainNetworkProvider extends NetworkProvider {
  constructor ({ global = globalThis, _ethers = ethers } = {}) {
    super()
    this._signer = null
    this.global = global
    this.ethers = _ethers
  }

  get signer () {
    if (!this._signer) {
      throw new Error('Please ensure your account is connected.')
    }
    return this._signer
  }

  async connect () {
    if (!this.global.ethereum) {
      throw new Error('You need Metamask to connect to the blockchain.')
    }
    const provider = new this.ethers.providers.Web3Provider(
      this.global.ethereum)
    this._signer = provider.getSigner()
  }

  async address () {
    return await this.signer.getAddress()
  }

  async trust (entry) {
    const missionAddress = this.global.config.missionAddress
    const contract = new this.ethers.Contract(
      missionAddress, abi, this.signer)
    await contract.establishTrust(entry.address, entry.proposal)
  }

  async trustLevel () {
    const missionAddress = this.global.config.missionAddress
    const contract = new this.ethers.Contract(
      missionAddress, abi, this.signer)
    return (await contract.getTrustLevel(this.signer.getAddress())).toNumber()
  }
}
