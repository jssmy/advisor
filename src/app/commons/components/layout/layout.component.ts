import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {ScreenLoaderComponent} from "../screen-loader/screen-loader.component";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {loadAuthUserConfigs, loadAuthUserConfigsSuccess} from "../../../store/user/action/auth-user.action";
import {selectAuthUserConfigLoadig} from "../../../store/user/selectors/auth-user.selector";
import {AppState} from "../../../store/interfaces/app-state";
import {filter, Subscription} from "rxjs";
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ScreenLoaderComponent
  ]
})
export class LayoutComponent implements OnInit, OnDestroy{
  private readonly subscriptions: Subscription[] = [];
  constructor(
    private readonly storage: Store<AppState>,
    public readonly loader: LoaderService
  ) {}

  ngOnInit(): void {

    this.storage.dispatch(loadAuthUserConfigs());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
