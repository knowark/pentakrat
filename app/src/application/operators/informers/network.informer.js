import { NetworkProvider } from '../../general/network/index.js'

export class NetworkInformer {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor ({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async getSupportLevel (_entry) {
    return { data: await this.networkProvider.trustLevel() }
  }

  async getJuras (_entry) {
    return { data: 1 }
  }

  async getAddress (_entry) {
    return { data: await this.networkProvider.address() }
  }
}
