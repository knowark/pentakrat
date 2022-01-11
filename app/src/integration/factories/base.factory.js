import { Factory } from '@knowark/injectarkjs'
import { Routark } from '@knowark/routarkjs'

export class BaseFactory extends Factory {
  router () {
    return new Routark(window)
  }
}

