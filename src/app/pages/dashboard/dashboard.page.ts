import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public appPages = [
    { title: 'Home', url: 'home', icon: 'mail' },
    { title: 'Tasks', url: 'tasks', icon: 'paper-plane' },
    { title: 'Profile', url: 'profile', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public configOpts = [
    { title: 'Settings', url: 'settings', icon: 'mail' },
    { title: 'Log out', url: 'logout', icon: 'mail' }
  ];

  constructor() {}
  
  ngOnInit(): void {
  }

}
