import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnClickElement]'
})
export class OnClickElementDirective {

  @Input('appOnClickElement')
  elemendId?: string; 

  constructor() { }

  @HostListener('click')
  private onClick() {

    if(!this.elemendId) return;

    const node = document.getElementById(this.elemendId);
    if(!node) return;

    node.click();

  }


}
