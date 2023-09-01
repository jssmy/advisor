import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/interfaces/app-state";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";
import { StationsService } from '../commons/services/stations.service';
import { Station } from 'src/app/commons/interfaces/station';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit{
  userConfig$ = this.store.select(selectAuthUserConfig);
  stations: Station[] = [];
  constructor(
    private readonly store: Store<AppState>,
    private readonly stationService: StationsService
  ) {
  }
  ngOnInit() {
    this.stationService.getStationsAfiliates()
    .subscribe(stations => this.stations = stations);
  }
}
