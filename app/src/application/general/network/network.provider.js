export class NetworkProvider {
  async connect() {
    throw new Error('Not implemented')
  }
}

export class MemoryNetworkProvider extends NetworkProvider {
  async connect() {
    this._connected = true
  }
}
