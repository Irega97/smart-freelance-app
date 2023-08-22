import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {

  connectedAddress$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  get connectedAddress(): string | null {
    return this.connectedAddress$.getValue();
  }

  connectedBalance$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  get connectedBalance(): string | null {
    return this.connectedBalance$.getValue();
  }

  connectedChainId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  get connectedChainId(): string | null {
    return this.connectedChainId$.getValue();
  }
}
