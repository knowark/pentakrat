import { MemoryNetworkProvider } from 'application/general/network/index.js'
import { NetworkManager } from 'application/operators/managers/index.js'

describe('NetworkManager', function () {                      
  let manager = null                                       
  beforeEach(() => {                                         
    manager = new NetworkManager({ 
      networkProvider: new MemoryNetworkProvider() 
    })
  })                                                         

  it('is defined', () => {
    expect(manager).toBeTruthy()
  })

  it('connects to the network through a provider', async () => {
    await manager.connect({})

    expect(manager.networkProvider._connected).toBeTruthy()
  })

  it('establishes a new trust bond between', async () => {
    const entry = {
      data: {
        supporter: "SUPPORTER_ADDRESS",
        leader: "LEADER_ADDRESS",
        proposal: "PROPOSAL_URI"
      }
    }
    await manager.trust(entry)

    expect(manager.networkProvider._trust).toEqual(entry.data)
  })
})
