import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatchStation } from '../interfaces/batch-station';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Station } from 'src/app/commons/interfaces/station';
import { Pagination } from 'src/app/commons/interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getBatchStations(document: string): Observable<BatchStation[]> {
    return this.http.get<BatchStation[]>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.stationRecoveryBatch}/${document}`);
  }

  public afilliateStation(station: Station) {
    return this.http.post(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.toAfiliateStation}`, station);
  }

  public getStationsAfiliates(request: {
    page?: number;
    ruc?: string;
    department?: string;
    province?: string;
    district?: string
  }): Observable<Pagination<Station[]>> {
    const URLSearch = new URLSearchParams(JSON.parse(JSON.stringify(request))).toString();
    return this.http.get<Pagination<Station[]>>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.getStationsAfiliate}?${URLSearch}`);
  }

  public unsetAfiliation(stationId: number) {
    return this.http.delete(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.unsetAfiliatedStation}/${stationId}`);
  }

}
