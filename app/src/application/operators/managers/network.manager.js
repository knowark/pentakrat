import { NetworkProvider } from '../../general/network/index.js'

export class NetworkManager {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor ({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async connect (_entry) {
    await this.networkProvider.connect()
  }

  async trust (entry) {
    await this.networkProvider.trust(entry.data)
  }
}
