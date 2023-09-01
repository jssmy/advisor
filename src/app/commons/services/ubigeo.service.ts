import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Deparment, District, Province } from '../interfaces/ubigeo';
import { DropdownItem } from '../components/dropdown/commons/interfaces/dropdown-item';
import { UBIGEO } from '../dummy/ubigeo/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor() { }

  public getDeparments() {
    const departmens: Deparment[] = [...UBIGEO.DEPARTAMENTS];
    return of<Deparment[]>(departmens);
  }

  public getProvinces(deparmentId: string) {
    const provinces: Province[] = [...UBIGEO.PROVINCES];

    return of<Province[]>(provinces.filter(province =>province.department_id === deparmentId));
  }


  public getDistricts(deparmentId: string, provinceId: string) {
    const districts: District[] = [...UBIGEO.DISTRICT];
    return of<District[]>(districts.filter(district => district.department_id === deparmentId && district.province_id === provinceId));
  }

  public mapperToDropdown(data: Deparment[] | District[] | Province[]) {
    return data.map(item => {
      const dropdownItem: DropdownItem = {
        value: item,
        label: item.name
      };
      return dropdownItem;
   });
  };

}
