import { NetworkProvider } from '../../general/network/index.js'

export class NetworkInformer {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor ({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async getLevel (_entry) {
    const trustLevel = await this.networkProvider.trustLevel()
    return { data: trustLevel.toNumber() }
  }

  async getChain (_entry) {
    return { data: [] }
  }

  async getJuras (_entry) {
    return { data: 1 }
  }

  async getCredo (_entry) {
    return { data: 1 }
  }

  async getAddress (_entry) {
    return { data: await this.networkProvider.address() }
  }
}
