import {
  NetworkProvider, MemoryNetworkProvider 
} from 'application/general/network/index.js'

describe('NetworkProvider', function () {
  let provider = null
  beforeEach(() => {
    provider = new NetworkProvider({})
  })

  it('connect', async () => {
    try {
      await provider.connect()
    } catch (error) {
      expect(error.toString()).toEqual('Error: Not implemented')
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
})
