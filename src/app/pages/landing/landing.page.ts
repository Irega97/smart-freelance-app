import { Component, OnInit } from '@angular/core';
import { MetaMaskService } from '../../services/meta-mask.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


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
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already connected, redirect to dashboard
    if (this.isConnected()) {
      this.redirectToDashboard();
    }
  }

  isConnected(): boolean {
    return !!this.connectedAddress;
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard/home']);
  }

  async connectMetaMask() {
    try {
      await this.metaMaskService.connectMetaMask();
      
      this.presentAlert('CONNECTED!', 'Address:'+this.connectedAddress+', ChainId: '+this.connectedChainId+', Balance: '+this.balance);
      
      // Redirect to dashboard
      this.redirectToDashboard();
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

