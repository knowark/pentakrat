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
      ethereum: { ethereum: 'library' },
      config: {
        missionAddress: 'MISSION_ADDRESS'
      }
    }
    const mockEthers = {
      providers: {
        Web3Provider: jest.fn().mockImplementation((_) => ({
          getBlockNumber: jest.fn().mockImplementation(() => 999),
          getSigner: () => ({
            getAddress: async () => 'CONNECTED_USER_ADDRESS'
          })
        }))
      },
      Contract: jest.fn().mockImplementation((address, abi, signer) => ({
        establishTrust: jest.fn().mockImplementation((address, proposal) => {
        }),
        getTrustLevel: jest.fn().mockImplementation(() => 99)
      }))

      
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

  it('raises an error if the signer has not been connected', async () => {
    let error = null

    try {
      await provider.signer
    } catch (_error) {
      error = _error
    }

    expect(error.message).toBe(
      'Please ensure your account is connected.')
  })

  it('retrieves the connected user address', async () => {
    await provider.connect()

    const address = await provider.address()

    expect(address).toBe('CONNECTED_USER_ADDRESS')
  })

  it('establishes trust between a supporter and a leader', async () => {
    await provider.connect()
    const entry = { address: "LEADER_ADDRESS", proposal: "THE_PROPOSAL" }

    await provider.trust(entry)

    expect(provider.ethers.Contract.mock.calls[0][0]).toBe("MISSION_ADDRESS")
    const establishTrust = (
      provider.ethers.Contract.mock.results[0].value.establishTrust)
    expect(establishTrust.mock.calls[0]).toEqual(
      [entry.address, entry.proposal])
  })

  it('gets the trust level of a leader', async () => {
    await provider.connect()

    const trustLevel = await provider.trustLevel()

    expect(trustLevel).toEqual(99)
  })
})
