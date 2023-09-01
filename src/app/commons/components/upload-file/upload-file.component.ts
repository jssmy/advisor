import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RegxExpressions } from '../../constants/regx-expressions';
import * as randomstring from 'randomstring';
import { timer } from 'rxjs';
import { AppDirectivesModule } from '../../directives/app-directives.module';

interface UploadFile extends File {
  src: string | ArrayBuffer | null; 
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AppDirectivesModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UploadFileComponent)
    }
  ],
})
export class UploadFileComponent implements ControlValueAccessor {



  @Input() label: string = '';
  @Input() multipleFiles = false;
  @Input() mimeType = '';
  
  componentID = randomstring.generate(10);
  filesSelected: UploadFile[] = [];
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabledInput = false;

  writeValue(value: any): void {
    this.filesSelected = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabledInput = isDisabled;
  }

  private getFiles(dropFiles: UploadFile[]): UploadFile[] {

    const files: UploadFile[] = Array.from(dropFiles || []);
    const auxFiles: UploadFile[] = [
      ...(this.multipleFiles ? this.filesSelected : []),
      ...files
    ];


    return auxFiles;
  }

  onFileSelected($target: any) {
    const files = this.getFiles($target?.files)
    this.onTouch();
    this.onChange(files);
    this.writeValue(files);
    const images = files.filter(img => this.isImageFile(img.name));
    for(const file of images) {
      const reader = new FileReader();
      reader.onload = e => file.src = reader.result;
      reader.readAsDataURL(file);
    }
  }

  formatSizeFile(size: number) {
    const formatedSize = (size / 1000).toFixed(2);
    return `<strong>${formatedSize}</strong>KB`;
  }

  isImageFile(src: string): boolean {
    if(!src) return false;

    return (new RegExp(RegxExpressions.IMAGE_EXTENTION)).test(src);
  }

  removeFile(indexControl: number) {
    this.filesSelected = this.filesSelected.filter((file, index) => index !== indexControl);
    this.onChange(this.filesSelected);
    this.writeValue(this.filesSelected);
  }

}
