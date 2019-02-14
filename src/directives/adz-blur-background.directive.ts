import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[AdzBlurBackground]'
})
export class AdzBlurBackgroundDirective {

  constructor(private el : ElementRef) {
    
    this.el.nativeElement.style.backgroundColor = '#2b4382';
    
  }

}
