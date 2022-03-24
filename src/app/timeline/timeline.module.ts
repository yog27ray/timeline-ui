import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { routes } from './timeline.route';
import { BeforeScrollEndModule } from '../../directives/before-scroll-end/before-scroll-end.module';
import { FillComponentParentViewModule } from '../../directives/fill-component-parent-view/fill-component-parent-view.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BeforeScrollEndModule,
    FillComponentParentViewModule,
  ],
  declarations: [TimelineComponent],
  exports: [TimelineComponent],
})
export class TimelineModule {}
