import { Injectark } from '@knowark/injectarkjs'
import { Component } from 'base/component'
import { FACTORIES } from 'factories'
import 'screens/base/root.component.js'

describe('RootComponent', function () {                      
  let container = null                                       
  let component = null                                       
  beforeEach(() => {                                         
    const config = {}                                        
    const factory = FACTORIES.check(config)                  
    const injector = new Injectark({ factory })              
                                                             
    container = document.createElement('div')                
    component = /** @type {Component} */ (                   
      document.createElement('app-root'))                    
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
  })                                                         

  it('handles on connect events', async () => {
    const connectButton = component.select('[data-connect]')

    connectButton.click()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(component.networkManager.networkProvider)

  })

  it('handles on tab events', () => {
    const event = new CustomEvent(
      'tabs:selected', {detail: {data: {tab: 'lead'}}})
    const tabs = component.select('ark-tabs')

    tabs.dispatchEvent(event)

    const lead = component.select('lead-main')

    expect(lead).toBeTruthy()
  })

  it('catches and notifies error events', async () => {
    const errorEvent = new CustomEvent(
      'error', { detail: new Error('Something went wrong!') })
    
    component.dispatchEvent(new CustomEvent('error', errorEvent))

    const alert = component.select('ark-alert')
    expect(alert).toBeTruthy()
  })
                                                             
})
