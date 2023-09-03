import {Component, OnDestroy } from '@angular/core';
import {AuthService} from "../../commons/services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginFormPresenter} from "./login-form.presenter";
import {filter, Subscription} from "rxjs";
import {ScreenLoaderComponent} from "../../commons/components/screen-loader/screen-loader.component";
import {InputComponent} from 'src/app/commons/components/input/input.component';
import {Router} from "@angular/router";
import {GlobalRoutes} from "../../commons/constants/global-routes";
import {Store} from "@ngrx/store";
import {loadAccessToken} from "../../store/access-token/actions/access-token.actions";
import {AppState} from "../../store/interfaces/app-state";
import {
  selectAccessToken,
  selectAccessTokenError,
  selectAccessTokenLoading
} from "../../store/access-token/selectors/access-token.selectors";
import {AuthToken} from "../../store/access-token/models/auth-token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScreenLoaderComponent,
    InputComponent
  ],
  providers: [

  ]
})
export class LoginComponent implements OnDestroy {
  private logingSubs$ = new Subscription();
  isActiveLoader$ = this.store.select(selectAccessTokenLoading);
  accessTokenError$ = this.store.select(selectAccessTokenError);
  accessToken$ = this.store.select(selectAccessToken);

  constructor(
    private readonly authService: AuthService,
    public readonly loginFormPresenter: LoginFormPresenter,
    private router: Router,
    private readonly store: Store<AppState>
  ) {}

  public login() {
    this.accessToken$
      .pipe(
        filter((authToken) => !!authToken)
      )
      .subscribe(() => this.router.navigate([GlobalRoutes.PAGE, GlobalRoutes.DASHBOARD]).finally());

    this.accessTokenError$
      .pipe(
        filter(errorHttp => !!errorHttp)
      )
      .subscribe(() => {
        this.loginFormPresenter.getForm.get('username')?.setErrors({invalid_grant: true});
        this.loginFormPresenter.getForm.get('password')?.setErrors({invalid_grant: true});
      })

    this.store.dispatch(loadAccessToken(
      {
        password: this.loginFormPresenter.getForm.get('password')?.value,
        username: this.loginFormPresenter.getForm.get('username')?.value
      }
    ));

  }

  ngOnDestroy(): void {
    this.logingSubs$.unsubscribe();
  }

}
