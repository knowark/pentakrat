import {
  NetworkProvider, MemoryNetworkProvider
} from 'application/general/network/index.js'

describe('NetworkProvider', function () {
  let provider = null
  beforeEach(() => {
    provider = new NetworkProvider({})
  })

  it('defines a general interface', async () => {
    const methods = [
      { name: 'connect', arguments: {} },
      { name: 'trust', arguments: {} },
      { name: 'distrust', arguments: {} },
      { name: 'address', arguments: {} },
      { name: 'trustLevel', arguments: {} }
    ]

    for (const method of methods) {
      try {
        await provider[method.name](method.arguments)
      } catch (error) {
        expect(error.toString()).toEqual('Error: Not implemented')
      }
    }
  })
})

describe('MemoryNetworkProvider', function () {
  let provider = null
  beforeEach(() => {
    provider = new MemoryNetworkProvider({})
  })

  it('is defined', () => {
    expect(provider).toBeTruthy()
    expect(provider instanceof NetworkProvider).toBeTruthy()
  })

  it('connects to the network', async () => {
    await provider.connect()

    expect(provider._connected).toBeTruthy()
  })

  it('establishes trust between supporters and leaders', async () => {
    const trust = {
      leader: 'LEADER_ADDRESS',
      proposal: 'PROPOSAL_URI'
    }
    await provider.trust(trust)

    expect(provider._trust).toEqual(trust)
  })

  it('gets the address of the connected user', async () => {
    const address = await provider.address()

    expect(address.length).toBeTruthy()
  })

  it('gets the trust level of the connected user', async () => {
    const trustLevel = await provider.trustLevel()

    expect(trustLevel).toBe(1)
  })
})
