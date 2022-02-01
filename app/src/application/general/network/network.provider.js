export class NetworkProvider {
  async connect () {
    throw new Error('Not implemented')
  }

  async address () {
    throw new Error('Not implemented')
  }

  /** @param {{ supporter: string, leader: string, proposal: string  }} */
  async trust (_trustEntry) {
    throw new Error('Not implemented')
  }

  async distrust () {
    throw new Error('Not implemented')
  }

  async believe () {
    throw new Error('Not implemented')
  }

  async chain () {
    throw new Error('Not implemented')
  }

  async level () {
    throw new Error('Not implemented')
  }

  async credo () {
    throw new Error('Not implemented')
  }

  async juras () {
    throw new Error('Not implemented')
  }

  async supply () {
    throw new Error('Not implemented')
  }
}

export class MemoryNetworkProvider extends NetworkProvider {
  constructor() {
    super()
    this._connect = false
    this._trust = null
    this._distrust = false
    this._believe = false
    this._address = ''
    this._level = 0
    this._credo = 0
    this._juras = 0
    this._supply = 0
    this._chain = [
      { level: 0, holder: '', proposal: '' }
    ]
  }

  async connect () {
    this._connect = true
  }

  async address () {
    return this._address
  }

  async trust (entry) {
    this._trust = entry
  }

  async distrust () {
    this._distrust = true
  }

  async believe () {
    this._believe = true
  }

  async chain () {
    return this._chain
  }

  async level () {
    return this._level
  }

  async credo () {
    return this._credo
  }

  async juras () {
    return this._juras
  }

  async supply () {
    return this._supply
  }
}
