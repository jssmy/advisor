import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule
  ]
})
export class ModalAlertComponent {
  @Input() title?: string;
  @Input() message?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }
}
