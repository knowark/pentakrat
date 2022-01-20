import { Factory } from '@knowark/injectarkjs'
import { Routark } from '@knowark/routarkjs'
import {
  NetworkProvider, MemoryNetworkProvider
} from 'application/general/index.js'
import { NetworkManager } from 'application/operators/managers/index.js'

export class BaseFactory extends Factory {
  constructor() {
    super()
    this.networkManager.dependencies = ['NetworkProvider']
  }

  /** @return {NetworkProvider} */
  networkProvider() {
    return new MemoryNetworkProvider()
  }

  /** @param {NetworkProvider} networkProvider */
  networkManager(networkProvider) {
    return new NetworkManager({ networkProvider })
  }

  router () {
    return new Routark()
  }
}
