import { NetworkProvider } from '../../general/network/index.js'

export class NetworkManager {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor ({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async connect (_entry) {
    await this.networkProvider.connect()
    return {}
  }

  async trust (entry) {
    await this.networkProvider.trust(entry.data)
    return {}
  }

  async distrust (_) {
    await this.networkProvider.distrust()
    return {}
  }

  async believe (_) {
    await this.networkProvider.believe()
    return {}
  }
}
