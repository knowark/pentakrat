import { NetworkManager } from 'application/operators/managers/index.js'

describe('NetworkManager', function () {                      
  let manager = null                                       
  beforeEach(() => {                                         
    manager = new NetworkManager({})
  })                                                         

  it('is defined', () => {
    expect(manager).toBeTruthy()
  })

  xit('connects to the blockchain through a provider', async () => {
    await manager.connect({})

    expect(manager.provider._connected).toBeTruthy()
  })
})
