export class NetworkProvider {
  async connect () {
    throw new Error('Not implemented')
  }

  /** @param {{ supporter: string, leader: string, proposal: string  }} */
  async trust (_trustEntry) {
    throw new Error('Not implemented')
  }

  async distrust () {
    throw new Error('Not implemented')
  }

  async address () {
    throw new Error('Not implemented')
  }

  async trustLevel () {
    throw new Error('Not implemented')
  }
}

export class MemoryNetworkProvider extends NetworkProvider {
  async connect () {
    this._connected = true
  }

  /** @param {{ supporter: string, leader: string, proposal: string  }} */
  async trust (trustEntry) {
    this._trust = trustEntry
  }

  /** @return string */
  async address () {
    return 'PUBLIC_ADDRESS'
  }

  async trustLevel () {
    return 1
  }
}
