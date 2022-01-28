export const abi = `
[
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "founders",
        "type": "address[]"
      },
      {
        "internalType": "string",
        "name": "statement",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "breakTrust",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "proposal",
        "type": "string"
      }
    ],
    "name": "establishTrust",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getJurasForAddresss",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "supporter",
        "type": "address"
      }
    ],
    "name": "getTrustChain",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "supporter",
        "type": "address"
      }
    ],
    "name": "getTrustLevel",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "root",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "holder",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "proposal",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "terminate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "transferToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
`
