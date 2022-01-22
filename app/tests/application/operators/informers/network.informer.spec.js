import { MemoryNetworkProvider } from 'application/general/network/index.js'
import { NetworkInformer } from 'application/operators/informers/index.js'

describe('NetworkInformer', function () {                      
  let informer = null                                       
  beforeEach(() => {                                         
    informer = new NetworkInformer({ 
      networkProvider: new MemoryNetworkProvider() 
    })
  })                                                         

  it('is defined', () => {
    expect(informer).toBeTruthy()
  })

  it('gets the support level of the trust held by the user', async () => {
    const result = await informer.getSupportLevel({})

    expect(result.data).toBe(1)
  })

  it('gets the number of Juras held by the user', async () => {
    const result = await informer.getJuras({})

    expect(result.data).toBe(1)
  })

  it('gets the address of the connected user', async () => {
    const result = await informer.getAddress({})

    expect(result.data.length).toBeTruthy()
  })
})
