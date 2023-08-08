import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ListStationsComponent } from './list-stations/list-stations.component';
import { FormStationsComponent } from './form-stations/form-stations.component';
import {STATION_ROUTES_MODULE} from "./stations.routes";



@NgModule({
  declarations: [
    ListStationsComponent,
    FormStationsComponent
  ],
  imports: [
    CommonModule,
    STATION_ROUTES_MODULE,
    NgOptimizedImage
  ]
})
export class StationsModule { }
