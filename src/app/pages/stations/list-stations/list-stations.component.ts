import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/interfaces/app-state";
import { selectAuthUserConfig } from "../../../store/user/selectors/auth-user.selector";
import { StationsService } from '../commons/services/stations.service';
import { Station } from 'src/app/commons/interfaces/station';
import { Pagination } from 'src/app/commons/interfaces/pagination';
import { DateHelper } from 'src/app/commons/helpers/date.helper';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from 'src/app/commons/components/modal-alert/modal-alert.component';
import { CONFIRM_ACTION } from '../commons/constants/confirm-action';
import { filter, map } from 'rxjs';
import { ERROR_ALERT } from '../commons/constants/error-alert';
import { UbigeoService } from 'src/app/commons/services/ubigeo.service';
import { Deparment, Province } from 'src/app/commons/interfaces/ubigeo';
import { DropdownItem } from 'src/app/commons/components/dropdown/commons/interfaces/dropdown-item';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit {
  userConfig$ = this.store.select(selectAuthUserConfig);
  pagination?: Pagination<Station[]>;
  deparments: DropdownItem[] = [];
  provinces: DropdownItem[] = [];
  districts: DropdownItem[] = [];
  formSearch: FormGroup;

  constructor(
    private readonly store: Store<AppState>,
    private readonly stationService: StationsService,
    private readonly dialog: MatDialog,
    private readonly ubigeoService: UbigeoService
  ) {
    this.formSearch = new FormGroup(
      {
        ruc: new FormControl(),
        department: new FormControl(),
        province: new FormControl(),
        district: new FormControl()
      }
    );
  }
  ngOnInit() {

    this.ubigeoService.getDeparments()
      .pipe(map(deparments => this.ubigeoService.mapperToDropdown(deparments)))
      .subscribe(deparments => this.deparments = deparments);

    this.stationService.getStationsAfiliates({page: 1})
      .subscribe(pagination => this.pagination = pagination);
  }

  onPaginate(page: string) {
    this.stationService.getStationsAfiliates({page: Number(page)})
      .subscribe(pagination => this.pagination = pagination);
  }

  toHumanDate(date: number) {
    return DateHelper.dateHuman(date);
  }


  unsetAfiliation(station: Station) {
    this.dialog.open(ModalAlertComponent, { data: CONFIRM_ACTION })
      .afterClosed()
      .pipe(filter(confirmed => !!confirmed))
      .subscribe(() => {
        this.pagination!.data = [];
        this.pagination!.links = [];
        this.stationService.unsetAfiliation(station.id as number).subscribe({
          next: () => this.onPaginate('1'),
          error: () => this.dialog.open(ModalAlertComponent, { data: ERROR_ALERT })
        })
      });
  }


  onSelectDepartment(deparment: Deparment) {
    this.ubigeoService.getProvinces(deparment.id)
      .pipe(map(provinces => this.ubigeoService.mapperToDropdown(provinces)))
      .subscribe(provinces => this.provinces = provinces);
      this.districts = [];
  }


  onSelectProvince(province: Province) {
    this.ubigeoService.getDistricts(province.department_id, province.id)
      .pipe(map(districts => this.ubigeoService.mapperToDropdown(districts)))
      .subscribe(districts => this.districts = districts);
  }

  onSearch() {
    const department: Deparment = this.formSearch.get('department')?.value;
    const province: Deparment = this.formSearch.get('province')?.value;
    const district: Deparment = this.formSearch.get('district')?.value;
    const ruc: string = this.formSearch.get('ruc')?.value;

    this.stationService.getStationsAfiliates(
      {
        department: department?.id,
        province: province?.id,
        district: district?.id,
        ruc
      }
    )
    .subscribe(pagination => this.pagination = pagination);
  }



}
