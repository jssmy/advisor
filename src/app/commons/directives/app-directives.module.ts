import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnClickElementDirective } from './on-click-element.directive';
import { DropFileDirective } from './drop-file.directive';



@NgModule({
  declarations: [
    OnClickElementDirective,
    DropFileDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnClickElementDirective,
    DropFileDirective
  ]
})
export class AppDirectivesModule { }
