import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../commons/services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginFormPresenter} from "./login-form.presenter";
import {Subscription} from "rxjs";
import {ScreenLoaderComponent} from "../../commons/components/screen-loader/screen-loader.component";
import {InputComponent} from 'src/app/commons/components/input/input.component';
import {Router} from "@angular/router";
import {GlobalRoutes} from "../../commons/constants/global-routes";

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
export class LoginComponent implements OnDestroy{
  private logingSubs$ = new Subscription();
  isActiveLoader = false;
  constructor(
    private readonly authService: AuthService,
    public readonly loginFormPresenter: LoginFormPresenter,
    private router: Router
  ) {}

  public login() {

    this.isActiveLoader = true;
    this.logingSubs$ = this.authService.login(
      this.loginFormPresenter.getForm.get('username')?.value,
      this.loginFormPresenter.getForm.get('password')?.value
    ).subscribe({
      next: (token) => {
        sessionStorage.setItem('authToken', JSON.stringify(token));
        this.isActiveLoader = false;
        this.router.navigate([GlobalRoutes.PAGE, GlobalRoutes.DASHBOARD]);
      },
      error: err => {
        const errorToken =  err.error;
        this.isActiveLoader = false;
        this.loginFormPresenter.getForm.get('username')?.setErrors({invalid_grant: true});
        this.loginFormPresenter.getForm.get('password')?.setErrors({invalid_grant: true});
      }
    })
  }

  ngOnDestroy(): void {
    this.logingSubs$.unsubscribe();
  }

}
