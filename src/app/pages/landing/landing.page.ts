import { Component, OnInit } from '@angular/core';
import { MetaMaskService } from '../../services/meta-mask.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/web-services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  connectedAddress: string = '';
  connectedChainId: string = '';
  balance: string = '';
  errorMessage: string = '';

  constructor(
    private metaMaskService: MetaMaskService,
    private globalDataService: GlobalDataService,
    private alertController: AlertController,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // If already connected, redirect to dashboard
    this.isConnected().then((connected) => {
      if(connected) this.router.navigate(['/dashboard/home']);
    });
  }

  async isConnected(): Promise<boolean> {
    const address = await this.globalDataService.getConnectedAddress();
    if(address == null) {
      return false;
    }

    return true;
  }

  async handleRedirection(address: string) {
    this.userService.getUserByWallet(address).subscribe((data: any) => {
      var redirect;
      if(data.length == 0) {
        this.router.navigate(['/landing/register']);
        redirect = 'register';
      } else {
        //User already exists
        this.router.navigate(['/dashboard/home'], { state: { user: data[0] }});
        redirect = 'dashboard';
      }
      console.log(data.length + 'users found for the wallet address. Redirecting to '+redirect);
    });
  }

  async connectMetaMask() {
    try {
      await this.metaMaskService.connectMetaMask();

      const address = await this.globalDataService.getConnectedAddress();
      const balance = await this.globalDataService.getConnectedBalance();
      const chainId = await this.globalDataService.getChainId();
      
      this.presentAlert('CONNECTED!', 'Address:'+address+', ChainId: '+chainId+', Balance: '+balance);
      
      // Redirect to dashboard
      this.handleRedirection(address);
    } catch (error) {
      this.errorMessage = 'Error connecting to MetaMask';
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

