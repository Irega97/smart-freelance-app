import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppPage } from 'src/app/models/app-page.model';
import { User } from 'src/app/models/user';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { UserService } from 'src/app/services/web-services/user.service';
import { EthereumAddress } from 'src/app/shared/domains';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public appPages: AppPage[] = [
    { title: 'Home', url: 'home', icon: 'mail' },
    { title: 'Tasks', url: 'tasks', icon: 'paper-plane' },
    { title: 'Profile', url: 'profile', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public configOpts: AppPage[] = [
    { title: 'Settings', url: 'settings', icon: 'mail' },
    { title: 'Log out', url: 'logout', icon: 'mail' }
  ];

  connectedAddress: any;
  
  constructor(private globalDataService: GlobalDataService, private router: Router, private userService: UserService) {}
  
  ngOnInit(): void {
    if(this.router.getCurrentNavigation()?.extras.state != null){
      const user: User = this.router.getCurrentNavigation()!.extras.state!['user'];
      console.log('Navigation extra info available. User: ', user);
      this.connectedAddress = user.walletAddress;
      this.getUserInfo(user.walletAddress);
    } else {
      this.globalDataService.getConnectedAddress().then(data => {
        console.log('Connected address from global data service: '+data);
        this.connectedAddress = data;
        this.getUserInfo(this.connectedAddress);
      });
    }  
  }

  getUserInfo(address: EthereumAddress): void {
    this.userService.getUserByWallet(address).subscribe(data => {
      if(data.length != 0) {
        console.log('USER FROM DB: '+JSON.stringify(data[0]));
      }
    });
  }

}
