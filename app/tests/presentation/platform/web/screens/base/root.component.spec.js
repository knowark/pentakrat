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
                                                             
})
