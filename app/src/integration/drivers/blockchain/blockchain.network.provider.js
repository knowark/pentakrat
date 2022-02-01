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

  get contract () {
    const missionAddress = this.global.config.missionAddress
    return this.ethers.Contract(missionAddress, abi, this.signer)
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
    await this.contract.trust(
      entry.address, entry.proposal)
  }

  async distrust () {
    await this.contract.distrust()
  }

  async believe () {
    await this.contract.believe()
  }

  async level () {
    return (await this.contract.getLevel(
      this.signer.getAddress())).toNumber()
  }

  async chain () {
    const response = await this.contract.getChain(
      this.signer.getAddress())
    return []
  }

  async juras () {
    return (await this.contract.getJuras(
      this.signer.getAddress())).toNumber()
  }

  async credo () {
    return (await this.contract.getCredo(
      this.signer.getAddress())).toNumber()
  }

  async supply () {
    return (await this.contract.jurasTotalSupply(
      this.signer.getAddress())).toNumber()
  }
}
