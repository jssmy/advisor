import { Component, OnInit } from '@angular/core';

import {AuthService} from "../../commons/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true
})
export class DashboardComponent implements OnInit{

  constructor(

  ) {
  }

  ngOnInit(): void {
  }

}
