import { setTimeout } from 'timers/promises'
import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from 'factories'
import 'screens/base/support/index.js'
/** @typedef { import("base/component").Component } Component **/

describe('SupportComponent', function () {
  let container = null                                       
  let component = null                                       
  beforeEach(() => {                                         
    container = document.createElement('div')
    component = /** @type {Component} */ (
      document.createElement('support-main'))
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
    expect(component.tagName).toEqual('SUPPORT-MAIN')
  })                                                         

  it('opens up a trust modal on trust clicked', () => {
    const button = component.select('[data-trust]')
    button.click()

    const modal = component.select('ark-modal')
    expect(modal.hasAttribute('show')).toBeTruthy()
  })

  it('creates a trust bond from given code', async () => {
    let givenEntry = null
    component.networkManager = {
      trust: (entry) => { givenEntry = entry }
    }

    component.state.code = btoa(JSON.stringify({ 
      address: 'LEADER123',
      proposal: 'https://proposal.example.com'
    }))

    const modal = component.select('ark-modal')
    modal.open()
    const button = modal.select('[data-accept]')

    button.click()
    await setTimeout(0)

    expect(givenEntry).toEqual({
      data: {
        address: 'LEADER123',
        proposal: 'https://proposal.example.com'
      }
    })
  })
})
