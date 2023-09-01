import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputFallbackComponent } from './commons/components/search-input-fallback/search-input-fallback.component';
import { SearchInputComponent } from './search-input.component';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';



@NgModule({
  declarations: [
    SearchInputComponent,
    SearchInputFallbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchInputComponent)
    }
  ],
  exports: [
    SearchInputComponent,
    SearchInputFallbackComponent
  ]
})
export class SearchInputModule { }
