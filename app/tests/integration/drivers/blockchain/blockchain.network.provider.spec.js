import { jest } from '@jest/globals'
import {
  NetworkProvider
} from 'application/general/network/index.js'
import {
  BlockchainNetworkProvider
} from 'integration/drivers/blockchain/index.js'

describe('BlockchainNetworkProvider', function () {
  let provider = null
  beforeEach(() => {
    const mockGlobal = {
      ethereum: { ethereum: 'library' }
    }
    const mockEthers = {
      providers: {
        Web3Provider: jest.fn().mockImplementation((_) => ({
          getBlockNumber: jest.fn().mockImplementation(() => 999),
          getSigner: () => ({
            getAddress: async () => 'CONNECTED_USER_ADDRESS'
          })
        }))
      }
    }
    provider = new BlockchainNetworkProvider({
      global: mockGlobal,
      _ethers: mockEthers
    })
  })

  it('is defined', () => {
    expect(provider).toBeTruthy()
    expect(provider instanceof NetworkProvider).toBeTruthy()
  })

  it('connects to the network', async () => {
    await provider.connect()

    expect(provider.ethers.providers.Web3Provider).toHaveBeenCalled()
  })

  it('raises an error if ethereum is not found', async () => {
    provider.global.ethereum = null
    let error = null

    try {
      await provider.connect()
    } catch (_error) {
      error = _error
    }

    expect(error.message).toBe(
      'You need Metamask to connect to the blockchain.')
  })

  it('raises an error if the provider has not been initialized', async () => {
    let error = null

    try {
      await provider.provider
    } catch (_error) {
      error = _error
    }

    expect(error.message).toBe(
      'Please connect to the blockchain first.')
  })

  it('retrieves the connected user address', async () => {
    await provider.connect()

    const address = await provider.address()

    expect(address).toBe('CONNECTED_USER_ADDRESS')
  })
})
