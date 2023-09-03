import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/interfaces/app-state";
import {selectAuthUserConfig} from "../../../store/user/selectors/auth-user.selector";
import { StationsService } from '../commons/services/stations.service';
import { BatchStation } from '../commons/interfaces/batch-station';
import { FormStationPresenter } from './form-station.presenter';
import { DropdownItem } from 'src/app/commons/components/dropdown/commons/interfaces/dropdown-item';
import { UbigeoService } from 'src/app/commons/services/ubigeo.service';
import { filter, map } from 'rxjs';
import { Deparment, Province } from 'src/app/commons/interfaces/ubigeo';
import { AuthUser } from 'src/app/store/user/models/auth-user';
import { Station } from 'src/app/commons/interfaces/station';
import { FileSrc } from 'src/app/commons/interfaces/file-src';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/commons/components/modal-alert/modal-alert.component';
import { AFILIED_STATION_SUCCESS } from '../commons/constants/afilied-station-success';
import { CONFIRM_ACTION } from '../commons/constants/confirm-action';
import { ERROR_ALERT } from '../commons/constants/error-alert';

@Component({
  selector: 'app-form-stations',
  templateUrl: './form-stations.component.html',
  styleUrls: ['./form-stations.component.scss']
})
export class FormStationsComponent implements OnInit {

  fallBackText = 'Buscando...';
  isEnabledFallBackText = true;
  userConfig$ = this.store.select(selectAuthUserConfig);
  userConfig: AuthUser | null | undefined;
  stations: BatchStation[] = [];
  departmens: DropdownItem[] = [];
  provinces: DropdownItem[] = [];
  districts: DropdownItem[] = [];
  constructor(
    private readonly store: Store<AppState>,
    private readonly stationService: StationsService,
    public readonly presenter: FormStationPresenter,
    public readonly ubigeoService: UbigeoService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userConfig$.subscribe(authUser => this.userConfig = authUser);
    this.ubigeoService.getDeparments()
    .pipe(
      map(departments => this.ubigeoService.mapperToDropdown(departments))
    )
    .subscribe(departments => this.departmens = departments);

    this.presenter.init();

  }

  onSearch(key: string) {
    this.isEnabledFallBackText = true;
    this.fallBackText = 'Buscando...';
    this.stations = [];
    this.stationService.getBatchStations(key)
    .subscribe(stations => {
      this.stations = stations;
      if(this.stations.length > 0) {
        this.isEnabledFallBackText = false;
      } else {
        this.fallBackText = 'No se encontraron resultados';
      }
    });
  }

  onSelected(station: BatchStation) {
    console.log(station);
    this.presenter?.rucControl?.setValue(station.ruc);
    this.presenter?.nameControl?.setValue(station.name);
    this.presenter?.addressControl?.setValue(station.address);
  }

  onSelectedDeparment(deparment: Deparment) {
    this.presenter.provinceControl?.setValue(null);
    this.presenter.districtControl?.setValue(null);
    this.provinces = [];
    this.districts = [];
    this.ubigeoService.getProvinces(deparment.id)
    .pipe(
      map(provincies => this.ubigeoService.mapperToDropdown(provincies))
    )
    .subscribe(provinces => this.provinces = provinces);

    
  }


  onSelectedProvince(province: Province) {
    this.ubigeoService.getDistricts(province.department_id, province.id)
    .pipe(
      map(districts => this.ubigeoService.mapperToDropdown(districts))
    ).subscribe(districts => this.districts = districts);
  }


  save() {
    this.dialog.open(ModalAlertComponent, { data: CONFIRM_ACTION})
    .afterClosed()
    .pipe(filter(confired => !!confired))
    .subscribe(() => this.confirmedToAfiliate())
    
    
  }

  private confirmedToAfiliate() {
    const files = this.presenter.imageControl?.value as FileSrc[];
    
    const images = files.map(file => ({
      name: file.name,
      src: file.src,
      type: file.type
    } as FileSrc));


    const station: Station = {
      ruc: this.presenter.rucControl?.value,
      address: this.presenter.addressControl?.value,
      images,
      company_name: this.presenter.nameControl?.value,
      ubigeo: {
        department: {
          id: this.presenter.departmentControl?.value?.id,
          name: this.presenter.departmentControl?.value?.name
        },
        province: {
          id: this.presenter.provinceControl?.value?.id,
          name: this.presenter.provinceControl?.value?.name
        },
        district: {
          id: this.presenter.districtControl?.value?.id,
          name: this.presenter.districtControl?.value?.name
        }
      }
    };
  
    this.stationService.afilliateStation(station)
    .subscribe(() => {
      this.dialog.open(ModalAlertComponent, {
        data: AFILIED_STATION_SUCCESS
      }).afterClosed()
      .subscribe({
        next: () => location.reload(),
        error:() => this.dialog.open(ModalAlertComponent, {data: ERROR_ALERT})
      });
    });
  }


}
