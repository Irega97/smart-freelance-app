import { Injectable } from '@angular/core';

//Web3 Library
import Web3 from 'web3';

// This function detects most providers injected at window.ethereum.
import detectEthereumProvider from '@metamask/detect-provider';

//Custom data service to store global variables (account, balance, chain..)
import { GlobalDataService } from './global-data.service';

@Injectable({
  providedIn: 'root',
})

/* Service class that handles metamask connection */
/* Doc reference: https://docs.metamask.io/wallet/how-to/connect/ */

export class MetaMaskService {
  private web3: Web3 | undefined;

  //Service constructor
  constructor(private globalDataService: GlobalDataService) {
    this.initializeWeb3(); // Initialize the web3 instance
    this.setupMetamaskListeners(); // Set up a listener for changes in connection status
  }

  //Initialization method called in constructor
  private initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    }
  }

  // Connect metamask wallet
  async connectMetaMask(): Promise<void> {
    if (!this.web3 || !this.checkMetamaskProvider()) {
      throw new Error('MetaMask not available');
    }
    
    try {
      // Request access to MetaMask
      await window.ethereum.enable();

      const address = await this.getSelectedAddress();
      
      // Set global variables
      this.globalDataService.connectedAddress$.next(address);
      this.globalDataService.connectedBalance$.next(await this.getBalance(address));
      this.globalDataService.connectedChainId$.next(await this.getChainId());

    } catch (error) {
      throw new Error('Error connecting to MetaMask');
    }
  }

  isConnected(): Boolean {
    if(this.web3 !== undefined && this.globalDataService.connectedAddress != null) {
      return true;
    } else {
      return false;
    }
  }

  // Setup listeners for account or network change
  private setupMetamaskListeners() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0) {
          // Handle disconnected account
          this.globalDataService.connectedAddress$.next(null);
          this.globalDataService.connectedBalance$.next(null);
        } else {
          // Handle account change
          const newAddress = accounts[0];
          this.globalDataService.connectedAddress$.next(newAddress);

          // Fetch and set the balance for the new address
          const balance = await this.getBalance(newAddress);
          this.globalDataService.connectedBalance$.next(balance);
        }
      });
  
      window.ethereum.on('chainChanged', (chainId: string) => {
        // Handle network change
        this.globalDataService.connectedBalance$.next(chainId);
      });
    }
  }

  //Check Metamask provider in device
  private async checkMetamaskProvider() {
    // This returns the provider, or null if it wasn't detected.
    const provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true: provider === window.ethereum
      // If the provider returned by detectEthereumProvider isn't the same as
      // window.ethereum, something is overwriting it – perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }

      return true;
    } else {
      console.log('Please install MetaMask!');
      return false;
    }
  }

  // Get connected wallet address
  private async getSelectedAddress(): Promise<string> {
    if (!this.web3) {
      throw new Error('MetaMask not available');
    }

    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }

  // Get connected wallet balance
  private async getBalance(address: string): Promise<string> {
    if (!this.web3) {
      throw new Error('MetaMask not available');
    }

    const balanceWei = await this.web3.eth.getBalance(address);
    const balanceEth = this.web3.utils.fromWei(balanceWei, 'ether');
    return balanceEth;
  }

  // User's network chain ID that will be used in all RPC requests because 
  // they are submitted to the currently connected network.
  // Possible types: (Hex	- Decimal	- Network)
  // 0x1 - 1 -	Ethereum main network (Mainnet)
  // 0x5 - 5 -	Goerli test network
  // 0xaa36a7 -	11155111 -	Sepolia test network
  // 0xe704 -	59140 -	Linea Goerli test network
  // 0x539 -	1337 -	Localhost test networks (including Ganache)
  private async getChainId(): Promise<string> {
    if (!this.web3) {
      throw new Error('MetaMask not available');
    }

    const chainId = await this.web3.eth.getChainId();
    return chainId.toString();
  }
}
