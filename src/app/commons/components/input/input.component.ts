import {Component, forwardRef, Input} from '@angular/core';
import {InputType} from "../../constants/input-type";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ],
  standalone: true
})
export class InputComponent implements ControlValueAccessor{
  @Input() id?: string;
  @Input() label?: string;
  @Input() placeHolder?: string = '';
  @Input() type: InputType = 'text';
  @Input() error?: string;
  value: any = '';
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }


  onInput(event: any) {
  
    const value = (event.target as HTMLInputElement).value
    this.value = value;
    this.onTouch();
    this.onChange(this.value);  
  }

}
