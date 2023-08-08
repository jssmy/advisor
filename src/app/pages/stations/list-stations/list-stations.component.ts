import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/interfaces/app-state";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit{
  userConfig$ = this.store.select(selectAuthUserConfig);
  constructor(
    private readonly store: Store<AppState>
  ) {
  }
  ngOnInit() {
  }
}
