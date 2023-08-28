export default {
    WalletFactoryContract: {
      ADDRESS: '0x8790831ed602B7aC899B134d7c0E2F0b862D1e4F',
      ABI: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "wallets",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
            }
          ],
          "name": "createTemporalWallet",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        }
      ]
    },
    TemporalWalletContract: {
        ADDRESS: '0x5e7F731AF520af57cAf817236f2175BDfc62186A',
        ABI: [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "stateMutability": "payable",
              "type": "constructor",
              "payable": true
            },
            {
              "inputs": [],
              "name": "active",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "beneficiary",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "transferToBeneficiary",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            }
          ]
    }
  };
  