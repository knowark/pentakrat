import { BaseFactory } from './base.factory.js'

export const FACTORIES = {
  base: (config) => new BaseFactory(config)
}

