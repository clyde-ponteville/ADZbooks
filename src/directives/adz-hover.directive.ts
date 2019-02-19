import { Directive, HostListener, Renderer2, ElementRef  } from '@angular/core';

@Directive({
  selector: '[active]'
})
export class AdzHoverDirective {

  constructor(private el : ElementRef,  private renderer: Renderer2) { 

    // console.log(this.renderer.addClass(this.el.nativeElement , 'active'));
    // console.log(this.renderer);
    // console.log(this.el.nativeElement);

  }

}
