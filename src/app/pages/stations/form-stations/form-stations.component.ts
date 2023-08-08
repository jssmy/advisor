import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/interfaces/app-state";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";

@Component({
  selector: 'app-form-stations',
  templateUrl: './form-stations.component.html',
  styleUrls: ['./form-stations.component.scss']
})
export class FormStationsComponent {

  userConfig$ = this.store.select(selectAuthUserConfig);
  constructor(
    private readonly store: Store<AppState>
  ) {
  }
}
