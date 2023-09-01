import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements ControlValueAccessor, OnChanges{
  isActive = false;
  @Input() placeHolder = ''
  @Input() close = true;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onWrite: EventEmitter<string> = new EventEmitter<string>();
  keyword: string = '';
  value: any = '';
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled = false;

  constructor(
  ) {}

  writeValue(value: any): void {
    this.value = value;
    this.onWrite.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onActive($event: any) {
    const value = ($event.target.value as string).trim();

    if(!value) return;

    this.onSearch.emit(value);
    this.isActive = true
  }

  onInactive() {
    this.isActive = !this.isActive;
  }

  change = (e: any) => console.log(e);

  ngOnChanges(changes: SimpleChanges): void {
    
    if  (changes.hasOwnProperty('close') && !changes['close']?.currentValue) {
          this.isActive = true;
    }
  }

}
