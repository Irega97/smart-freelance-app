import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthGuard } from 'src/app/shared/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./sections/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./sections/tasks/tasks.module').then( m => m.TasksPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./sections/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./sections/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./sections/home/home.module').then(m => m.HomePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
