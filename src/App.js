import React, {Component} from 'react'
import Web3 from 'web3'
import blocknativeSDK from 'bnc-sdk';
import './App.css';
import Onboard from '@web3-onboard/core'
import Notify from "bnc-notify"
import injectedModule from '@web3-onboard/injected-wallets'


const DAPP_ID = "024ab8ee-67f6-4993-9217-861500169ac3"
const NETWORK_ID = 4
const blocknative = new blocknativeSDK({
  dappId: DAPP_ID,
  networkId: NETWORK_ID
})

var notify = Notify({
  dappId: DAPP_ID,
  networkId: NETWORK_ID
});

const {clientIndex} = blocknative

const provider = window.ethereum
console.log(provider)
const web3 = new Web3(provider)


const INFURA_ID = "eb347fc6f4b84938bf8b111cc08a4814"
async function send() {
  const accounts = await web3.eth.getAccounts()
  console.log(await web3.eth.accounts)
  const address = accounts[0]
  const receiverAddress = '0x79B4455b07B63D7Fd2AEc15bDd0ded8d1679AD7D'
  
  const txOptions ={
    from: address,
    to: receiverAddress,
    value: '100000000'
  }

  web3.eth.sendTransaction(txOptions).on('transactionHash', hash => {
    const { emitter } =notify.hash(hash)

    notify.on(hash())

    emitter.on('all', transaction => {
      console.log(`Transaction event: ${transaction.eventCode}`)
    })
    console.log(emitter)
    emitter.on('txPool', transaction => {
      console.log(`Sending ${transaction.value} wei to ${transaction.to}`)
    })

    emitter.on('txConfirmed', transaction => {
      console.log(transaction)
      console.log("transaction has been confirmed")
    })
  })
}

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule()


const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',  // chain ID must be in hexadecimel
      token: 'ETH',  // main chain token
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`  // rpcURL required for wallet balances
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom Mainnet',
      rpcUrl: 'https://rpc.ftm.tools/'
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    logo: '<SVG_LOGO_STRING>',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [ 
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

async function connectWallet() {
  const wallets = await onboard.connectWallet()

  console.log(wallets)
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Connect Wallet</button>
        <button onClick={send}>Send transaction</button>
      </header>
    </div>
  );
}

export default App;
