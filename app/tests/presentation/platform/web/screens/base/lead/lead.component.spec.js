import 'screens/base/lead/index.js'
/** @typedef { import("base/component").Component } Component **/

describe('LeadComponent', function () {
  let container = null                                       
  let component = null                                       
  beforeEach(() => {                                         
    container = document.createElement('div')
    component = /** @type {Component} */ (
      document.createElement('lead-main'))

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
})
