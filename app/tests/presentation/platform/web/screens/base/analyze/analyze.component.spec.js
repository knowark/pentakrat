import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from 'factories'
import 'screens/base/analyze/index.js'
/** @typedef { import("base/component").Component } Component **/

describe('AnalyzeComponent', function () {
  let container = null
  let component = null
  beforeEach(() => {
    container = document.createElement('div')
    component = /** @type {Component} */ (
      document.createElement('analyze-main'))
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
    expect(component.tagName).toEqual('ANALYZE-MAIN')
  })

  it('shows the level of support and juras', () => {
    component.state.level = 3
    component.state.juras = 1000
    component.state.supply = 9000
    component.render()
    expect(component.select('[data-level]').textContent).toEqual('3')
    expect(component.select(
      '[data-juras]').textContent).toContain('1000 / 9000')
  })

  it('shows a default message when no trust has been established', () => {
    const message = component.select('[data-notrust]').textContent
    expect(message).toEqual(
      'No trust bonds have been established yet.'
    )
  })
})
