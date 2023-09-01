import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropFile]'
})
export class DropFileDirective {
  @HostBinding('class.file-over') fileOver = false;

  @Output() onDropFile = new EventEmitter();

  constructor() { }
  
  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    event.preventDefault?.();
    event.stopDropPagination?.();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any) {
    event.preventDefault?.();
    event.stopDropPagination?.();
    console.log(3,event);
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    event.preventDefault?.();
    event.stopDropPagination?.();
    this.fileOver = false;
    const $target = event.dataTransfer;
    this.onDropFile.emit($target)
  }

}
