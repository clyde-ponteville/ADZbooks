import { Directive, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[hover]'
})
export class AdzHoverDirective {

  constructor(  private renderer: Renderer2) { }

  
  @HostListener('mouseenter') onMouseEnter(){
    // this.setDisplay( 'block' );
}

  @HostListener('mouseleave') onMouseLeave(){
    // this.setDisplay( 'none' );
  }

  private setDisplay( display: string ){

  }

}
