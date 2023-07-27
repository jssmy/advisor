import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalRoutes} from "./commons/constants/global-routes";

const routes: Routes = [
  {
    path: GlobalRoutes.MAIN,
    pathMatch: 'full',
    redirectTo: GlobalRoutes.LOGIN
  },
  {
    path: GlobalRoutes.LOGIN,
    loadComponent: () => import('./pages/login/login.component').then(component => component.LoginComponent)
  },
  {
    path: GlobalRoutes.PAGE,
    loadComponent: () => import('./commons/components/layout/layout.component').then(component => component.LayoutComponent),
    children: [
      {
        path: GlobalRoutes.DASHBOARD,
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(component => component.DashboardComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
