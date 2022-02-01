import { NetworkProvider } from '../../general/network/index.js'

export class NetworkInformer {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor ({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async getAddress (_entry) {
    return { data: await this.networkProvider.address() }
  }

  async getLevel (_entry) {
    return { data: await this.networkProvider.level() }
  }

  async getChain (_entry) {
    return { data: await this.networkProvider.chain() }
  }

  async getCredo (_entry) {
    return { data: await this.networkProvider.credo() }
  }

  async getJuras (_entry) {
    return { data: await this.networkProvider.juras() }
  }

  async getSupply (_entry) {
    return { data: await this.networkProvider.supply() }
  }
}
