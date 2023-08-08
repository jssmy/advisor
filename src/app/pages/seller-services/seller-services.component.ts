import {Component, OnInit} from '@angular/core';
import {SellerServicesService} from "./services/seller-services.service";
import {AsyncPipe, CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-seller-services',
  templateUrl: './seller-services.component.html',
  styleUrls: ['./seller-services.component.scss'],
  imports: [
    CommonModule
  ],
  standalone: true
})
export class SellerServicesComponent implements OnInit{
  sellerServices$ = this.sellerServices.getServices();
  constructor(
    private readonly sellerServices: SellerServicesService
  ) {

  }

  ngOnInit() {
  }

}
