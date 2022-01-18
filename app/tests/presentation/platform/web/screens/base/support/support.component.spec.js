import 'screens/base/support/index.js'
/** @typedef { import("base/component").Component } Component **/

describe('SupportComponent', function () {
  let container = null                                       
  let component = null                                       
  beforeEach(() => {                                         
    container = document.createElement('div')
    component = /** @type {Component} */ (
      document.createElement('support-main'))

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

  it('opens up a scan modal on trust clicked', () => {
    const button = component.select('ark-card ark-button')
    const originalSelect = component.select.bind(component)
    // Mock camera component
    component.select = (selector) => {
      if (selector === 'ark-camera') return { start: () => {} }
      return originalSelect(selector)
    }

    button.click()

    const modal = component.select('ark-modal')
    expect(modal.hasAttribute('show')).toBeTruthy()
  })
})
