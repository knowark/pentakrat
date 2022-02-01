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
        trust: jest.fn().mockImplementation((address, proposal) => {}),
        distrust: jest.fn().mockImplementation(() => {}),
        believe: jest.fn().mockImplementation(() => {}),
        getLevel: jest.fn().mockImplementation(() => ({
          toNumber: () => 3
        })),
        getJuras: jest.fn().mockImplementation(() => ({
          toNumber: () => 1000
        })),
        getCredo: jest.fn().mockImplementation(() => ({
          toNumber: () => 5
        })),
        getChain: jest.fn().mockImplementation(() => ({
          toNumber: () => []
        })),
        jurasTotalSupply: jest.fn().mockImplementation(() => ({
          toNumber: () => 7000
        })),
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
    const trust = (
      provider.ethers.Contract.mock.results[0].value.trust)
    expect(trust.mock.calls[0]).toEqual(
      [entry.address, entry.proposal])
  })

  it('removes the trust put on a leader', async () => {
    await provider.connect()

    await provider.distrust()

    const distrust = (
      provider.ethers.Contract.mock.results[0].value.distrust)
    expect(distrust.mock.calls[0]).toEqual([])
  })

  it('believes in the trusted leader propsal', async () => {
    await provider.connect()

    await provider.believe()

    const believe = (
      provider.ethers.Contract.mock.results[0].value.believe)
    expect(believe.mock.calls[0]).toEqual([])
  })


  it('gets the trust level of a leader', async () => {
    await provider.connect()

    const level = await provider.level()

    expect(level).toEqual(3)
  })

  it('gets the juras of a leader', async () => {
    await provider.connect()

    const juras = await provider.juras()

    expect(juras).toEqual(1000)
  })

  it('gets the credo of a leader', async () => {
    await provider.connect()

    const juras = await provider.credo()

    expect(juras).toEqual(5)
  })

  it("gets the mission's juras total supply", async () => {
    await provider.connect()

    const juras = await provider.supply()

    expect(juras).toEqual(7000)
  })

  it('gets the supporter trust chain', async () => {
    await provider.connect()

    const chain = await provider.chain()

    expect(Array.isArray(chain)).toBeTruthy()
  })
})
