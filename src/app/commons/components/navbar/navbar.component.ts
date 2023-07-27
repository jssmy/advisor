import { Component } from '@angular/core';
import {AppConfig} from "../../helpers/app-config";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class NavbarComponent {
  appConfig = AppConfig;
  isEnabledUserSettings = false;

  onUserSettingClick() {
    this.isEnabledUserSettings = !this.isEnabledUserSettings;
  }

  onNavbarBackground() {
    this.isEnabledUserSettings = false;
  }
}
