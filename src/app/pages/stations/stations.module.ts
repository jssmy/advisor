import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ListStationsComponent } from './list-stations/list-stations.component';
import { FormStationsComponent } from './form-stations/form-stations.component';
import {STATION_ROUTES_MODULE} from "./stations.routes";
import { SearchInputModule } from 'src/app/commons/components/search-input/search-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDirectivesModule } from 'src/app/commons/directives/app-directives.module';
import { DropdownComponent } from 'src/app/commons/components/dropdown/dropdown.component';
import { UploadFileComponent } from 'src/app/commons/components/upload-file/upload-file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/commons/components/modal-alert/modal-alert.component';




@NgModule({
  declarations: [
    ListStationsComponent,
    FormStationsComponent
  ],
  imports: [
    CommonModule,
    STATION_ROUTES_MODULE,
    NgOptimizedImage,
    SearchInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppDirectivesModule,
    DropdownComponent,
    UploadFileComponent,
    MatDialogModule,
    ModalAlertComponent
  ]
})
export class StationsModule { }
