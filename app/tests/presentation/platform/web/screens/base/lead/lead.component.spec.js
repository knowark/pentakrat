import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from 'factories'
import 'screens/base/lead/index.js'
/** @typedef { import("base/component").Component } Component **/

describe('LeadComponent', function () {
  let container = null
  let component = null
  beforeEach(() => {
    container = document.createElement('div')
    component = /** @type {Component} */ (
      document.createElement('lead-main'))
    const injector = new Injectark({ factory: FACTORIES.check({}) })
    component.resolve = (resource) => {
      return injector.resolve(resource)
    }

    document.body.append(container)
    container.append(component)
  })

  afterEach(() => {
    container.remove()
    container = null
    component = null
  })

  it('can be instantiated', () => {
    expect(component).toBeTruthy()

    expect(component).toBe(component.init())
    expect(component.tagName).toEqual('LEAD-MAIN')
  })

  it('generates the trust code of the leader', () => {
    const button = component.select('[data-generate]')

    button.click()

    const textarea = component.select('[data-code]')
    expect(textarea.textContent).toEqual(
      'eyJhZGRyZXNzIjoiUFVCTElDX0FERFJFU1MiLCJwcm9wb3NhbCI6IiJ9'
    )
  })
})
