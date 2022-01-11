import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from './integration/factories'
import {
  setMainRoutes
} from './presentation/platform/web/screens'

/* istanbul ignore next */
export async function main (config) {
  const factory = FACTORIES[config.factory](config)
  console.log('factory>>>', factory)
  const injector = new Injectark({ factory })

  const mainComponent = document.querySelector('main')
  //mainComponent.addEventListener('resolve', (event) => {
    //const resource = event.detail.resource
    //event.detail[resource] = injector.resolve(resource)
  //})

  setMainRoutes(mainComponent, injector)
}

/* istanbul ignore next */
if (typeof process !== 'object') {
  main(window.config)
}

