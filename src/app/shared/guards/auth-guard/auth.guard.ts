import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MetaMaskService } from 'src/app/services/meta-mask.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate/* , CanActivateChild */ {

  constructor(private router: Router, private metamaskService: MetaMaskService) {}

  canActivate(): boolean {
    const isConnected = this.metamaskService.isConnected();
    if (isConnected) {
      // User is connected, allow access to 'dashboard'
      return true;
    } else {
      // User is not connected, redirect to 'landing'
      this.router.navigate(['/landing']);
      return false;
    }
  }

  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
