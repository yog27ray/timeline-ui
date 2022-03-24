import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[before-scroll-end]' })
export class BeforeScrollEndDirective {
  @Input('before-scroll-end') beforeScrollEnd: () => void = () => 0;
  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('scroll')
  confirmFirst(): void {
    const element = this.element.nativeElement;
    const threshold = 150;
    if (element.scrollTop + element.offsetHeight + threshold >= element.scrollHeight) {
      this.beforeScrollEnd();
    }
  }
}
