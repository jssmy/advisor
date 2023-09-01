import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, forwardRef } from '@angular/core';
import { DropdownItem } from './commons/interfaces/dropdown-item';
import { SearchInputModule } from '../search-input/search-input.module';
import { AppDirectivesModule } from '../../directives/app-directives.module';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SearchInputModule,
    AppDirectivesModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent)
    }
  ]
})
export class DropdownComponent implements OnChanges, ControlValueAccessor {
  @Input('idHtml') id?: string;
  @Input() items: DropdownItem[] = [];
  itemsFiltered: DropdownItem[] = [];
  @Input() label?: string;
  @Output() onChangeEvent = new EventEmitter();
  isVisibleItems = false;
  selectedItem: any = null;
  value: any = null;
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabledDropdown = false;


  constructor() {

  }
  writeValue(value: any): void {
    this.value = value;
    if(!this.value) {
      this.selectedItem = null;
    }
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    this.isDisabledDropdown = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.hasOwnProperty('items')) {
        this.itemsFiltered = this.items.slice();
        this.selectedItem = null;
        this.value = null;
    }

  }

  onSelected(selected: any) {
    this.selectedItem = selected;
    this.onChangeEvent.emit(selected.value);
    this.writeValue(selected.value);
    this.onChange(selected.value);
  }

  onClick() {
    this.isVisibleItems = !this.isVisibleItems;
  }

  filter(key: string) {
    this.itemsFiltered = this.items.slice().filter(item => item.label.toLowerCase().includes(key.toLowerCase()));
  }
}
