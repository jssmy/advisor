import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent
  ]
})
export class LayoutComponent {

}
