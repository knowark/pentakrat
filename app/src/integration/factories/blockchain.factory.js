import { NetworkManager } from 'application/operators/managers/index.js'
import {
  BlockchainNetworkProvider
} from 'integration/drivers/blockchain/index.js'
import { BaseFactory } from './base.factory.js'

export class BlockchainFactory extends BaseFactory {
  /** @return {NetworkManager} */
  networkProvider () {
    return new BlockchainNetworkProvider()
  }
}
