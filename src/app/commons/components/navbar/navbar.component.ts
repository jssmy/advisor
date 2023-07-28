import {Component, OnDestroy} from '@angular/core';
import {AppConfig} from "../../helpers/app-config";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";
import {AppState} from "../../../store/interfaces/app-state";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {GlobalRoutes} from "../../constants/global-routes";
import {ScreenLoaderComponent} from "../screen-loader/screen-loader.component";
import {cleanAccessTokenStore} from "../../../store/access-token/actions/access-token.actions";
import {cleanAuthUserConfigStorage} from "../../../store/user/action/auth-user.action";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ScreenLoaderComponent
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
      next: () => {
        sessionStorage.clear();
        this.store.dispatch(cleanAccessTokenStore());
        this.store.dispatch(cleanAuthUserConfigStorage());
        this.router.navigate([GlobalRoutes.LOGIN]).finally();
      },
      error: () => this.isLoadingRevoke = false
    });
  }

  ngOnDestroy() {
  }
}
