import {Injectable} from "@angular/core";
import {LoginComponent} from "./login.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegxExpressions} from "../../commons/constants/regx-expressions";
import {LoginFormError} from "../../commons/constants/errors/login-form.error";
type ErrorType = keyof typeof LoginFormError;
@Injectable({providedIn: 'root'})
export class LoginFormPresenter {
    private readonly form: FormGroup;
    private usernameControl: FormControl = new FormControl<string>('');
    private passwordControl: FormControl = new FormControl<string>('');
    constructor() {
      this.form = new FormGroup({
        username: this.usernameControl,
        password: this.passwordControl
      });
      this.usernameControl.setValidators([Validators.required, Validators.pattern(RegxExpressions.NATIONA_ID)]);
      this.passwordControl.setValidators([Validators.required]);
    }

    get getForm() {
      return this.form;
    }

    isValidForm(): boolean {
      return this.form.valid;
    }

    getControlError(controlName: string): string {
      if(this.form.get(controlName)?.touched) {
        const error: any = this.form.get(controlName)?.errors;
        const [ errorKey ] = Object.keys(error ?? {});

        return LoginFormError[errorKey as ErrorType] || '';
      }
      return  '';
    }
}
