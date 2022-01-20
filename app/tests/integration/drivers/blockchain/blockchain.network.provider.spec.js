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
      ethereum: {'ethereum': 'library'}
    }
    const mockEthers = {
      providers: {
        Web3Provider: jest.fn().mockImplementation((_) => ({
          getBlockNumber: jest.fn().mockImplementation(() => 999)
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

    try {
      await provider.connect()
    } catch (error) {
      expect(error.message).toBe(
        'You need Metamask to connect to the blockchain.')
    }
  })
})
