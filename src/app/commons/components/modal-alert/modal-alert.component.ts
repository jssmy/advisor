import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalAlert, ModalOption } from './commons/interfaces/modal-alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule
  ]
})
export class ModalAlertComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() buttons: ModalOption[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalAlert,
    private readonly bsRef: MatDialogRef<ModalAlertComponent>
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.buttons = this.data.buttons;
  }


  getClass(button: ModalOption) {
    if (button.type === 'outlined') {
      return `outline-${this.data.type}`
    }
    return this.data.type;
  }

  onClick(button: ModalOption) {
    this.bsRef.close(button);
  }
}
