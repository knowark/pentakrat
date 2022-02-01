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
      { name: 'address', arguments: {} },
      { name: 'trust', arguments: {} },
      { name: 'distrust', arguments: {} },
      { name: 'believe', arguments: {} },
      { name: 'chain', arguments: {} },
      { name: 'level', arguments: {} },
      { name: 'credo', arguments: {} },
      { name: 'juras', arguments: {} },
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

    expect(provider._connect).toBeTruthy()
  })

  it('establishes trust between supporters and leaders', async () => {
    const trust = {
      leader: 'LEADER_ADDRESS',
      proposal: 'PROPOSAL_URI'
    }
    await provider.trust(trust)

    expect(provider._trust).toEqual(trust)
  })

  it('removes the trust put on a leader', async () => {
    await provider.distrust()

    expect(provider._distrust).toEqual(true)
  })

  it('belives in the proposal of the leader', async () => {
    await provider.believe()

    expect(provider._believe).toEqual(true)
  })

  it('gets the address of the connected user', async () => {
    const address = await provider.address()

    expect(address).toEqual('')
  })

  it('gets the trust level of the connected user', async () => {
    const trustLevel = await provider.level()

    expect(trustLevel).toBe(0)
  })

  it('gets the credo of the connected user', async () => {
    const credo = await provider.credo()

    expect(credo).toBe(0)
  })

  it('gets the juras of the connected user', async () => {
    const juras = await provider.juras()

    expect(juras).toBe(0)
  })

  it('gets the chain of trust of the connected user', async () => {
    const chain = await provider.chain()

    expect(chain).toEqual([
      { level: 0, holder: '', proposal: '' }
    ])
  })
})
