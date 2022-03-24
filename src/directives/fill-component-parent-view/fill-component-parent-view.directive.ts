import { Directive, ElementRef, HostBinding, Input, HostListener } from '@angular/core';

@Directive({ selector: '[fill-component-parent-view]' })
export class FillComponentParentView {
  @HostBinding('style.height') height: string = '0px';
  public extraHeightViews: Array<any> = [];

  @Input('subtractViewHeight')
  set subtractView(subtractView: Array<any>) {
    this.extraHeightViews = subtractView;
    this.resizeHeight();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeHeight();
  }

  constructor(private element: ElementRef) {
    this.resizeHeight();
  }

  resizeHeight(): void {
    const { nativeElement }: any = this.element;
    const componentElement = new ElementRef(nativeElement.parentElement);
    this.getHeight(componentElement.nativeElement)
      .then((parentHeight: number) => {
        const extraHeight = (this.extraHeightViews || []).reduce((extra: number, view: any) => {
          if (!view) return extra;
          return extra + view.offsetHeight;
        }, 0);
        this.height = `${parentHeight - extraHeight}px`;
      });
  }

  getHeight(element: any): any {
    if (!element) return Promise.resolve();
    return new Promise((resolve: any): any => {
      if (element.parentElement) {
        const parentElement = new ElementRef(element.parentElement);
        const height = parentElement.nativeElement.offsetHeight;
        if (height) {
          resolve(parentElement.nativeElement.offsetHeight);
          return;
        }
        this.getHeight(parentElement.nativeElement).then((data: number) => resolve(data));
        return;
      }
      setTimeout(
        () => this.getHeight(element).then((data: number) => resolve(data)),
        100);
    });
  }
}
