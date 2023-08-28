import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {

  constructor(private storage: Storage) {
    this.storage.create();
  }

  setConnectedAddress(address: string | null) {
    this.storage.set('wallet', address);
  }

  getConnectedAddress(): Promise<string> {
    return this.storage.get('wallet');
  }

  setConnectedBalance(balance: string | null) {
    this.storage.set('balance', balance);
  }

  getConnectedBalance(): Promise<string> {
    return this.storage.get('balance');
  }

  setChainId(chainId: string | null) {
    this.storage.set('chainId', chainId);
  }

  getChainId(): Promise<string> {
    return this.storage.get('chainId');
  }
}
