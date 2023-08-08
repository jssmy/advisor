import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalRoutes} from "./commons/constants/global-routes";
import {AuthGuard} from "./commons/guards/auth.guard";
import {LoginGuard} from "./commons/guards/login.guard";

const routes: Routes = [
  {
    path: GlobalRoutes.MAIN,
    pathMatch: 'full',
    redirectTo: GlobalRoutes.LOGIN
  },
  {
    path: GlobalRoutes.LOGIN,
    loadComponent: () => import('./pages/login/login.component').then(component => component.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: GlobalRoutes.PAGE,
    loadComponent: () => import('./commons/components/layout/layout.component').then(component => component.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: GlobalRoutes.DASHBOARD,
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(component => component.DashboardComponent)
      },
      {
        path: `${GlobalRoutes.SELLER_SERVICES}`,
        loadComponent: () => import('./pages/seller-services/seller-services.component').then(component => component.SellerServicesComponent)
      },
      {
        path: `${GlobalRoutes.STATIONS}`,
        loadChildren: () => import('./pages/stations/stations.module').then(module => module.StationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
