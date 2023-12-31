import {Component, OnDestroy} from '@angular/core';
import {AppConfig} from "../../helpers/app-config";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";
import {AppState} from "../../../store/interfaces/app-state";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {GlobalRoutes} from "../../constants/global-routes";
import {ScreenLoaderComponent} from "../screen-loader/screen-loader.component";
import {cleanAccessTokenStore} from "../../../store/access-token/actions/access-token.actions";
import {cleanAuthUserConfigStorage} from "../../../store/user/action/auth-user.action";
import {Permissions} from "../../../store/user/models/auth-user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ScreenLoaderComponent,
    RouterLink
  ]
})
export class NavbarComponent implements OnDestroy {
  appConfig = AppConfig;
  isEnabledUserSettings = false;
  authUserConfig$ = this.store.select(selectAuthUserConfig);

  isLoadingRevoke = false;
  constructor(
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }
  onUserSettingClick() {
    this.isEnabledUserSettings = !this.isEnabledUserSettings;
  }

  onNavbarBackground() {
    this.isEnabledUserSettings = false;
  }

  onCloseSession() {
    this.isLoadingRevoke = true;
    this.authService.logout().subscribe({
      next: () => this.cleanSession(),
      error: (error) => {
        this.isLoadingRevoke = false;
        if (error.status === 401) {
            this.cleanSession();
        }

      }
    });
  }

  cleanSession() {
    this.authService.deleteSession();
    this.router.navigate([GlobalRoutes.LOGIN]).finally();
  }

  getRouteLink(route: string) {
    return [
      ...route.split('/')
    ];
  }

  getMenuPermissions(permissions: Permissions[]) {

    return permissions.filter(prms => prms.type === 'menu');
  }

  ngOnDestroy() {
  }
}
