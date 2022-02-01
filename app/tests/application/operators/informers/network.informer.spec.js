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

  it('gets the address of the connected user', async () => {
    const result = await informer.getAddress({})

    expect(result.data).toEqual('')
  })

  it('gets the support level of the trust held by the user', async () => {
    const result = await informer.getLevel({})

    expect(result.data).toBe(0)
  })

  it('gets the number of Juras held by the user', async () => {
    const result = await informer.getJuras({})

    expect(result.data).toBe(0)
  })

  it('gets the credo of the user', async () => {
    const result = await informer.getCredo({})

    expect(result.data).toBe(0)
  })

  it('gets the juras total supply', async () => {
    const result = await informer.getSupply({})

    expect(result.data).toBe(0)
  })

  it('gets the chain of trust of the user', async () => {
    const result = await informer.getChain({})

    expect(result.data).toEqual([
      { level: 0, holder: '', proposal: '' }
    ])
  })
})
