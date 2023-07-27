import { Component } from '@angular/core';
import {AppConfig} from "../../helpers/app-config";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true
})
export class NavbarComponent {
  appConfig = AppConfig;
}
