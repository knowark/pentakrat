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

    expect(manager.networkProvider._connect).toBeTruthy()
  })

  it('establishes a new trust bond between', async () => {
    const entry = {
      data: {
        leader: 'LEADER_ADDRESS',
        proposal: 'PROPOSAL_URI'
      }
    }
    await manager.trust(entry)

    expect(manager.networkProvider._trust).toEqual(entry.data)
  })

  it('removes the trust bond on the leader', async () => {
    await manager.distrust({})

    expect(manager.networkProvider._distrust).toBe(true)
  })

  it('believes on the proposal of the leader', async () => {
    await manager.believe({})

    expect(manager.networkProvider._believe).toBe(true)
  })
})
