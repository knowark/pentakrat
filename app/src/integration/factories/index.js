import { BaseFactory } from './base.factory.js'
import { CheckFactory } from './check.factory.js'
import { BlockchainFactory } from './blockchain.factory.js'

export const FACTORIES = {
  base: (config) => new BaseFactory(config),
  check: (config) => new CheckFactory(config),
  blockchain: (config) => new BlockchainFactory(config)
}
