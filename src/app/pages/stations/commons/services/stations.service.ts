import { Injectable } from '@angular/core';
import { Observable, merge, mergeMap, of, timer } from 'rxjs';
import { BatchStation } from '../interfaces/batch-station';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Station } from 'src/app/commons/interfaces/station';

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

  public afilliateStation(stationWoleSellerId: number, station: Station) {
    return this.http.post(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.stationAfiliate}/${stationWoleSellerId}`, station);
  }

  public getStationsAfiliates(stationWoleSellerId: number) {
  
  }
}
