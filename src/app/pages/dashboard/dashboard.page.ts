import { Component, OnInit } from '@angular/core';
import { AppPage } from 'src/app/models/app-page.model';
import { GlobalDataService } from 'src/app/services/global-data.service';

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
  
  constructor(private globalDataService: GlobalDataService) {}
  
  ngOnInit(): void {
    this.globalDataService.getConnectedAddress().then(data => {
      this.connectedAddress = data;
    });
  }

}
