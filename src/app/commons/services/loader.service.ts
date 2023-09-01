import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  
  private readonly isLoaderEnabled$ = new BehaviorSubject<boolean>(false);
  public readonly loaderState$ = this.isLoaderEnabled$.asObservable();
  constructor() { }

  enabled(): void {
    this.isLoaderEnabled$.next(true);
  }

  disabled(): void {
    this.isLoaderEnabled$.next(false);
  }
}
