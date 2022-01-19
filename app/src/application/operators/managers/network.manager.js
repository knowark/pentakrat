import { NetworkProvider } from '../../general/network/index.js'

export class NetworkManager {
  /** @param {{ networkProvider: NetworkProvider }} */
  constructor({ networkProvider }) {
    this.networkProvider = networkProvider
  }

  async connect(_entry) {
    await this.networkProvider.connect()
  }
}
