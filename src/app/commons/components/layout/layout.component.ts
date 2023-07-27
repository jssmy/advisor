import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {ScreenLoaderComponent} from "../screen-loader/screen-loader.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ScreenLoaderComponent
  ]
})
export class LayoutComponent {
  isActiveLoader = true;

  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.userConfig().subscribe(config => {
      this.isActiveLoader = false;
    });
  }
}
